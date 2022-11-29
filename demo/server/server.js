require('dotenv').config();
const path = require('path');
const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const schema = require('./schema.js');
// Jonathan's Linked List
const cacheMoney = require('@cachier/server-side');
const demoFunc = require('./DemoFunc');

const cors = require('cors');
const Redis = require('redis');
const REDIS_PORT = 6379;
// Changing port variable
const PORT = 3000;
const connectDB = require('./config/db');
const { cache } = require('webpack');
const port = process.env.PORT || 3000;
const app = express();
const partialQueryCache = require('../../NPM_PartialCache/partialQuery');

connectDB();
// Changed package.json to "start": "server2.js"
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const client = Redis.createClient(REDIS_PORT);
client.connect();

app.use(express.static(path.resolve(__dirname, '../client')));

// app.use('/cacheMoney', demoFunc('http://localhost:3000/graphql', 4, 2));
app.use(
  '/cacheMoney',
  partialQueryCache('http://localhost:3000/graphql', client)
);

app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

app.get('/*', (req, res) => {
  return res.sendFile(
    path.resolve(__dirname, '../client/index.html'),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

// const Redis = require('redis');
// const REDIS_PORT = 6379;
// const client = Redis.createClient(REDIS_PORT);
// client.connect();

// const singleQuery = `{
//   launchNext {
//     __typename
//     details
//     id
//   }
//   landpads {
//     id
//     __typename
//     location {
//       __typename
//       latitude
//       longitude
//     }
//   }
// }
// `;
// const nextQuery = `{
//   landpads {
//     id
//     __typename
//     location {
//       __typename
//       latitude
//       longitude
//     }
//   }
//   dragons {
//     __typename
//     id
//     name
//     trunk {
//       __typename
//       cargo {
//         __typename
//         solar_array
//         unpressurized_cargo
//       }
//     }
//   }
// }
// `;

// const testPartialQuery = `{
//   launchNext {
//     __typename
//     details
//     id
//   }
//   landpads {
//     id
//     __typename
//     location {
//       __typename
//       latitude
//       longitude
//     }
//   }
// }
// `;

// const uniques = { landpads: 'id' };

// function addTypenameField(query) {
//   let newQuery = '';
//   let bracketCount = 2;
//   let index = 0;
//   while (bracketCount > 0) {
//     if (query[index] === '{') bracketCount--;
//     newQuery += query[index++];
//   }

//   newQuery += ' __typename';

//   while (query[index] !== undefined) {
//     newQuery += query[index];
//     if (query[index] === '{') newQuery += ' __typename';
//     index++;
//   }
//   console.log(newQuery);
//   return newQuery;
// }

// function seperateOuterQueries(query) {
//   const outerQueryArr = [];
//   let index = 0;
//   let mainbracketCount = 1;
//   while (query[index] !== '{') {
//     index++;
//   }
//   index++;
//   while (mainbracketCount > 0) {
//     let currQueryStr = '{';
//     let currInnerBracketCount = 1;
//     while (query[index] !== '{') {
//       if (query[index] === '}') {
//         return outerQueryArr;
//       }
//       currQueryStr += query[index];
//       index++;
//     }
//     currQueryStr += query[index];
//     index++;
//     mainbracketCount++;
//     while (currInnerBracketCount > 0) {
//       if (query[index] === '{') {
//         currInnerBracketCount++;
//         mainbracketCount++;
//       }
//       if (query[index] === '}') {
//         currInnerBracketCount--;
//         mainbracketCount--;
//       }
//       currQueryStr += query[index];
//       index++;
//     }
//     outerQueryArr.push((currQueryStr += '}'));
//   }
//   return outerQueryArr;
// }

// function checkVariable(query) {
//   const variables = {};
//   let key = '';
//   let value = '';
//   let index = 0;

//   while (query[index] !== '(') {
//     if (query[index] === '}') return false;
//     index++;
//   }
//   while (query[++index] !== ':') {
//     key += query[index];
//   }
//   while (query[++index] !== ')') {
//     if (query[index] !== '"' && query[index] !== "'" && query[index] !== ' ') {
//       value += query[index];
//     }
//   }
//   key = key.toLowerCase().trim();
//   variables[key] = value.trim();

//   return variables;
// }

// function checkType(query) {
//   let index = 0;
//   let str = '';
//   while (query[index] !== '{') {
//     index++;
//   }
//   index++;
//   while (query[index] !== '(' && query[index] !== '{') {
//     if (query[index] !== ' ' && query.charCodeAt(index) !== 10) {
//       str += query[index];
//     }
//     index++;
//   }

//   return str;
// }

// function seperateInnerQueries(query) {
//   const resultArr = [];
//   let bracketCount = 2;
//   let index = 0;
//   let obj = {};
//   let tempStr = '';

//   while (bracketCount > 0) {
//     if (query[index++] === '{') bracketCount--;
//   }
//   const helper = () => {
//     while (bracketCount >= 0 && index < query.length) {
//       if (query[index] === '}') {
//         bracketCount--;
//         index++;
//       }

//       while (query[index] === ' ' || query.charCodeAt(index) === 10) {
//         ++index;
//       }
//       while (
//         query[index] !== ' ' &&
//         query.charCodeAt(index) !== 10 &&
//         index < query.length &&
//         query[index] !== '}' &&
//         query[index] !== '{'
//       ) {
//         tempStr += query[index];
//         ++index;
//       }
//       if (query[index] === '{') {
//         bracketCount++;
//         index++;
//         const key = resultArr[resultArr.length - 1];
//         resultArr[resultArr.length - 1] = {};
//         resultArr[resultArr.length - 1][key] = [];
//         let currArray = resultArr[resultArr.length - 1][key];

//         while (bracketCount >= 1) {
//           let nestStr = '';
//           if (query[index] === '}') {
//             bracketCount--;
//           }
//           while (
//             query[index] !== ' ' &&
//             query.charCodeAt(index) !== 10 &&
//             index < query.length &&
//             query[index] !== '}' &&
//             query[index] !== '{'
//           ) {
//             nestStr += query[index];
//             ++index;
//           }

//           if (query[index + 1] === '{') {
//             bracketCount++;

//             currArray.push({});
//             currArray[currArray.length - 1][nestStr] = [];
//             currArray = currArray[currArray.length - 1][nestStr];
//             nestStr = '';
//           } else if (nestStr !== '') {
//             currArray.push(nestStr);
//           }
//           index++;
//         }
//         // }
//       }
//       if (tempStr !== '') {
//         resultArr.push(tempStr);
//         tempStr = '';
//       }
//     }

//     index++;
//   };
//   helper();
//   return resultArr;
// }

// function createKeyForVariableQuery(query) {
//   const variable = Object.keys(checkVariable(query))[0];
//   const id = checkVariable(query)[variable];
//   const type = checkType(query);
//   if (!id) return type;
//   return `${type}:${id}`;
// }

// function queryNormalizer(query, addType = true) {
//   if (addType) {
//     query = addTypenameField(query);
//   }
//   const outerQueryArr = seperateOuterQueries(query);
//   const normalizedQueryObj = {};
//   normalizedQueryObj.typesArr = outerQueryArr.map((query) => checkType(query));
//   normalizedQueryObj.cacheKeysArr = outerQueryArr.map((query) =>
//     createKeyForVariableQuery(query)
//   );
//   normalizedQueryObj.fieldsArr = outerQueryArr.map((query) =>
//     seperateInnerQueries(query)
//   );

//   return normalizedQueryObj;
// }

// console.log(queryNormalizer(singleQuery).typesArr);
// console.log(queryNormalizer(singleQuery).cacheKeysArr);
// console.log(queryNormalizer(singleQuery).fieldsArr);

// console.log('QUERY', queryNormalizer(singleQuery));
// const data = {
//   data: {
//     launchNext: {
//       __typename: 'Launch',
//       details:
//         "SpaceX's 21st ISS resupply mission on behalf of NASA and the first under the CRS-2 contract, this mission brings essential supplies to the International Space Station using the cargo variant of SpaceX's Dragon 2 spacecraft. The external payload for this mission is the Nanoracks Bishop Airlock. Falcon 9 and Dragon launch from LC-39A, Kennedy Space Center and the booster is expected to land on an ASDS. The mission will be complete with return and recovery of the Dragon capsule and down cargo.",
//       id: '110',
//     },
//     landpads: [
//       {
//         id: 'LZ-1',
//         __typename: 'Landpad',
//         location: {
//           __typename: 'Location',
//           latitude: 28.485833,
//           longitude: -80.544444,
//         },
//       },
//       {
//         id: 'LZ-2',
//         __typename: 'Landpad',
//         location: {
//           __typename: 'Location',
//           latitude: 28.485833,
//           longitude: -80.544444,
//         },
//       },
//       {
//         id: 'LZ-4',
//         __typename: 'Landpad',
//         location: {
//           __typename: 'Location',
//           latitude: 34.632989,
//           longitude: -120.615167,
//         },
//       },
//       {
//         id: 'OCISLY',
//         __typename: 'Landpad',
//         location: {
//           __typename: 'Location',
//           latitude: 28.4104,
//           longitude: -80.6188,
//         },
//       },
//       {
//         id: 'JRTI-1',
//         __typename: 'Landpad',
//         location: {
//           __typename: 'Location',
//           latitude: 28.4104,
//           longitude: -80.6188,
//         },
//       },
//       {
//         id: 'JRTI',
//         __typename: 'Landpad',
//         location: {
//           __typename: 'Location',
//           latitude: 33.7291858,
//           longitude: -118.262015,
//         },
//       },
//       {
//         id: 'ASOG',
//         __typename: 'Landpad',
//         location: {
//           __typename: 'Location',
//           latitude: 28.4104,
//           longitude: -80.6188,
//         },
//       },
//     ],
//   },
// };

// const data2 = {
//   data: {
//     landpads: [
//       {
//         id: 'LZ-1',
//         __typename: 'Landpad',
//         location: {
//           __typename: 'Location',
//           latitude: 28.485833,
//           longitude: -80.544444,
//         },
//       },
//       {
//         id: 'LZ-4',
//         __typename: 'Landpad',
//         location: {
//           __typename: 'Location',
//           latitude: 34.632989,
//           longitude: -120.615167,
//         },
//       },
//       {
//         id: 'OCISLY',
//         __typename: 'Landpad',
//         location: {
//           __typename: 'Location',
//           latitude: 28.4104,
//           longitude: -80.6188,
//         },
//       },
//       {
//         id: 'JRTI-1',
//         __typename: 'Landpad',
//         location: {
//           __typename: 'Location',
//           latitude: 28.4104,
//           longitude: -80.6188,
//         },
//       },
//       {
//         id: 'JRTI',
//         __typename: 'Landpad',
//         location: {
//           __typename: 'Location',
//           latitude: 33.7291858,
//           longitude: -118.262015,
//         },
//       },
//       {
//         id: 'ASOG',
//         __typename: 'Landpad',
//         location: {
//           __typename: 'Location',
//           latitude: 28.4104,
//           longitude: -80.6188,
//         },
//       },
//     ],
//     dragons: [
//       {
//         __typename: 'Dragon',
//         id: 'dragon2',
//         name: 'Dragon 2',
//         trunk: {
//           __typename: 'DragonTrunk',
//           cargo: {
//             __typename: 'DragonTrunkCargo',
//             solar_array: 2,
//             unpressurized_cargo: true,
//           },
//         },
//       },
//       {
//         __typename: 'Dragon',
//         id: 'dragon1',
//         name: 'Dragon 1',
//         trunk: {
//           __typename: 'DragonTrunk',
//           cargo: {
//             __typename: 'DragonTrunkCargo',
//             solar_array: 2,
//             unpressurized_cargo: true,
//           },
//         },
//       },
//     ],
//   },
// };
// const mockRedisCache = {};
// function iterateFieldsArr(
//   fieldArr,
//   currCacheKey,
//   data,
//   dataKey,
//   currCache,
//   redis
// ) {
//   depthCount++;
//   let currDepthObj = {};
//   let inUse = false;
//   currCache[currCacheKey] = currDepthObj;

//   for (let j = 0; j < fieldArr.length; j++) {
//     if (Array.isArray(data[dataKey])) {
//       const tempArr = [];
//       let index = 0;

//       data[dataKey].forEach((obj) => {
//         // may need to edge case check in future to have error in case user forgets to insert a unique id.
//         const unique = uniques[currCacheKey] || 'id';
//         const objTypeName = `${obj.__typename}`;
//         const uniqueKey = `${objTypeName.toLowerCase()}:${obj[unique]}`;

//         tempArr.push(uniqueKey);
//         //need to account for if the user is using redis
//         if (depthCount <= 1)
//           redis.set(
//             uniqueKey,
//             JSON.stringify(
//               iterateFieldsArr(
//                 fieldArr,
//                 index,
//                 data[dataKey],
//                 index,
//                 currCache[currCacheKey],
//                 redis
//               )
//             )
//           );
//         currCache[uniqueKey] = iterateFieldsArr(
//           fieldArr,
//           index,
//           data[dataKey],
//           index,
//           currCache[currCacheKey],
//           redis
//         );
//         index++;
//       });
//       //need to account for if the user is using redis
//       if (depthCount <= 1) {
//         redis.set(currCacheKey, JSON.stringify(tempArr));
//         inUse = true;
//       }

//       currCache[currCacheKey] = tempArr;
//     } else if (typeof fieldArr[j] === 'string') {
//       currDepthObj[fieldArr[j]] = data[dataKey][fieldArr[j]];
//     } else {
//       const currNestedFieldName = Object.keys(fieldArr[j])[0];
//       if (data[dataKey][currNestedFieldName] === null) {
//         currCache[dataKey][currNestedFieldName] = null;
//       } else {
//         const innerField = fieldArr[j][currNestedFieldName];
//         iterateFieldsArr(
//           innerField,
//           currNestedFieldName,
//           data[dataKey],
//           currNestedFieldName,
//           currCache[currCacheKey],
//           redis
//         );
//       }
//     }
//   }
//   if (depthCount <= 1) {
//     if (!inUse) {
//       redis.set(currCacheKey, JSON.stringify(currDepthObj));
//     }
//   }
//   depthCount--;
//   return currDepthObj;
// }

// let depthCount = 0;
// function cacheNewData(normalizedQuery, data, cache, redis) {
//   const { typesArr, cacheKeysArr, fieldsArr } = normalizedQuery;
//   const currData = data.data;
//   for (let i = 0; i < fieldsArr.length; i++) {
//     let currCacheKey = cacheKeysArr[i];

//     console.log(
//       currCacheKey,
//       iterateFieldsArr(
//         fieldsArr[i],
//         currCacheKey,
//         currData,
//         currCacheKey,
//         cache,
//         redis
//       )
//     );
//   }
// }

// const testCache = {};
// cacheNewData(queryNormalizer(singleQuery), data, testCache, client);
// cacheNewData(queryNormalizer(nextQuery), data2, testCache, client);
// console.log('CACHE', testCache);
// console.log('REDIS', mockRedisCache);

// function iterateCache(
//   fieldArr,
//   currCacheKey,
//   currReturnData,
//   currCache,
//   redis
// ) {
//   const currDepthObj = {};
//   let currCacheObj = currCache[currCacheKey];
//   depthCount++;
//   currReturnData[currCacheKey] = currDepthObj;
//   if (depthCount <= 1) {
//     redis.get(currCacheKey).then((data) => {
//       currCacheObj = JSON.parse(data);
//     });

//     // currCacheObj = JSON.parse(redisJSON);
//   }

//   for (let j = 0; j < fieldArr.length; j++) {
//     if (currCacheObj === undefined) {
//       checkMissingData = false;
//       return;
//     } else {
//       if (Array.isArray(currCacheObj)) {
//         const tempArr = [];
//         let index = 0;

//         currCacheObj.forEach((key) => {
//           tempArr.push(
//             iterateCache(
//               fieldArr,
//               currCacheObj[index],
//               currReturnData[currCacheKey],
//               currCache,
//               redis
//             )
//           );
//           if (tempArr[index] === false) {
//             checkMissingData = false;
//             return;
//           }
//           index++;
//         });
//         currReturnData[currCacheKey] = tempArr;
//       } else if (typeof fieldArr[j] === 'string') {
//         if (currCacheObj[fieldArr[j]] === undefined) {
//           checkMissingData = false;
//           return;
//         }
//         currDepthObj[fieldArr[j]] = currCacheObj[fieldArr[j]];
//       } else {
//         const currNestedFieldName = Object.keys(fieldArr[j])[0];
//         const innerField = fieldArr[j][currNestedFieldName];
//         if (currCacheObj[currNestedFieldName] === null) {
//           currDepthObj[currNestedFieldName] = null;
//         } else {
//           const result = iterateCache(
//             innerField,
//             currNestedFieldName,
//             currDepthObj,
//             currCacheObj,
//             redis
//           );
//           if (result === false) {
//             checkMissingData = false;
//             return;
//           }
//         }
//       }
//     }
//   }
//   depthCount--;
//   return currDepthObj;
// }

// let checkMissingData = true;
// function checkCache(normalizedQuery, cache, redis) {
//   const { typesArr, cacheKeysArr, fieldsArr } = normalizedQuery;
//   const resultData = { data: {} };
//   const currData = resultData.data;
//   for (let i = 0; i < fieldsArr.length; i++) {
//     let currCacheKey = cacheKeysArr[i];
//     iterateCache(fieldsArr[i], currCacheKey, currData, cache, redis);
//   }
//   if (checkMissingData) {
//     return resultData;
//   } else {
//     checkMissingData = true;
//     return false;
//   }
// }
// //checkCache(queryNormalizer(testPartialQuery, false), testCache);
// console.log(
//   'RESULTDATAA',

//   JSON.stringify(
//     checkCache(queryNormalizer(testPartialQuery, false), testCache, client),
//     null,
//     3
//   )
// );

app.listen(port, console.log(`Server listening on ${port}`));

module.exports = app;
