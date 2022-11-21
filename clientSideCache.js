export function clientSideCache(capacity, groupSize) {
  let currGroupSize = groupSize;

  if (capacity < 1 || groupSize < 1 || groupSize > capacity) {
    throw new Error(
      'Capacity and groupSize needs to be a number greater than 1 and groupsize cannot exceed capacity'
    );
  }

  const queue = new EvictionQueue();

  return async function checkCache(endpoint, options) {
    const body = JSON.parse(options.body);
    const { query } = body;
    let { variables } = body;

    if (!variables) {
      variables = {};
    }

    const variablesStr = JSON.stringify(variables);
    const cacheKey = JSON.stringify(`${query}${variablesStr}`);

    const valueFromCache = sessionStorage.getItem(cacheKey);

    if (valueFromCache) {
      queue.updateRecencyOfExistingCache(cacheKey);
      return JSON.parse(valueFromCache);
    } else {
      const start = performance.now();
      return fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          query,
          variables,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          const end = performance.now();
          const latency = end - start;
          sessionStorage.setItem(cacheKey, JSON.stringify(data));
          queue.add(cacheKey, latency);
          if (queue.length > capacity) {
            const removedQueryKey =
              queue.removeSmallestLatencyFromGroup(currGroupSize).key;

            sessionStorage.removeItem(removedQueryKey);

            currGroupSize -= 1;
            if (currGroupSize <= 0) currGroupSize = groupSize;
          }
          return data;
        })
        .catch((err) => {
          console.log(
            `Error:${err} unable to fetch query from specified endpoint`
          );
        });
    }
  };
}

//Node constructor for our doubly linkedlist;
class Node {
  constructor(key, latency) {
    this.key = key;
    this.latency = latency;
    this.next = null;
    this.prev = null;
  }
}

//Doubly linked list to keep track of our eviction order.
class EvictionQueue {
  constructor() {
    //keeps track of front of queue.
    this.head = null;
    //keeps track of back of queue.
    this.tail = null;
    //keeps track of the number of nodes in the queue.
    this.length = 0;
    //Keeps all nodes of linkedlist in a hashmap associated with their redis keys to allow O(1) updates to node positions in the queue.
    this.cache = {};
  }

  //adds a node to the queue.
  add(cacheKey, latency) {
    //creates a new Node containing the latency of the query and its key in the cache.
    const newNode = new Node(cacheKey, latency);
    this.cache[cacheKey] = newNode;
    //accounts for if the queue is empty.
    if (this.head === null && this.tail === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      //Will add new node to the front of the list by making it the new head.
      //makes old head prev point to the newNode.
      this.head.prev = newNode;
      // makes newNode point to old head and relabels newNode as the new head.
      newNode.next = this.head;
      this.head = newNode;
    }

    //updates length of the EvictionQueue.
    this.length += 1;
  }

  removeSmallestLatencyFromGroup(groupSize) {
    if (this.tail === null) return undefined;

    //keeps track of smallest latency node.
    let minLatencyNodeInGroup = this.tail;
    let currentNode = this.tail;

    //accounts for edge case if eviction policy capacity is set to 1 and the only node in queue is being removed.
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      this.length--;
      delete this.cache[currentNode.key];
      return currentNode;
    }

    //iterates through the least recent group and finds the smallest latency node.
    while (groupSize > 0 && currentNode) {
      if (currentNode.latency < minLatencyNodeInGroup.latency)
        minLatencyNodeInGroup = currentNode;
      currentNode = currentNode.prev;
      groupSize -= 1;
    }

    //accounts for if the minLatencyNodeInGroup is the head of the list
    if (this.head === minLatencyNodeInGroup) {
      this.head = this.head.next;
      this.head.prev = null;
      this.length--;
      delete this.cache[minLatencyNodeInGroup.key];
      return minLatencyNodeInGroup;
    }

    //accounts for if the minLatencyNodeInGroup is the tail of the list
    if (this.tail === minLatencyNodeInGroup) {
      this.tail = this.tail.prev;
      this.tail.next = null;
      this.length--;
      delete this.cache[minLatencyNodeInGroup.key];
      return minLatencyNodeInGroup;
    }

    //Removes minLatencyNodeInGroup from the Eviction Queue if node is not the tail or head.
    const removedNode = minLatencyNodeInGroup;
    minLatencyNodeInGroup.prev.next = minLatencyNodeInGroup.next;
    minLatencyNodeInGroup.next.prev = minLatencyNodeInGroup.prev;
    this.length--;
    delete this.cache[removedNode.key];
    return removedNode;
  }

  //Moves node to front of the linkedList if its cache is accessed again inorder to update recency.
  updateRecencyOfExistingCache(cacheKey) {
    const node = this.cache[cacheKey];
    //if node being updated is already at the head of list, we can just return since it is already in the most recent position.
    if (this.head === node) {
      return;
    }
    //remove linkage of the node at the current position.
    //accounts for if the tail node is the one getting updated since it wouldnt have a next node in the list.
    if (this.tail === node) {
      node.prev.next = node.next;
      this.tail = node.prev;
    } else {
      node.next.prev = node.prev;
      node.prev.next = node.next;
    }

    //move node to the head of the queue inorder to update the recency.
    this.head.prev = node;
    node.next = this.head;
    this.head = node;
    this.head.prev = null;
  }
}
