const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const checkCache = require('./helperfunctions/checkCacheFunc.js');
const {
  queryNormalizer,
  addTypenameField,
} = require('./helperfunctions/queryNormalizingFuncs.js');
const cacheNewData = require('./helperfunctions/setCacheFunc.js');

function partialQueryCache(endpoint, redisClient) {
  return async function cache(req, res, next) {
    const { query, uniques } = req.body;
    const normalizedQuery = queryNormalizer(query);
    const dataFromCache = checkCache(normalizedQuery, {}, redisClient);

    if (dataFromCache) {
      return res.json(dataFromCache);
    } else {
      const queryWithTypename = addTypenameField(query);
      console.log('DATA', queryWithTypename);
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
          console.log('DATATATA', data);
          cacheNewData(normalizedQuery, data, {}, redisClient, uniques);
        });
    }
  };
}

module.exports = partialQueryCache;
