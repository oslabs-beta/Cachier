function checkCache(normalizedQuery, cache) {
  const { typesArr, cacheKeysArr, fieldsArr } = normalizedQuery;
  const resultData = { data: {} };
  const currData = resultData.data;
  for (let i = 0; i < fieldsArr.length; i++) {
    let currCacheKey = cacheKeysArr[i];
    iterateCache(fieldsArr[i], currCacheKey, currData, cache);
    depthCount = 0;
  }
  if (checkMissingData) {
    depthCount = 0;
    return resultData;
  } else {
    depthCount = 0;
    checkMissingData = true;
    return false;
  }
}

let depthCount = 0;
let checkMissingData = true;

function iterateCache(fieldArr, currCacheKey, currReturnData, currCache) {
  const currDepthObj = {};
  let currCacheObj = currCache[currCacheKey];
  depthCount++;
  currReturnData[currCacheKey] = currDepthObj;

  for (let j = 0; j < fieldArr.length; j++) {
    if (currCacheObj === undefined) {
      checkMissingData = false;
      return;
    } else {
      if (currCacheObj['__CachierCacheDate'] !== undefined) {
        currCacheObj['__CachierCacheDate'] = performance.now();
      }
      if (Array.isArray(currCacheObj)) {
        const tempArr = [];
        let index = 0;

        for (let i = 0; i < currCacheObj.length - 1; i++) {
          tempArr.push(
            iterateCache(
              fieldArr,
              currCacheObj[index],
              currReturnData[currCacheKey],
              currCache
            )
          );
          if (tempArr[index] === false) {
            checkMissingData = false;
            return;
          }
          index++;
        }
        if (depthCount <= 1) {
          console.log('DEPTH');
          currCacheObj[currCacheObj.length - 1] = performance.now();
        }
        currReturnData[currCacheKey] = tempArr;
      } else if (typeof fieldArr[j] === 'string') {
        if (currCacheObj[fieldArr[j]] === undefined) {
          checkMissingData = false;
          return;
        }
        currDepthObj[fieldArr[j]] = currCacheObj[fieldArr[j]];

        if (currCacheObj.__CachierCacheDate !== undefined) {
          currCacheObj['__CachierCacheDate'] = performance.now();
        }
      } else {
        const currNestedFieldName = Object.keys(fieldArr[j])[0];
        const innerField = fieldArr[j][currNestedFieldName];
        if (currCacheObj[currNestedFieldName] === null) {
          currDepthObj[currNestedFieldName] = null;
        } else {
          const result = iterateCache(
            innerField,
            currNestedFieldName,
            currDepthObj,
            currCacheObj
          );
          if (result === false) {
            checkMissingData = false;
            return;
          }
        }
      }
    }
  }
  depthCount--;
  return currDepthObj;
}

module.exports = checkCache;
