let depthCount = 0;
function cacheNewData(normalizedQuery, data, cache, uniques) {
  const { cacheKeysArr, fieldsArr } = normalizedQuery;
  const currData = data.data;
  for (let i = 0; i < fieldsArr.length; i++) {
    let currCacheKey = cacheKeysArr[i];
    iterateFieldsArr(
      fieldsArr[i],
      currCacheKey,
      currData,
      currCacheKey,
      cache,
      uniques
    );
    depthCount = 0;
  }
}

function iterateFieldsArr(
  fieldArr,
  currCacheKey,
  data,
  dataKey,
  currCache,
  uniques
) {
  depthCount++;
  let currDepthObj = {};
  currCache[currCacheKey] = currDepthObj;

  for (let j = 0; j < fieldArr.length; j++) {
    if (Array.isArray(data[dataKey])) {
      const tempArr = [];
      let index = 0;

      data[dataKey].forEach((obj) => {
        // may need to edge case check in future to have error in case user forgets to insert a unique id.
        const unique = uniques[currCacheKey] || 'id';
        const objTypeName = `${obj.__typename}`;
        const uniqueKey = `${objTypeName.toLowerCase()}:${obj[unique]}`;

        tempArr.push(uniqueKey);

        currCache[uniqueKey] = iterateFieldsArr(
          fieldArr,
          index,
          data[dataKey],
          index,
          currCache[currCacheKey],
          uniques
        );
        if (depthCount <= 1) {
          currCache[uniqueKey]['__CachierCacheDate'] = performance.now();
        }
        index++;
      });
      if (depthCount <= 1) {
        tempArr.push(performance.now());
      }
      currCache[currCacheKey] = tempArr;
    } else if (typeof fieldArr[j] === 'string') {
      currDepthObj[fieldArr[j]] = data[dataKey][fieldArr[j]];
      if (depthCount <= 1) {
        // currDepthObj[fieldArr[j]]['__CachierCacheDate'] = performance.now();
        currCache[currCacheKey]['__CachierCacheDate'] = performance.now();
      }
    } else {
      if (depthCount <= 1) {
        currCache[currCacheKey]['__CachierCacheDate'] = performance.now();
      }
      const currNestedFieldName = Object.keys(fieldArr[j])[0];
      if (data[dataKey][currNestedFieldName] === null) {
        currCache[dataKey][currNestedFieldName] = null;
      } else {
        const innerField = fieldArr[j][currNestedFieldName];
        iterateFieldsArr(
          innerField,
          currNestedFieldName,
          data[dataKey],
          currNestedFieldName,
          currCache[currCacheKey],
          uniques
        );
      }
    }
  }

  depthCount--;
  return currDepthObj;
}

module.exports = cacheNewData;
