/* @description 

Queries to /cacheMoney endpoint reach this middleware. Locally stored Eviction Queue tracks what is in the cache (cacheMoneyCache or Redis). 
The doubly linked list ("EvictionQueue") has a head - tracks the newest query, and a tail - tracks the oldest (least recently accessed) query.
A locally stored object cache (cache) stores queries for O(1) look up.
When a query arrives, the cache is queried for that key. If it's living in the cache, the query result is returned = Cached Result. 
If a query doesn't existent in the cache, the database (URI provided via parameter "endpoint") is queried and returned = Uncached Result.
That query result is stored in Redis, and at the head of our linked list. 
Developers can choose to store the cache in Object Storage, simply by not providing a "redisClient" parameter. In this case, "cacheMoneyCache" 
stores queries in object form, just like Redis. We only recommend this for development purposes.
The parameters "capacity" and "groupSize" determine the max capacity of the cache and the amount of queries in that cache that will be selected for 
eviction scrutiny, respectively. Ex: capacity = 50, groupSize = 5 -> whenever cache capacity is exceeded (51 unique queries have been made and cached), 
the 5 least recently accessed queries are selected, and the one with the highest latency (time delay) is evicted from the cache.
This custom eviction policy accounts for both query recency and latency.

@params: endpoint (str), capacity (int), groupSize (int), redisClient (bool)
*/

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

function CacheMoney(endpoint, capacity, groupSize, redisClient = null) {
  const traverse = (list) => {
    let currNode = list.head;
    const output = [];
    let counter = 1;

    while (currNode) {
      output.push({
        latency: currNode.latency,
        key: currNode.key,
        num: currNode.num,
      });
      currNode = currNode.next;
      counter++;
    }
    return output;
  };
  //Initalize a new eviction queue (linked list) for the server
  let queue = new EvictionQueue();
  //Keep track of the current group size
  let currGroupSize = groupSize;
  let cacheMoneyCache = {};

  if (capacity < 1 || groupSize < 1 || groupSize > capacity) {
    throw new Error(
      'Capacity and groupSize needs to be a number greater than 1 and groupsize cannot exceed capacity'
    );
  }

  return async function checkCache(req, res, next) {
    const query = req.body.query.trim();
    let { variables } = req.body;

    const isMutation = query.startsWith('mutation');

    //Account for client not including a variables object in the body of the post request
    if (!variables) {
      variables = {};
    }

    //Stringify variables and concats with queryStr to form a unique key in the cache
    const variablesStr = JSON.stringify(variables);
    const cacheKey = JSON.stringify(`${query}${variablesStr}`);
    let valueFromCache;

    //Check if query is already in our Redis cache or Object Storage (cacheMoneyCache)
    if (redisClient) {
      try {
        valueFromCache = await redisClient.get(cacheKey);
      } catch (error) {
        return next({ log: 'invalid RedisPort' });
      }
    } else {
      console.log('running local cache');
      valueFromCache = cacheMoneyCache[cacheKey];
    }

    if (valueFromCache) {
      //Update recency of the accessed cacheKey by moving it to the front of the linked list

      queue.updateRecencyOfExistingCache(cacheKey);
      //If cache contains the requested data, return data from the cache
      const parsedValue = JSON.parse(valueFromCache);
      const listArray = traverse(queue);

      res.send({
        data: parsedValue,
        queue: listArray,
        currGroupSize,
        cached: true,
      });
    } else {
      const start = performance.now();
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          query,
          variables,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!isMutation) {
            const end = performance.now();
            const latency = end - start;

            redisClient
              ? redisClient.set(cacheKey, JSON.stringify(data))
              : (cacheMoneyCache[cacheKey] = JSON.stringify(data));

            queue.add(cacheKey, latency);
            let removedNode = { latency: 0, num: 0 };
            if (queue.length > capacity) {
              removedNode = queue.removeSmallestLatencyFromGroup(currGroupSize);
              const removedQueryKey = removedNode.key;

              redisClient
                ? redisClient.del(removedQueryKey)
                : delete cacheMoneyCache[removedQueryKey];

              currGroupSize -= 1;
              if (currGroupSize <= 0) currGroupSize = groupSize;
            }
            const listArray = traverse(queue);
            res.json({
              data,
              queue: listArray,
              removedNode: {
                latency: removedNode.latency,
                num: removedNode.num,
              },
              currGroupSize,
              cached: false,
            });
          } else { //if it is a mutation
            return res.json(data);
          }
        })
        .catch((err) => {
          next({
            log: `Error:${err} unable to fetch query from specified endpoint`,
          });
        });
    }
  };
}

//Node constructor for our doubly linkedlist;
class Node {
  constructor(key, latency, num) {
    this.key = key;
    this.latency = latency;
    this.next = null;
    this.prev = null;
    this.num = num;
  }
}

//Keep track of eviction order
class EvictionQueue {
  constructor() {
    //Track front of queue (where newest queries go)
    this.head = null;
    //Track back of queue (oldest accessed query)
    this.tail = null;
    //Track the # of nodes in the queue
    this.length = 0;
    //Keep all nodes of linkedlist in a hashmap associated with their Redis keys to allow O(1) updates to node positions in the queue
    this.cache = {};
    this.nodeNum = 1;
  }

  //Add a node to the queue (at the head).
  add(cacheKey, latency) {
    //Create a new Node containing the latency of the query and its key in the cache.
    const newNode = new Node(cacheKey, latency, this.nodeNum++);
    this.cache[cacheKey] = newNode;
    //Account for if the queue is empty.
    if (this.head === null && this.tail === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      //Add new node to the front of the list by making it the new head - make old head prev point to the newNode.
      this.head.prev = newNode;
      //Make newNode point to old head and relabel newNode as the new head.
      newNode.next = this.head;
      this.head = newNode;
    }

    //Update length of the EvictionQueue.
    this.length += 1;
  }

  // Remove node with lowest latency (fastest query) from eviction queue
  removeSmallestLatencyFromGroup(groupSize) {
    if (this.tail === null) return undefined;

    //Track the smallest latency node.
    let minLatencyNodeInGroup = this.tail;
    let currentNode = this.tail;

    //Account for edge case: eviction policy capacity is set to 1 and the only node in queue is being removed.
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      this.length--;
      delete this.cache[currentNode.key];
      return currentNode;
    }

    //Iterate through the least recent group and find the smallest latency node.
    while (groupSize > 0 && currentNode) {
      if (currentNode.latency < minLatencyNodeInGroup.latency)
        minLatencyNodeInGroup = currentNode;
      currentNode = currentNode.prev;
      groupSize -= 1;
    }

    //Account for: the smallest latency query in group is the head of the Eviction Queue
    if (this.head === minLatencyNodeInGroup) {
      this.head = this.head.next;
      this.head.prev = null;
      this.length--;
      delete this.cache[minLatencyNodeInGroup.key];
      return minLatencyNodeInGroup;
    }

    //Account for: the smallest latency query in group is the tail of the Eviction Queue
    if (this.tail === minLatencyNodeInGroup) {
      this.tail = this.tail.prev;
      this.tail.next = null;
      this.length--;
      delete this.cache[minLatencyNodeInGroup.key];
      return minLatencyNodeInGroup;
    }

    //Remove smallest latency query in group from the Eviction Queue if node is not the tail or head
    const removedNode = minLatencyNodeInGroup;
    minLatencyNodeInGroup.prev.next = minLatencyNodeInGroup.next;
    minLatencyNodeInGroup.next.prev = minLatencyNodeInGroup.prev;
    this.length--;
    delete this.cache[removedNode.key];
    return removedNode;
  }

  //Move node to front of the Eviction Queue if its cache is accessed again inorder to update recency
  updateRecencyOfExistingCache(cacheKey) {
    const node = this.cache[cacheKey];
    //Edge case: if node being updated is already at the head of list -> its already in the most recent position
    if (this.head === node) {
      return;
    }
    
    //Unlink Node being updated
    //Account for: if the tail node is getting updated
    if (this.tail === node) {
      node.prev.next = node.next;
      this.tail = node.prev;
    } else {
      node.next.prev = node.prev;
      node.prev.next = node.next;
    }

    //Move node to the head of the queue inorder to update the recency.
    this.head.prev = node;
    node.next = this.head;
    this.head = node;
    this.head.prev = null;
  }
}

module.exports = CacheMoney;