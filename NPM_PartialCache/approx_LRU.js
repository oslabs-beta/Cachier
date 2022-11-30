function approxLRU(cache, sampleSize) {
  const allKeys = Object.keys(cache);
  const samplePool = [];

  if (allKeys.length < sampleSize) {
    sampleSize = allKeys.length;
  }

  for (let i = 0; i < sampleSize; i++) {
    const randomNum = Math.floor(Math.random() * allKeys.length);
    const randomKey = allKeys[randomNum];
    samplePool.push(randomKey);
  }
  let leastRecentlyUsedKey;
  let currLeastRecentDate = Infinity;
  for (let i = 0; i < samplePool.length; i++) {
    const currKey = samplePool[i];
    if (
      Array.isArray(cache[currKey]) &&
      cache[currKey][cache[currKey].length - 1] < currLeastRecentDate
    ) {
      currLeastRecentDate = cache[currKey][cache[currKey].length - 1];
      leastRecentlyUsedKey = currKey;
    } else if (cache[currKey]['__CachierCacheDate'] < currLeastRecentDate) {
      currLeastRecentDate = cache[currKey].__CachierCacheDate;
      leastRecentlyUsedKey = currKey;
    }
  }
  delete cache[leastRecentlyUsedKey];

  return;
}

module.exports = approxLRU;
