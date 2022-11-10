const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const Redis = require('redis');
const REDIS_PORT = 6379;
const cacheMoney = require('./cacheMoney');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const client = Redis.createClient(REDIS_PORT);
client.connect();

app.use(
  '/cacheMoney',
  cacheMoney('https://api.spacex.land/graphql/', client, 3, 2)
);

// client.set('cache', 'money');

// async function getData() {
//   const queryStr = `query{
//     continents {
//         name
//         code
//     }
// } `;
//   let queryData;

//   const data = await fetch('https://countries.trevorblades.com/', {
//     method: 'POST',
//     headers: { 'Content-type': 'application/json' },
//     body: JSON.stringify({
//       query: queryStr,
//       variables: {},
//     }),
//   });

//   const theData = await data.json();
//   setter(queryStr, JSON.stringify(theData));
//   const test = await getter(queryStr);
//   const parsed = JSON.parse(test);
//   console.log('test', parsed);

//   //   console.log(theData.data);=
//   return theData.data;
// }

// getData();

// // getData().then((data) => console.log(data));

// // const endpoint = 'https://countries.trevorblades.com/';
// // const headers = {
// //   'Content-type': 'application/json',
// // };
// // const graphQLGetData = {
// //   query: `query { continents { name code }}`,
// //   variables: {},
// // };
// //
// // const response = axios({
// //   url: endpoint,
// //   method: 'post',
// //   headers: headers,
// //   data: graphQLGetData,
// // }).then((data) => {
// //   console.log(data.data);
// // });

// //should be inside a setter
// async function setter(key, value) {
//   await client.set(key, value);
// }
// setter('Andy', 'Big Andy');

// // getter
// async function getter(key) {
//   const value = await client.get(key);
//   // const parsedData = await JSON.parse(value);
//   //   console.log(value);
//   return value;
// }

// // deleting function
// async function deleter(key) {
//   await client.sendCommand(['DEL', key]);
// }

// setter('Andy', 'Big Andy');

// getter('Andy');

app.listen(port, () => console.log(`Server started on port ${port}`));
