import { queue } from './Evictions';

export function clientSideCache(capacity, groupSize) {
  let currGroupSize = groupSize;

  if (capacity < 1 || groupSize < 1 || groupSize > capacity) {
    throw new Error(
      'Capacity and groupSize needs to be a number greater than 1 and groupsize cannot exceed capacity'
    );
  }

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
