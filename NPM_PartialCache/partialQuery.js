const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const os = require('node:os');

const checkCache = require('./helperfunctions/checkCacheFunc.js');
const {
  queryNormalizer,
  addTypenameField,
} = require('./helperfunctions/queryNormalizingFuncs.js');
const cacheNewData = require('./helperfunctions/setCacheFunc.js');
const evictionPolicy = require('./approx_LRU');

function partialQueryCache(
  endpoint,
  freeMemRemainingBeforeEviction,
  sampleSize
) {
  const cache = {};
  return async function helper(req, res, next) {
    const { query, uniques } = req.body;
    const dataFromCache = checkCache(queryNormalizer(query, false), cache);
    console.log(os.freemem());
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
          console.log(os.freemem());

          while (
            os.freemem() / 1000000 < 100000 &&
            Object.keys(cache).length > 1
          ) {
            evictionPolicy(cache, sampleSize);
          }
        });
      console.log(os.freemem());
    }
  };
}

module.exports = partialQueryCache;
