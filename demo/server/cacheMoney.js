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
  }

  //adds a node to the queue.
  add(cacheKey, latency) {
    //creates a new Node containing the latency of the query and its key in the cache.
    const newNode = new Node(cacheKey, latency);
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
      return minLatencyNodeInGroup;
    }

    //accounts for if the minLatencyNodeInGroup is the tail of the list
    if (this.tail === minLatencyNodeInGroup) {
      this.tail = this.tail.prev;
      this.tail.next = null;
      this.length--;
      return minLatencyNodeInGroup;
    }

    //Removes minLatencyNodeInGroup from the Eviction Queue if node is not the tail or head.
    const removedNode = minLatencyNodeInGroup;
    minLatencyNodeInGroup.prev.next = minLatencyNodeInGroup.next;
    minLatencyNodeInGroup.next.prev = minLatencyNodeInGroup.prev;
    this.length--;
    return removedNode;
  }

  //Moves node to front of the linkedList if its cache is accessed again inorder to update recency.
  updateRecencyOfExistingCache(cacheKey) {}
}

const queue = new EvictionQueue();

queue.add('query1', 120);
queue.add('query2', 150);
queue.add('query3', 110);
queue.add('query4', 10);
