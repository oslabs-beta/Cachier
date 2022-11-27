const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const singleQuery = `{
  historiesResult {
    data {
      id
      links {
        article
      }
    }
    result {
      totalCount
    }
  }
}
`;

const testPartialQuery = `{
  historiesResult {
    data {
      id
    }
  }
}`;

const uniques = { data: 'id' };

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
  variables[key] = value.slice(1, -1);

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

  while (bracketCount > 0) {
    if (query[index++] === '{') bracketCount--;
  }
  const helper = () => {
    while (bracketCount >= 0 && index < query.length) {
      if (query[index] === '}') {
        bracketCount--;
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

        while (bracketCount >= 1) {
          let nestStr = '';
          if (query[index] === '}') {
            bracketCount--;
          }
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

          if (query[index + 1] === '{') {
            bracketCount++;

            currArray.push({});
            currArray[currArray.length - 1][nestStr] = [];
            currArray = currArray[currArray.length - 1][nestStr];
            nestStr = '';
          } else if (nestStr !== '') {
            currArray.push(nestStr);
          }
          index++;
        }
        // }
      }
      if (tempStr !== '') {
        resultArr.push(tempStr);
        tempStr = '';
      }
    }

    index++;
  };
  helper();
  return resultArr;
}

function createKeyForVariableQuery(query) {
  const variable = Object.keys(checkVariable(query))[0];
  const id = checkVariable(query)[variable];
  const type = checkType(query);
  if (!id) return type;
  return `${type}:${id}`;
}

function queryNormalizer(query) {
  query = addTypenameField(query);
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

console.log('QUERY', queryNormalizer(singleQuery));
const data = {
  data: {
    historiesResult: {
      __typename: 'HistoriesResult',
      data: [
        {
          __typename: 'History',
          id: '7',
          links: {
            __typename: 'Link',
            article:
              'http://spacenews.com/37740spacex-retires-grasshopper-new-test-rig-to-fly-in-december/',
          },
        },
        {
          __typename: 'History',
          id: '16',
          links: {
            __typename: 'Link',
            article:
              'https://spaceflightnow.com/2017/03/31/spacex-flies-rocket-for-second-time-in-historic-test-of-cost-cutting-technology/',
          },
        },
        {
          __typename: 'History',
          id: '14',
          links: {
            __typename: 'Link',
            article:
              'https://spaceflightnow.com/2015/12/22/round-trip-rocket-flight-gives-spacex-a-trifecta-of-successes/',
          },
        },
        {
          __typename: 'History',
          id: '17',
          links: {
            __typename: 'Link',
            article:
              'https://spaceflightnow.com/2017/06/03/reused-dragon-cargo-capsule-launched-on-journey-to-space-station/',
          },
        },
        {
          __typename: 'History',
          id: '9',
          links: {
            __typename: 'Link',
            article:
              'https://www.space.com/25562-spacex-falcon-9-reusable-rocket-test.html',
          },
        },
        {
          __typename: 'History',
          id: '8',
          links: {
            __typename: 'Link',
            article:
              'http://www.newspacejournal.com/2013/03/27/after-dragon-spacexs-focus-returns-to-falcon/',
          },
        },
        {
          __typename: 'History',
          id: '12',
          links: {
            __typename: 'Link',
            article:
              'https://spaceflightnow.com/2015/01/10/dragon-successfully-launched-rocket-recovery-demo-crash-lands/',
          },
        },
        {
          __typename: 'History',
          id: '11',
          links: {
            __typename: 'Link',
            article:
              'https://www.washingtonpost.com/news/the-switch/wp/2014/09/16/nasa-awards-space-contract-to-boeing-and-spacex/?utm_term=.d6388390d071',
          },
        },
        {
          __typename: 'History',
          id: '15',
          links: {
            __typename: 'Link',
            article:
              'https://spaceflightnow.com/2016/04/08/spacex-lands-rocket-on-floating-platform-after-station-resupply-launch/',
          },
        },
        {
          __typename: 'History',
          id: '6',
          links: {
            __typename: 'Link',
            article: 'http://thespacereview.com/article/2168/1',
          },
        },
        {
          __typename: 'History',
          id: '18',
          links: {
            __typename: 'Link',
            article:
              'https://spaceflightnow.com/2018/02/07/spacex-debuts-worlds-most-powerful-rocket-sends-tesla-toward-the-asteroid-belt/',
          },
        },
        {
          __typename: 'History',
          id: '20',
          links: {
            __typename: 'Link',
            article:
              'https://spaceflightnow.com/2018/08/07/indonesian-communications-satellite-deployed-in-orbit-by-spacex/',
          },
        },
        {
          __typename: 'History',
          id: '5',
          links: {
            __typename: 'Link',
            article: 'http://www.cnn.com/2010/US/12/08/space.flight/index.html',
          },
        },
        {
          __typename: 'History',
          id: '19',
          links: {
            __typename: 'Link',
            article:
              'https://spaceflightnow.com/2018/05/11/spacex-debuts-an-improved-human-rated-model-of-the-falcon-9-rocket/',
          },
        },
        {
          __typename: 'History',
          id: '10',
          links: {
            __typename: 'Link',
            article:
              'http://www.parabolicarc.com/2014/05/02/falcon-9-reusable-vehicle-flies-1000-meters/',
          },
        },
        {
          __typename: 'History',
          id: '13',
          links: {
            __typename: 'Link',
            article:
              'https://spaceflightnow.com/2015/04/21/dragon-pad-abort-test-set-for-early-may/',
          },
        },
        {
          __typename: 'History',
          id: '1',
          links: {
            __typename: 'Link',
            article:
              'http://www.spacex.com/news/2013/02/11/flight-4-launch-update-0',
          },
        },
        {
          __typename: 'History',
          id: '4',
          links: {
            __typename: 'Link',
            article: 'http://www.bbc.com/news/10209704',
          },
        },
        {
          __typename: 'History',
          id: '3',
          links: {
            __typename: 'Link',
            article: 'http://www.spacex.com/news/2013/02/12/falcon-1-flight-5',
          },
        },
        {
          __typename: 'History',
          id: '2',
          links: {
            __typename: 'Link',
            article:
              'https://www.nasaspaceflight.com/2008/12/spacex-and-orbital-win-huge-crs-contract-from-nasa/',
          },
        },
      ],
      result: {
        __typename: 'Result',
        totalCount: 20,
      },
    },
  },
};

function iterateFieldsArr(fieldArr, currCacheKey, data, dataKey, currCache) {
  let currDepthObj = {};
  currCache[currCacheKey] = currDepthObj;

  for (let j = 0; j < fieldArr.length; j++) {
    if (Array.isArray(data[dataKey])) {
      const tempArr = [];
      let index = 0;

      data[dataKey].forEach((obj) => {
        console.log(data[dataKey][index]);
        // may need to edge case check in future to have error in case user forgets to insert a unique id.
        const unique = uniques[currCacheKey] || 'id';
        const uniqueKey = `${obj.__typename}:${obj[unique]}`;

        tempArr.push(uniqueKey);
        currCache[uniqueKey] = iterateFieldsArr(
          fieldArr,
          index,
          data[dataKey],
          index,
          currCache[currCacheKey]
        );
        index++;
      });
      currCache[currCacheKey] = tempArr;
    } else if (typeof fieldArr[j] === 'string') {
      currDepthObj[fieldArr[j]] = data[dataKey][fieldArr[j]];
    } else {
      const currNestedFieldName = Object.keys(fieldArr[j])[0];
      const innerField = fieldArr[j][currNestedFieldName];
      iterateFieldsArr(
        innerField,
        currNestedFieldName,
        data[dataKey],
        currNestedFieldName,
        currCache[currCacheKey]
      );
    }
  }
  return currDepthObj;
}

function cacheNewData(normalizedQuery, data, cache) {
  const { typesArr, cacheKeysArr, fieldsArr } = normalizedQuery;
  const currData = data.data;
  for (let i = 0; i < fieldsArr.length; i++) {
    let currCacheKey = cacheKeysArr[i];
    iterateFieldsArr(fieldsArr[i], currCacheKey, currData, currCacheKey, cache);
  }
  console.log('CACHE', testCache);
}

const testCache = {};
cacheNewData(queryNormalizer(singleQuery), data, testCache);

function iterateCache(fieldArr, currCacheKey, currReturnData, currCache) {
  const currDepthObj = {};
  currReturnData[currCacheKey] = currDepthObj;
  console.log(currCache[currCacheKey]);
  for (let j = 0; j < fieldArr.length; j++) {
    if (currCache[currCacheKey] === undefined) {
      return false;
    } else {
      if (Array.isArray(currCache[currCacheKey])) {
        const tempArr = [];
        let index = 0;
        console.log(currCache);
        currCache[currCacheKey].forEach((key) => {
          console.log(currCache[currCacheKey][index]);
          tempArr.push(
            iterateCache(
              fieldArr,
              currCache[currCacheKey][index],
              currReturnData[currCacheKey],
              currCache
            )
          );
          currCache[key];
          index++;
        });
        currReturnData[currCacheKey] = tempArr;
      } else if (typeof fieldArr[j] === 'string') {
        console.log(fieldArr[j]);
        console.log(currCache[currCacheKey]);
        console.log(currCache);
        if (currCache[currCacheKey][fieldArr[j]] === undefined) return false;
        currDepthObj[fieldArr[j]] = currCache[currCacheKey][fieldArr[j]];
      } else {
        const currNestedFieldName = Object.keys(fieldArr[j])[0];
        const innerField = fieldArr[j][currNestedFieldName];
        iterateCache(
          innerField,
          currNestedFieldName,
          currDepthObj,
          currCache[currCacheKey]
        );
      }
    }
  }
  return currDepthObj;
}

function checkCache(normalizedQuery, cache) {
  const { typesArr, cacheKeysArr, fieldsArr } = normalizedQuery;
  const resultData = { data: {} };
  const currData = resultData.data;
  console.log(typesArr, cacheKeysArr, fieldsArr);
  for (let i = 0; i < fieldsArr.length; i++) {
    let currCacheKey = cacheKeysArr[i];
    console.log(iterateCache(fieldsArr[i], currCacheKey, currData, cache));
  }
  console.log('RESULTDATA', resultData);
  return resultData;
}
checkCache(queryNormalizer(testPartialQuery), testCache);

// function partialQueryCache(endpoint) {
//   const cache = {};
//   const uniques = { continents: 'code' };

//   return async function checkCache() {
//     const query = testQuery;
//     const variable = checkVariable(query);

//     if (variable) {
//       const cacheKey = createKeyForVariableQuery(query);
//       if (cache[cacheKey]) {
//       } else {
//         fetch(endpoint, {
//           method: 'POST',
//           headers: { 'Content-type': 'application/json' },
//           body: JSON.stringify({
//             query,
//           }),
//         })
//           .then((response) => response.json())
//           .then((data) => {
//             const type = checkType(query);
//             console.log(data.data[type]);
//             cache[cacheKey] = data.data[type];
//             console.log(cache);
//           });
//       }
//     } else {
//       const cacheKey = checkType(query);
//       if (cache[cacheKey]) {
//       } else {
//       }
//     }
//   };
// }

// const test = partialQueryCache('http://localhost:3000/graphql');
