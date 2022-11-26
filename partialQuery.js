const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const singleQuery = `{
  historiesResult {
    __typename
    data {
      __typename
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

const uniques = { launches: 'id', data: 'id', mission: 'flight' };

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

          if (query[index + 1] === '{') {
            currArray.push({});
            currArray[currArray.length - 1][nestStr] = [];
            currArray = currArray[currArray.length - 1][nestStr];
            nestStr = '';
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

const data = {
  data: {
    historiesResult: {
      __typename: 'HistoriesResult',
      data: [
        {
          __typename: 'History',
          id: '7',
          links: {
            article:
              'http://spacenews.com/37740spacex-retires-grasshopper-new-test-rig-to-fly-in-december/',
          },
        },
        {
          __typename: 'History',
          id: '16',
          links: {
            article:
              'https://spaceflightnow.com/2017/03/31/spacex-flies-rocket-for-second-time-in-historic-test-of-cost-cutting-technology/',
          },
        },
        {
          __typename: 'History',
          id: '14',
          links: {
            article:
              'https://spaceflightnow.com/2015/12/22/round-trip-rocket-flight-gives-spacex-a-trifecta-of-successes/',
          },
        },
        {
          __typename: 'History',
          id: '17',
          links: {
            article:
              'https://spaceflightnow.com/2017/06/03/reused-dragon-cargo-capsule-launched-on-journey-to-space-station/',
          },
        },
        {
          __typename: 'History',
          id: '9',
          links: {
            article:
              'https://www.space.com/25562-spacex-falcon-9-reusable-rocket-test.html',
          },
        },
        {
          __typename: 'History',
          id: '8',
          links: {
            article:
              'http://www.newspacejournal.com/2013/03/27/after-dragon-spacexs-focus-returns-to-falcon/',
          },
        },
        {
          __typename: 'History',
          id: '12',
          links: {
            article:
              'https://spaceflightnow.com/2015/01/10/dragon-successfully-launched-rocket-recovery-demo-crash-lands/',
          },
        },
        {
          __typename: 'History',
          id: '11',
          links: {
            article:
              'https://www.washingtonpost.com/news/the-switch/wp/2014/09/16/nasa-awards-space-contract-to-boeing-and-spacex/?utm_term=.d6388390d071',
          },
        },
        {
          __typename: 'History',
          id: '15',
          links: {
            article:
              'https://spaceflightnow.com/2016/04/08/spacex-lands-rocket-on-floating-platform-after-station-resupply-launch/',
          },
        },
        {
          __typename: 'History',
          id: '6',
          links: {
            article: 'http://thespacereview.com/article/2168/1',
          },
        },
        {
          __typename: 'History',
          id: '18',
          links: {
            article:
              'https://spaceflightnow.com/2018/02/07/spacex-debuts-worlds-most-powerful-rocket-sends-tesla-toward-the-asteroid-belt/',
          },
        },
        {
          __typename: 'History',
          id: '20',
          links: {
            article:
              'https://spaceflightnow.com/2018/08/07/indonesian-communications-satellite-deployed-in-orbit-by-spacex/',
          },
        },
        {
          __typename: 'History',
          id: '5',
          links: {
            article: 'http://www.cnn.com/2010/US/12/08/space.flight/index.html',
          },
        },
        {
          __typename: 'History',
          id: '19',
          links: {
            article:
              'https://spaceflightnow.com/2018/05/11/spacex-debuts-an-improved-human-rated-model-of-the-falcon-9-rocket/',
          },
        },
        {
          __typename: 'History',
          id: '10',
          links: {
            article:
              'http://www.parabolicarc.com/2014/05/02/falcon-9-reusable-vehicle-flies-1000-meters/',
          },
        },
        {
          __typename: 'History',
          id: '13',
          links: {
            article:
              'https://spaceflightnow.com/2015/04/21/dragon-pad-abort-test-set-for-early-may/',
          },
        },
        {
          __typename: 'History',
          id: '1',
          links: {
            article:
              'http://www.spacex.com/news/2013/02/11/flight-4-launch-update-0',
          },
        },
        {
          __typename: 'History',
          id: '4',
          links: {
            article: 'http://www.bbc.com/news/10209704',
          },
        },
        {
          __typename: 'History',
          id: '3',
          links: {
            article: 'http://www.spacex.com/news/2013/02/12/falcon-1-flight-5',
          },
        },
        {
          __typename: 'History',
          id: '2',
          links: {
            article:
              'https://www.nasaspaceflight.com/2008/12/spacex-and-orbital-win-huge-crs-contract-from-nasa/',
          },
        },
      ],
      result: {
        totalCount: 20,
      },
    },
  },
};

// function cacheNewData(normalizedQuery, data, cache) {
//   const innerData = data.data;
//   let currFullCacheKey = '';
//   console.log(normalizedQuery);
//   for (let i = 0; i < normalizedQuery.typesArr.length; i++) {
//     let currType = normalizedQuery.typesArr[i];
//     let currCacheKey = normalizedQuery.cacheKeysArr[i];
//     console.log(currCacheKey);
//     let currFieldsArr = normalizedQuery.fieldsArr[i];
//     console.log(currFieldsArr);
//     if (Array.isArray(innerData[currType])) {
//       const refArr = [];
//       const uniqueID = uniques[currType];
//       innerData[currType].forEach((obj) => {
//         const cacheKey = `${obj.__typename}:${obj[uniqueID]}`;
//         console.log(cacheKey);
//         refArr.push(cacheKey);
//         cache[cacheKey] = {};
//         ///////////////
//         for (let field of currFieldsArr) {
//           if (typeof field === 'object') {
//             const nestedFieldObj = {};
//             const nestedData = obj;

//             function cacheNestedObj(obj) {
//               const tempKey = Object.keys(obj)[0];
//               currFullCacheKey += tempKey;
//               // nestedFieldObj[tempKey] = {};
//               for (let nestedField of obj[tempKey]) {
//                 if (typeof nestedField === 'object') {
//                   cacheNestedObj(nestedField[Object.keys(nestedField)[0]]);
//                 } else {
//                   nestedFieldObj[tempKey] = nestedData[tempKey];
//                   console.log(nestedFieldObj[tempKey]);
//                 }
//               }
//               return nestedFieldObj;
//             }
//             cache[cacheKey][Object.keys(field)[0]] =
//               cacheNestedObj(field)[Object.keys(field)[0]];
//           } else {
//             cache[cacheKey][field] = obj[field];
//           }
//         }
//         cache[currType] = refArr;
//       });
//     } else {
//       cache[currCacheKey] = {};
//       currFullCacheKey += currCacheKey;
//       for (let field of currFieldsArr) {
//         console.log(field);
//         if (typeof field === 'object') {
//           const nestedFieldObj = {};
//           const nestedData = innerData[currType];
//           console.log();

//           function cacheNestedObj(obj) {
//             const tempKey = Object.keys(obj)[0];
//             currFullCacheKey += `:${tempKey}`;
//             console.log(currFullCacheKey);
//             //nestedFieldObj[tempKey] = {};
//             console.log(obj[tempKey]);
//             for (let nestedField of obj[tempKey]) {
//               if (typeof nestedField === 'object') {
//                 cacheNestedObj(nestedField);
//               } else {
//                 console.log(nestedData[tempKey]);
//                 if (Array.isArray(nestedData[tempKey])) {
//                   const refArr = [];
//                   const uniqueID = uniques[tempKey];
//                   console.log(uniqueID);
//                   console.log(nestedData[tempKey]);
//                   nestedData[tempKey].forEach((obj) => {
//                     const cacheKey = `${currFullCacheKey}:${obj[uniqueID]}`;
//                     console.log(currFullCacheKey);
//                     cache[cacheKey] = {};
//                     refArr.push(cacheKey);
//                     field[Object.keys(field)[0]].forEach((subField) => {
//                       console.log(subField);
//                       if (typeof subField === 'object') {
//                         console.log(subField);
//                         console.log(cacheKey);
//                         cacheNestedObj(subField);
//                       } else {
//                         cache[cacheKey][subField] = obj[subField];
//                         console.log(obj[subField]);
//                       }
//                     });
//                   });
//                   console.log(refArr);
//                   console.log(nestedFieldObj);
//                   cache[currCacheKey][tempKey] = refArr;
//                   console.log(nestedFieldObj);
//                 } else {
//                   ///////////////////////////////////
//                   if (nestedData[tempKey] !== undefined)
//                     nestedFieldObj[tempKey] = nestedData[tempKey];
//                 }
//               }
//             }

//             console.log(nestedFieldObj);
//             currFullCacheKey = '';
//             return nestedFieldObj;
//           }
//           console.log(currCacheKey);
//           cacheNestedObj(field);
//         } else {
//           console.log();
//           cache[currCacheKey][field] = innerData[currType][field];
//         }
//       }
//     }
//   }

//   return cache;
// }

// const flattenedQuery = queryNormalizer(singleQuery);
// const testCache = {};
// console.log(
//   'FADSFSAGGSAD',
//   seperateOuterQueries(singleQuery).map((query) => {
//     return seperateInnerQueries(query);
//   })
// );
// cacheNewData(flattenedQuery, data, testCache);
// console.log('CACHE2', testCache);

// const partialSingleQuery = `
// {
//   historiesResult {
//     __typename
//     data {
//       __typename
//       id
//     }
//   }
// }
// `;

// const partialSingleQueryData = {
//   data: {
//     dragons: [
//       {
//         __typename: 'Dragon',
//         first_flight: '2019-03-02',
//         return_payload_vol: {
//           __typename: 'Volume',
//           cubic_feet: 388,
//         },
//       },
//       {
//         __typename: 'Dragon',
//         first_flight: '2010-12-08',
//         return_payload_vol: {
//           __typename: 'Volume',
//           cubic_feet: 388,
//         },
//       },
//     ],
//   },
// };
// // function checkCache(query, cache) {
// //   const data = { data: {} };
// //   const innerData = data.data;
// //   const normalizedQuery = queryNormalizer(query);
// //   for (let i = 0; i < normalizedQuery.cacheKeysArr.length; i++) {
// //     const partialCacheData = cache[normalizedQuery.cacheKeysArr[i]];

// //     console.log(partialCacheData);
// //     innerData[normalizedQuery.cacheKeysArr[i]] = {};
// //     console.log(innerData);
// //     function resolveNestedCacheData(partialCacheData, innerData) {
// //       if (partialCacheData === undefined) {
// //         return false;
// //       }
// //       console.log(partialCacheData);
// //       if (Array.isArray(partialCacheData)) {
// //         if (typeof partialCacheData[0] === 'string') {
// //           const resolvedArr = [];
// //           for (let j = 0; j < partialCacheData.length; j++) {
// //             console.log(partialCacheData);
// //             const currPartialData = cache[partialCacheData[j]];
// //             const partialObj = {};
// //             for (let k = 0; k < normalizedQuery.fieldsArr[i].length; k++) {
// //               console.log(normalizedQuery.fieldsArr);
// //               if (typeof normalizedQuery.fieldsArr[i][k] === 'object') {
// //                 // const obj = {};
// //                 function nestedDataFromCacheIterator(field, data, obj) {
// //                   const key = Object.keys(field)[0];
// //                   const currObj = (obj[key] = {});

// //                   const nestedPartialData = data[key];
// //                   for (let nestedField of field[key]) {
// //                     if (nestedField === 'object') {
// //                       nestedDataFromCacheIterator(
// //                         nestedField,
// //                         nestedPartialData,
// //                         currObj
// //                       );
// //                     } else {
// //                       console.log(nestedField);
// //                       currObj[nestedField] = nestedPartialData[nestedField];
// //                     }
// //                   }
// //                 }
// //                 nestedDataFromCacheIterator(
// //                   normalizedQuery.fieldsArr[i][k],
// //                   currPartialData,
// //                   partialObj
// //                 );
// //               } else if (
// //                 currPartialData[normalizedQuery.fieldsArr[i][k]] === undefined
// //               ) {
// //                 return false;
// //               } else {
// //                 partialObj[normalizedQuery.fieldsArr[i][k]] =
// //                   currPartialData[normalizedQuery.fieldsArr[i][k]];
// //               }
// //             }
// //             resolvedArr.push(partialObj);
// //           }
// //           innerData[normalizedQuery.cacheKeysArr[i]] = resolvedArr;
// //         }
// //       } else if (typeof partialCacheData === 'object') {
// //         console.log(partialCacheData);
// //         console.log(innerData);
// //         Object.keys(partialCacheData).forEach((key) => {
// //           console.log(key);
// //           const newInnerData = innerData[Object.keys(innerData)];
// //           console.log(newInnerData);
// //           if (!Array.isArray(partialCacheData[key])) {
// //             newInnerData[key] = partialCacheData[key];
// //           } else {
// //             console.log(key);
// //             newInnerData[key] = {};
// //             console.log(newInnerData);
// //             console.log(innerData);
// //             console.log(partialCacheData[key]);
// //             for (let k = 0; k < normalizedQuery.fieldsArr[i].length; k++) {
// //               console.log(normalizedQuery.fieldsArr[i][k]);
// //               if()
// //             }
// //           }
// //         });

// //         //resolveNestedCacheData(partialCacheData[key], innerData[key]);
// //       } else {
// //         console.log(normalizedQuery);
// //         innerData[normalizedQuery.cacheKeysArr[i]] = partialCacheData;
// //       }
// //     }
// //     resolveNestedCacheData(partialCacheData, innerData);
// //   }
// //   console.log('DATA', data);
// // }

// // checkCache(partialSingleQuery, testCache);

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
