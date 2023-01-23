this.capacity = capacity;
this.groupSize = groupSize;
this.redisClient = redisClient;
this.endpoint = endpoint;

// tests for CacheMoney function
test("CacheMoney function should throw an error if capacity or groupSize is less than 1 or groupSize exceeds capacity", () => {
  expect(() => new CacheMoney(endpoint, 0, 1, redisClient)).toThrowError(
    "Capacity and groupSize needs to be a number greater than 1 and groupsize cannot exceed capacity"
  );
});

test("CacheMoney should create a new EvictionQueue", () => {
  const cacheMoney = new CacheMoney(endpoint, capacity, groupSize, redisClient);
  expect(cacheMoney.queue).toBeInstanceOf(EvictionQueue);
});

test("CacheMoney should assign capacity, groupSize, redisClient and endpoint correctly", () => {
  const cacheMoney = new CacheMoney(endpoint, capacity, groupSize, redisClient);
  expect(cacheMoney.capacity).toBe(capacity);
  expect(cacheMoney.groupSize).toBe(groupSize);
  expect(cacheMoney.redisClient).toBe(redisClient);
  expect(cacheMoney.endpoint).toBe(endpoint);
});

test("CacheMoney should have traverse function", () => {
  const cacheMoney = new CacheMoney(endpoint, capacity, groupSize, redisClient);
  expect(typeof cacheMoney.traverse).toBe('function');
});

describe('checkCache', () => {
  beforeEach(() => {
    const req = {
      body: {
        query: 'some query',
        variables: { some: 'variables' },
      }
    };
    res = jest.fn();
    next = jest.fn();
  });

  test('should set valueFromCache if redisClient is used', async () => {
    const redisClient = {
      get: jest.fn().mockReturnValue('someValue')
    }
    await checkCache(req, res, next);
    expect(redisClient.get).toHaveBeenCalled();
    expect(valueFromCache).toEqual('someValue');
  });

  test('should set valueFromCache if cacheMoneyCache is used', async () => {
    await checkCache(req, res, next);
    expect(cacheMoneyCache[cacheKey]).toBeDefined();
    expect(valueFromCache).toEqual(cacheMoneyCache[cacheKey]);
  });
});


describe('Testing if cache contains the requested data', () => {
  it('should update the recency of the accessed cacheKey and return data from the cache', () => {
    const valueFromCache = '{"data": "dummy"}';
    const cacheKey = 'cacheKey';
    const queue = jest.fn();
    const res = {
      send: jest.fn(),
    };

    queue.updateRecencyOfExistingCache = jest.fn();
    const listArray = jest.fn();
    const parsedValue = JSON.parse(valueFromCache);
    queue.add = jest.fn();
    queue.length = 10;
    queue.removeSmallestLatencyFromGroup = jest.fn(() => ({
      latency: 0,
      num: 0,
    }));
    const redisClient = jest.fn();
    redisClient.set = jest.fn();
    const cacheMoneyCache = {};
    const capacity = 10;
    const groupSize = 3;
    const currGroupSize = 3;

    if (valueFromCache) {
      // update recency of the accessed cacheKey by moving it to the front of the linked list.
      queue.updateRecencyOfExistingCache(cacheKey);
      // if cache contains the requested data return data from the cache.
      const listArray = traverse(queue);

      res.send({
        data: parsedValue,
        queue: listArray,
        currGroupSize,
        cached: true,
      });

      expect(res.send).toHaveBeenCalledWith({
        data: parsedValue,
        queue: listArray,
        currGroupSize,
        cached: true,
      });
      expect(queue.updateRecencyOfExistingCache).toHaveBeenCalledWith(cacheKey);
    }
  });
});
//accounts for if the minLatencyNodeInGroup is the tail of the list
if (this.tail === minLatencyNodeInGroup) {
  this.tail = this.tail.prev;
  this.tail.next = null;
  this.length--;
  delete this.cache[minLatencyNodeInGroup.key];
  return minLatencyNodeInGroup;
}

//handles the case where minLatencyNodeInGroup is in middle of the list
minLatencyNodeInGroup.prev.next = minLatencyNodeInGroup.next;
minLatencyNodeInGroup.next.prev = minLatencyNodeInGroup.prev;
this.length--;
delete this.cache[minLatencyNodeInGroup.key];
return minLatencyNodeInGroup;



describe("add()", () => {
  let evictionQueue;
  beforeEach(() => {
    evictionQueue = new EvictionQueue();
  });

  it("Should add a new node to the head of the list", () => {
    const cacheKey = "test";
    const latency = 10;
    evictionQueue.add(cacheKey, latency);
    expect(evictionQueue.head.latency).toBe(10);
    expect(evictionQueue.head.key).toBe("test");
  });
});

describe("removeSmallestLatencyFromGroup()", () => {
  let evictionQueue;
  beforeEach(() => {
    evictionQueue = new EvictionQueue();
  });

  it("Should return the node with the smallest latency from the group", () => {
    evictionQueue.add("test1", 5);
    evictionQueue.add("test2", 10);
    evictionQueue.add("test3", 8);
    const minLatencyNodeInGroup = evictionQueue.removeSmallestLatencyFromGroup(3);
    expect(minLatencyNodeInGroup.key).toBe("test1");
    expect(minLatencyNodeInGroup.latency).toBe(5);
    expect(evictionQueue.length).toBe(2);
  });
});
describe("updateRecencyOfExistingCache", () => {
  it("should update the recency of an existing cache", () => {
    const evictionQueue = new EvictionQueue();
    evictionQueue.head = {
      key: "head",
      prev: null,
      next: {
        key: "middle",
        prev: {
          key: "tail",
          prev: null,
          next: null
        },
        next: null
      }
    };
    evictionQueue.tail = evictionQueue.head.next.prev;
    evictionQueue.cache = {
      head: evictionQueue.head,
      middle: evictionQueue.head.next,
      tail: evictionQueue.tail
    };
    evictionQueue.length = 3;
    evictionQueue.updateRecencyOfExistingCache("middle");
    expect(evictionQueue.head.key).toBe("middle");
    expect(evictionQueue.head.prev).toBe(null);
    expect(evictionQueue.head.next).toEqual({
      key: "head",
      prev: { key: "middle", prev: null, next: null },
      next: {
        key: "tail",
        prev: { key: "head", prev: null, next: null },
        next: null
      }
    });
    expect(evictionQueue.tail.key).toBe("tail");
    expect(evictionQueue.tail.next).toBe(null);
    expect(evictionQueue.tail.prev).toEqual({
      key: "head",
      prev: { key: "middle", prev: null, next: null },
      next: null
    });
    expect(evictionQueue.length).toBe(3);
  });
});
