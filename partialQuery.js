const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const singleQuery = `{
  dragons {
    first_flight
    return_payload_mass {
      kg
    }
    return_payload_vol {
      cubic_feet
    }
  }
}
`;

const uniques = { dragons: 'first_flight' };

function addTypenameField(query) {
  let newQuery = '';
  let bracketCount = 2;
  let index = 0;
  while (bracketCount > 0) {
    if (query[index] === '{') bracketCount--;
    newQuery += query[index++];
  }

  newQuery += ' __typename';

  while (query[index] !== undefined) {
    newQuery += query[index];
    if (query[index] === '{') newQuery += ' __typename';
    index++;
  }
  return newQuery;
}

console.log(addTypenameField(singleQuery));

function seperateOuterQueries(query) {
  const outerQueryArr = [];
  let index = 0;
  let mainbracketCount = 1;
  while (query[index] !== '{') {
    index++;
  }
  index++;
  while (mainbracketCount > 0) {
    let currQueryStr = '{';
    let currInnerBracketCount = 1;
    while (query[index] !== '{') {
      if (query[index] === '}') {
        return outerQueryArr;
      }
      currQueryStr += query[index];
      index++;
    }
    currQueryStr += query[index];
    index++;
    mainbracketCount++;
    while (currInnerBracketCount > 0) {
      if (query[index] === '{') {
        currInnerBracketCount++;
        mainbracketCount++;
      }
      if (query[index] === '}') {
        currInnerBracketCount--;
        mainbracketCount--;
      }
      currQueryStr += query[index];
      index++;
    }
    outerQueryArr.push((currQueryStr += '}'));
  }
  return outerQueryArr;
}

function checkVariable(query) {
  const variables = {};
  let key = '';
  let value = '';
  let index = 0;

  while (query[index] !== '(') {
    if (query[index] === '}') return false;
    index++;
  }
  while (query[++index] !== ':') {
    key += query[index];
  }
  while (query[++index] !== ')') {
    value += query[index];
  }
  variables[key] = value.slice(1);

  return variables;
}

function checkType(query) {
  let index = 0;
  let str = '';
  while (query[index] !== '{') {
    index++;
  }
  index++;
  while (query[index] !== '(' && query[index] !== '{') {
    if (query[index] !== ' ' && query.charCodeAt(index) !== 10) {
      str += query[index];
    }
    index++;
  }

  return str;
}

function seperateInnerQueries(query) {
  const resultArr = [];
  let bracketCount = 2;
  let index = 0;
  let obj = {};
  let tempStr = '';
  let currObj = obj;

  while (bracketCount > 0) {
    if (query[index++] === '{') bracketCount--;
  }
  const helper = () => {
    while (bracketCount >= 0 && index < query.length) {
      if (query[index] === '}') {
        bracketCount--;
        index++;
      }
      if (query[index] === '{') {
        bracketCount++;
        console.log('hi');
        index++;
      }

      while (query[index] === ' ' || query.charCodeAt(index) === 10) {
        ++index;
      }
      while (
        query[index] !== ' ' &&
        query.charCodeAt(index) !== 10 &&
        index < query.length &&
        query[index] !== '}' &&
        query[index] !== '{'
      ) {
        tempStr += query[index];
        ++index;
      }
      if (query[index] === '{') {
        bracketCount++;
        index++;
        const key = resultArr[resultArr.length - 1];
        resultArr[resultArr.length - 1] = {};
        resultArr[resultArr.length - 1][key] = [];
        let currArray = resultArr[resultArr.length - 1][key];
        console.log(key);

        console.log(bracketCount);
        while (bracketCount >= 1) {
          let nestStr = '';
          if (query[index] === '}') bracketCount--;
          while (
            query[index] !== ' ' &&
            query.charCodeAt(index) !== 10 &&
            index < query.length &&
            query[index] !== '}' &&
            query[index] !== '{'
          ) {
            nestStr += query[index];
            ++index;
          }
          console.log(nestStr);
          if (query[index + 1] === '{') {
            currArray.push({});
            currArray[currArray.length - 1][nestStr] = [];
            currArray = currArray[currArray.length - 1][nestStr];
            nestStr = '';
            // bracketCount++
          } else if (nestStr !== '') {
            currArray.push(nestStr);
          }
          index++;
        }
      }
      if (tempStr !== '') {
        resultArr.push(tempStr);
        tempStr = '';
      }
    }
    index++;
  };
  helper();
  console.log(resultArr);
  return resultArr;
}

console.log(
  'FADSFSAGGSAD',
  seperateOuterQueries(singleQuery).map((query) => {
    return seperateInnerQueries(query);
  })
);

function createKeyForVariableQuery(query) {
  const variable = Object.keys(checkVariable(query))[0];
  const id = checkVariable(query)[variable];
  const type = checkType(query);
  if (!id) return type;
  return `${type}:${id}`;
}

console.log(checkVariable(singleQuery));
console.log(checkType(singleQuery));
console.log(createKeyForVariableQuery(singleQuery));
console.log(
  seperateOuterQueries(singleQuery).map((query) => {
    return createKeyForVariableQuery(query);
  })
);

function queryNormalizer(query) {
  query = addTypenameField(query);
  console.log(query);
  const outerQueryArr = seperateOuterQueries(query);
  const normalizedQueryObj = {};
  normalizedQueryObj.typesArr = outerQueryArr.map((query) => checkType(query));
  normalizedQueryObj.cacheKeysArr = outerQueryArr.map((query) =>
    createKeyForVariableQuery(query)
  );
  normalizedQueryObj.fieldsArr = outerQueryArr.map((query) =>
    seperateInnerQueries(query)
  );

  return normalizedQueryObj;
}
console.log(queryNormalizer(singleQuery).typesArr);
console.log(queryNormalizer(singleQuery).cacheKeysArr);
console.log(queryNormalizer(singleQuery).fieldsArr);

const data = {
  data: {
    dragons: [
      {
        first_flight: '2019-03-02',
        __typename: 'Dragon',
        return_payload_mass: {
          __typename: 'Mass',
          kg: 3000,
        },
        return_payload_vol: {
          __typename: 'Volume',
          cubic_feet: 388,
        },
      },
      {
        first_flight: '2010-12-08',
        __typename: 'Dragon',
        return_payload_mass: {
          __typename: 'Mass',
          kg: 3000,
        },
        return_payload_vol: {
          __typename: 'Volume',
          cubic_feet: 388,
        },
      },
    ],
  },
};

function cacheNewData(normalizedQuery, data, cache) {
  const innerData = data.data;
  console.log(normalizedQuery);
  for (let i = 0; i < normalizedQuery.typesArr.length; i++) {
    let currType = normalizedQuery.typesArr[i];
    let currCacheKey = normalizedQuery.cacheKeysArr[i];
    let currFieldsArr = normalizedQuery.fieldsArr[i];
    if (Array.isArray(innerData[currType])) {
      const refArr = [];
      const uniqueID = uniques[currType];
      innerData[currType].forEach((obj) => {
        const cacheKey = `${obj.__typename}:${obj[uniqueID]}`;
        console.log(cacheKey);
        refArr.push(cacheKey);
        cache[cacheKey] = {};
        ///////////////
        for (let field of currFieldsArr) {
          if (typeof field === 'object') {
            const nestedFieldObj = {};
            const nestedData = obj;

            function cacheNestedObj(obj) {
              const tempKey = Object.keys(obj)[0];
              nestedFieldObj[tempKey] = {};
              for (let nestedField of obj[tempKey]) {
                if (typeof nestedField === 'object') {
                  cacheNestedObj(nestedField[Object.keys(nestedField)[0]]);
                } else {
                  nestedFieldObj[tempKey] = nestedData[tempKey];
                  console.log(nestedFieldObj[tempKey]);
                }
              }
              return nestedFieldObj;
            }
            cache[cacheKey][Object.keys(field)[0]] =
              cacheNestedObj(field)[Object.keys(field)[0]];
          } else {
            cache[cacheKey][field] = obj[field];
          }
        }
        cache[currType] = refArr;
      });
    } else {
      cache[currCacheKey] = {};
      for (let field of currFieldsArr) {
        if (typeof field === 'object') {
          const nestedFieldObj = {};
          const nestedData = innerData[currType];

          function cacheNestedObj(obj) {
            const tempKey = Object.keys(obj)[0];
            //nestedFieldObj[tempKey] = {};
            console.log(tempKey);
            console.log(nestedData[tempKey]);
            console.log(obj[tempKey]);
            for (let nestedField of obj[tempKey]) {
              if (typeof nestedField === 'object') {
                cacheNestedObj(nestedField);
              } else {
                console.log(Object.keys(obj));
                if (nestedData[tempKey] !== undefined)
                  nestedFieldObj[tempKey] = nestedData[tempKey];
              }
            }
            console.log(nestedFieldObj);
            return nestedFieldObj;
          }

          console.log(currCacheKey);
          console.log(cacheNestedObj(field));
          cache[currCacheKey] = cacheNestedObj(field);
        } else {
          cache[currCacheKey][field] = innerData[currType][field];
          console.log(field);
        }
      }
    }
  }
  return cache;
}

const flattenedQuery = queryNormalizer(singleQuery);
const testCache = {};
console.log(
  'FADSFSAGGSAD',
  seperateOuterQueries(singleQuery).map((query) => {
    return seperateInnerQueries(query);
  })
);
cacheNewData(flattenedQuery, data, testCache);
console.log('CACHE2', testCache);

const partialSingleQuery = `{
  dragons {
    first_flight
    __typename
    return_payload_mass {
      __typename
    }
    return_payload_vol {
      __typename
      cubic_feet
    }
  }
}
`;

const partialSingleQueryData = {
  data: {
    dragons: [
      {
        __typename: 'Dragon',
        first_flight: '2019-03-02',
        return_payload_vol: {
          __typename: 'Volume',
          cubic_feet: 388,
        },
      },
      {
        __typename: 'Dragon',
        first_flight: '2010-12-08',
        return_payload_vol: {
          __typename: 'Volume',
          cubic_feet: 388,
        },
      },
    ],
  },
};
function checkCache(query, cache) {
  const data = { data: {} };
  const innerData = data.data;
  const normalizedQuery = queryNormalizer(query);
  console.log(normalizedQuery);
  for (let i = 0; i < normalizedQuery.cacheKeysArr.length; i++) {
    const partialCacheData = cache[normalizedQuery.cacheKeysArr[i]];
    console.log(partialCacheData);
    if (partialCacheData === undefined) {
      return false;
    }

    if (Array.isArray(partialCacheData)) {
      if (typeof partialCacheData[0] === 'string') {
        const resolvedArr = [];
        for (let j = 0; j < partialCacheData.length; j++) {
          const currPartialData = cache[partialCacheData[j]];
          const partialObj = {};
          for (let k = 0; k < normalizedQuery.fieldsArr[i].length; k++) {
            console.log(normalizedQuery.fieldsArr[i][k]);
            if (typeof normalizedQuery.fieldsArr[i][k] === 'object') {
              // const obj = {};
              function nestedDataFromCacheIterator(field, data, obj) {
                const key = Object.keys(field)[0];
                const currObj = (obj[key] = {});
                console.log(obj);
                const nestedPartialData = data[key];
                console.log(currPartialData);
                console.log(nestedPartialData);
                for (let nestedField of field[key]) {
                  if (nestedField === 'object') {
                    nestedDataFromCacheIterator(
                      nestedField,
                      nestedPartialData,
                      currObj
                    );
                  } else {
                    currObj[nestedField] = nestedPartialData[nestedField];
                    console.log(partialObj);
                  }
                  console.log(nestedField);
                }
              }
              nestedDataFromCacheIterator(
                normalizedQuery.fieldsArr[i][k],
                currPartialData,
                partialObj
              );
              console.log(normalizedQuery.fieldsArr[i][k]);
            } else if (
              currPartialData[normalizedQuery.fieldsArr[i][k]] === undefined
            ) {
              console.log(i);
              console.log(normalizedQuery.fieldsArr);
              return false;
            } else {
              partialObj[normalizedQuery.fieldsArr[i][k]] =
                currPartialData[normalizedQuery.fieldsArr[i][k]];
            }
            console.log(partialObj);
            console.log(innerData);
          }
          resolvedArr.push(partialObj);
        }
        innerData[normalizedQuery.cacheKeysArr[i]] = resolvedArr;
      }
    } else {
      innerData[normalizedQuery.cacheKeysArr[i]] = partialCacheData;
    }
  }
  console.log('DATA', data);
}

checkCache(partialSingleQuery, testCache);

function partialQueryCache(endpoint) {
  const cache = {};
  const uniques = { continents: 'code' };

  return async function checkCache() {
    const query = testQuery;
    const variable = checkVariable(query);

    if (variable) {
      const cacheKey = createKeyForVariableQuery(query);
      if (cache[cacheKey]) {
      } else {
        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({
            query,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            const type = checkType(query);
            console.log(data.data[type]);
            cache[cacheKey] = data.data[type];
            console.log(cache);
          });
      }
    } else {
      const cacheKey = checkType(query);
      if (cache[cacheKey]) {
      } else {
      }
    }
  };
}

const test = partialQueryCache('http://localhost:3000/graphql');
