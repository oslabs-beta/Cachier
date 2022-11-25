// import the node fetch library 
// create a function fetch that takes in an array & returns a promise
// two functions are then chained to the returned promise object
// the first function is a default calling fetch with its arguments
// the second one is a function passed onto then
const fetch = (...args) =>
  import('node-fetch').then(
  ({ default: fetch }) => fetch(...args));

// the function CacheMoney analyzes the endpoint, capacity & groupSize 
// CacheMoney determines what kind of eviction queue it should create.
// redisClient variable is optional and can be use instead of Node's built-in queues.

// The function initializes a new eviction queue (linked List) for the server
// it assigns grouSize to currGroupSize to keep track of Current Group Size.
// it creates a constant cacheMoneyCache Object 


function CacheMoney(endpoint, capacity, groupSize, redisClient = null) {
  let currGroupSize = groupSize;
  const cacheMoneyCache = {};
  if (capacity < 1 || groupSize < 1 || groupSize > capacity) {
    throw new Error(
      'Capacity and groupSize needs to be a number greater than 1 and groupsize cannot exceed capacity'
    );
  }
// Function returns an async function 
// the purpose of this function is to check for cache hits using req res next paramerters
// assign query to query key in req.body ad trims whitespace
// destructure the variables key from req.body
// if the destructured query starts with the string 'mutation',assign to isMutation.

// check to see if the variables exists in req.body
// if it does not, create a empty object called variable
// stringify the variable object

// the destructured variables object is stringified and assigned to variablesStr
// cacheKey is assigned to the query and variablesStr are stringified, concatenated
// declare an empty variable called valueFromCache for later use

// if redisClient is not null from line 18, insert a try and catch block 
// use valueFromCache to await the result of querying Redis with cacheKey
// if the value is present in the catch, assign it to valueFromCache
// if the value is not present in the catch, 



  return async function checkCache(req, res, next) {
    const query = req.body.query.trim();
    let { variables } = req.body;
    const isMutation = query.startsWith('mutation');
    if (!variables) {
      variables = {};
    }
    //Stringifies variables and concats with queryStr to form a unique key in the cache.
    const variablesStr = JSON.stringify(variables);
    const cacheKey = JSON.stringify(`${query}${variablesStr}`);
    let valueFromCache;

   
    // If redisClient exists then enter the try block 
    // Assign valueFromCache to await the result of querying Redis with cacheKey
    // cacheKey is result of stringifying the query and variablesStr
    // Where query is the data from req.body.query, trimmed for whitespace.
    // variablesStr is the stringified variables object from req.body
    // If an error occurs in the try block, 
    // The next function is returned with an object containing the error string.
    // if there is no error, log 'running local cache' to the console
    // Assign valueFromCache the cachekey in the cacheMoneyCache Object.
    // if valueFromCache exists, then send valueFromCache in the response body
    // update 
    

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
// invoke updateRecencyofExistingCache with cacheKey as an argument
// do the linked list thing 
// otherwise, create a variable called start and assign start recording current time
// makes a POST request to the endpoint
// setting the content type of the header as 'application/json'
// the stringifying the body containing the query and variables
// then the response is assigned to the variable response
// the response is parsed and assigned to the variable data
// if the data is not a Mutation, 
// create a variable called end and stop recording the current time
// create a variable called latency and subtract start time from the end
// and data is sent after converting it into a  JSON object

// was in code
//// update recency of the accessed cacheKey by moving it to the front of the linked list.


    if (valueFromCache) {
      res.send(valueFromCache);
      queue.updateRecencyOfExistingCache(cacheKey);
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
            res.json(data);

//check if the redisClient exists  
// if it does, set cacheKey to the stringified form of data.
// if it does not, set cacheKey in cacheMoneyCache Object to stringified data
// add the cacheKey to the linked list queue
// if the length linked list queue is greater than the capacity,
// assign the variable evicted to the result of invoking the evict function
// if the redisClient exists, delete the evicted key from the redis cache
// if the redisClient does not exist, delete the evicted key from the cacheMoneyCache[removedQueryKey]
// if the currGroupSize is greater than 0, decrement currGroupSize by 1
// if the currGroupSize is less than or equal to 0, 
// assign currGroupSize to groupSize
// otherwise, log the data to the console
// if there is an error, invoke the next function with an object containing the error string

            redisClient
              ? redisClient.set(cacheKey, JSON.stringify(data))
              : (cacheMoneyCache[cacheKey] = JSON.stringify(data));

            queue.add(cacheKey, latency);
            if (queue.length > capacity) {
              const removedQueryKey =
                queue.removeSmallestLatencyFromGroup(currGroupSize).key;

              redisClient
                ? redisClient.del(removedQueryKey)
                : delete cacheMoneyCache[removedQueryKey];

              currGroupSize -= 1;
              if (currGroupSize <= 0) currGroupSize = groupSize;
            }
          } else {
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
// create a new eviction queue
// creat a class called NOde
// create a constructor that takes in a key and latency
// assign the key to the key property
// assign the latency to the latency property
// assign the next property to null
// assign the prev property to null

class Node {
  constructor(key, latency) {
    this.key = key;
    this.latency = latency;
    this.next = null;
    this.prev = null;
  }
}
// create a new class called EvictionQueue
// create a constructor function 
// assign the head property to null to keep track of the head of the linked list
// assign the tail property to null to back of the linked list
// assign the length property to 0 to keep track of the length of the linked list
// create a cache property 
// the cache property is an object to keep all nodes in LL in a hashmap
// the nodes are associated with their Redis keys to allow for O(1) access && update positions in the LL


//Doubly linked list to keep track of our eviction order.
//keeps track of front of queue.
//keeps track of back of queue.
//keeps track of the number of nodes in the queue
 //keeps all nodes of linkedlist in a hashmap associated with their redis keys to allow O(1) updates to node positions in the queue.

class EvictionQueue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
    this.cache = {};
  }


  //Create a method add to add a  new node with the key and latency.
  //creates a new Node w/ the latency of the query and its key in the cache.
  // if the head is null and the tail is null,
  // assign the head to the new node
  // assign the tail to the new node
  // otherwise, assign the previous head to the new node to the new node
  // adding the new node to the head of the linked list
  // point the new node to the previous head
  // relabel the newNode as the head
 // increment the length by 1
 //Will add new node to the front of the list by making it the new head.
      //makes old head prev point to the newNode.
       // makes newNode point to old head and relabels newNode as the new head.
  //accounts for if the queue is empty.
  
  add(cacheKey, latency) {
    const newNode = new Node(cacheKey, latency);
    this.cache[cacheKey] = newNode;
    if (this.head === null && this.tail === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length += 1;
  }

  //create a method called removeSmallestLatencyFromGroup
  // if the tail is null return undefined
  // create a variable called minLatencyNodeInGroup and assign it to the tail
  // create a variable called currNode and assign it to the tail
//accounts for edge case if eviction policy capacity is set to 1 and the only node in queue is being removed.
 //keeps track of smallest latency node.
    // if the head is equal to the tail 
    // assign the head to null
    // assign the tail to null
    // decrease the length by 1
    // delete the cacheKey from the cache 
    // return the currentNode

  removeSmallestLatencyFromGroup(groupSize) {
    if (this.tail === null) return undefined;
    let minLatencyNodeInGroup = this.tail;
    let currentNode = this.tail;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      this.length--;
      delete this.cache[currentNode.key];
      return currentNode;
    }

    //iterates through the least recent group and finds the smallest latency node.
    // while the groupSize is greater than  and the current node exists
    //if the current node latency is less than the minLatencyNodeInGroup latency
    // assign the minLatencyNodeInGroup to the current node
    // set the current node to the previous current node 
    // decrement the groupSize by 1
    while (groupSize > 0 && currentNode) {
      if (currentNode.latency < minLatencyNodeInGroup.latency)
        minLatencyNodeInGroup = currentNode;
      currentNode = currentNode.prev;
      groupSize -= 1;
    }

    //accounts for if the minLatencyNodeInGroup is the head of the list
    //if the head is equal to the minLatencyNodeInGroup
    // assign the head to the next node
    // assign the previous head to null
    // delete the minLatencyNodeInGroup from the cache
    // return the minLatencyNodeInGroup
    if (this.head === minLatencyNodeInGroup) {
      this.head = this.head.next;
      this.head.prev = null;
      this.length--;
      delete this.cache[minLatencyNodeInGroup.key];
      return minLatencyNodeInGroup;
    }

    //accounts for if the minLatencyNodeInGroup is the tail of the list
    // if the tail is equal to the minLatencyNodeInGroup
    // assign the tail to the previous node
    // assign the next tail to null
    // decrease the length by 1
    // delete the minLatencyNodeInGroup from the cache
    // return the minLatencyNodeInGroup

    if (this.tail === minLatencyNodeInGroup) {
      this.tail = this.tail.prev;
      this.tail.next = null;
      this.length--;
      delete this.cache[minLatencyNodeInGroup.key];
      return minLatencyNodeInGroup;
    }

    //Removes minLatencyNodeInGroup from the Eviction Queue if node is not the tail or head.
    // assign removedNode to the minLatencyNodeInGroup
    // assign the next node of the previous node to the next node of minLatencyNodeInGroup
    // assign the previous node of the next node to the previous node of minLatencyNodeInGroup
    // decrease the length by 1
    // delete the minLatencyNodeInGroup from the cache
    // return the removedNode
    const removedNode = minLatencyNodeInGroup;
    minLatencyNodeInGroup.prev.next = minLatencyNodeInGroup.next;
    minLatencyNodeInGroup.next.prev = minLatencyNodeInGroup.prev;
    this.length--;
    delete this.cache[removedNode.key];
    return removedNode;
  }

  //Moves node to front of the linkedList if its cache is accessed again inorder to update recency.
  // create a method called updateRecencyofExistingCache
  // create a variable called node and assign it to the cacheKey in cache Object
  // if node being updated is the head of the linked list
  // log that the node is already the head of the linked list
   //if node being updated is already at the head of list, we can just return since it is already in the most recent position.
  updateRecencyOfExistingCache(cacheKey) {
    const node = this.cache[cacheKey];
    if (this.head === node) {
      console.log('hit head');
      return;
    }
    
    // if the node being updated is the tail of the linked list
    //remove linkage of the node at the current position.
    //accounts for if the tail node is the one getting updated since it wouldnt have a next node in the list.
    // we check if the node being updated is at the tail of the linked list.
    // If so, we remove linkage of that node and account for if the tail node was getting updated since it wouldn't have a next node in its list
    // the node gets updated and moved to the head position
    //move node to the head of the queue inorder to update the recency.
    if (this.tail === node) {
      node.prev.next = node.next;
      this.tail = node.prev;
    } else {
      node.next.prev = node.prev;
      node.prev.next = node.next;
    }
    this.head.prev = node;
    node.next = this.head;
    this.head = node;
    this.head.prev = null;
  }
}

module.exports = CacheMoney;
