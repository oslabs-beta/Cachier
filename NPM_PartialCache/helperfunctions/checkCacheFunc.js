function checkCache(normalizedQuery, cache, redis) {
  const { typesArr, cacheKeysArr, fieldsArr } = normalizedQuery;
  const resultData = { data: {} };
  const currData = resultData.data;
  for (let i = 0; i < fieldsArr.length; i++) {
    let currCacheKey = cacheKeysArr[i];
    iterateCache(fieldsArr[i], currCacheKey, currData, cache, redis);
  }
  if (checkMissingData) {
    return resultData;
  } else {
    checkMissingData = true;
    return false;
  }
}

let depthCount = 0;
let checkMissingData = true;

function iterateCache(
  fieldArr,
  currCacheKey,
  currReturnData,
  currCache,
  redis
) {
  const currDepthObj = {};
  let currCacheObj = currCache[currCacheKey];
  depthCount++;
  currReturnData[currCacheKey] = currDepthObj;
  if (depthCount <= 1) {
    redis.get(currCacheKey).then((data) => {
      currCacheObj = JSON.parse(data);
    });
  }

  for (let j = 0; j < fieldArr.length; j++) {
    if (currCacheObj === undefined) {
      checkMissingData = false;
      return;
    } else {
      if (Array.isArray(currCacheObj)) {
        const tempArr = [];
        let index = 0;

        currCacheObj.forEach((key) => {
          tempArr.push(
            iterateCache(
              fieldArr,
              currCacheObj[index],
              currReturnData[currCacheKey],
              currCache,
              redis
            )
          );
          if (tempArr[index] === false) {
            checkMissingData = false;
            return;
          }
          index++;
        });
        currReturnData[currCacheKey] = tempArr;
      } else if (typeof fieldArr[j] === 'string') {
        if (currCacheObj[fieldArr[j]] === undefined) {
          checkMissingData = false;
          return;
        }
        currDepthObj[fieldArr[j]] = currCacheObj[fieldArr[j]];
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
            currCacheObj,
            redis
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
