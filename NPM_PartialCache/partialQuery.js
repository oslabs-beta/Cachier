const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const checkCache = require('./helperfunctions/checkCacheFunc.js');
const {
  queryNormalizer,
  addTypenameField,
} = require('./helperfunctions/queryNormalizingFuncs.js');
const cacheNewData = require('./helperfunctions/setCacheFunc.js');
const evictionPolicy = require('./approx_LRU');

function partialQueryCache(
  endpoint,
  capacity = 100,
  sampleSize = 5,
  evictionSize = 5
) {
  const cache = {};
  return async function helper(req, res, next) {
    const { query, uniques } = req.body;
    if(query === 'clear') {
      cache = {};
      return res.send('Cache Cleared!')
    }
    const dataFromCache = checkCache(queryNormalizer(query, false), cache);
    if (dataFromCache !== false) {
      return res.json(dataFromCache);
    } else {
      const queryWithTypename = addTypenameField(query);
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          query: queryWithTypename,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          res.json(data);
          cacheNewData(queryNormalizer(query), data, cache, uniques);

          while (Object.keys(cache).length > capacity * 100) {
            for (let i = 0; i < evictionSize; i++) {
              evictionPolicy(cache, sampleSize);
            }
          }
          return;
        });
    }
  };
}

module.exports = partialQueryCache;
