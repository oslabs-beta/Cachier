function cacheNewData(normalizedQuery, data, cache, redis, uniques) {
  const { typesArr, cacheKeysArr, fieldsArr } = normalizedQuery;
  const currData = data.data;
  for (let i = 0; i < fieldsArr.length; i++) {
    let currCacheKey = cacheKeysArr[i];

    console.log(
      currCacheKey,
      iterateFieldsArr(
        fieldsArr[i],
        currCacheKey,
        currData,
        currCacheKey,
        cache,
        redis,
        uniques
      )
    );
  }
}

let depthCount = 0;

function iterateFieldsArr(
  fieldArr,
  currCacheKey,
  data,
  dataKey,
  currCache,
  redis,
  uniques
) {
  depthCount++;
  let currDepthObj = {};
  let inUse = false;
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
        //need to account for if the user is using redis
        if (depthCount <= 1)
          redis.set(
            uniqueKey,
            JSON.stringify(
              iterateFieldsArr(
                fieldArr,
                index,
                data[dataKey],
                index,
                currCache[currCacheKey],
                redis,
                uniques
              )
            )
          );
        currCache[uniqueKey] = iterateFieldsArr(
          fieldArr,
          index,
          data[dataKey],
          index,
          currCache[currCacheKey],
          redis,
          uniques
        );
        index++;
      });
      //need to account for if the user is using redis
      if (depthCount <= 1) {
        redis.set(currCacheKey, JSON.stringify(tempArr));
        inUse = true;
      }

      currCache[currCacheKey] = tempArr;
    } else if (typeof fieldArr[j] === 'string') {
      currDepthObj[fieldArr[j]] = data[dataKey][fieldArr[j]];
    } else {
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
          redis,
          uniques
        );
      }
    }
  }
  if (depthCount <= 1) {
    if (!inUse) {
      redis.set(currCacheKey, JSON.stringify(currDepthObj));
    }
  }
  depthCount--;
  return currDepthObj;
}

module.exports = cacheNewData;
