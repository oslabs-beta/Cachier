import { Request, Response, NextFunction } from 'express';

require('dotenv').config();
const path = require('path');
const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const schema = require('./schema.js');

// Eviction Queue Linked List
const cacheMoney = require('@cachier/server-side');
const demoFunc = require('./DemoFunc.js');
// const demoFunc = require('./DemoFunc.ts');

const cors = require('cors');
const Redis = require('redis');
const REDIS_PORT = 6379;
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

//need to uncomment to test partial queries
// const client = Redis.createClient(REDIS_PORT);
// client.connect();

app.use(express.static(path.resolve(__dirname, '../client')));

app.use('/cacheMoney', demoFunc('http://localhost:3000/graphql', 4, 2));
// app.use(
//   '/cacheMoney',
//   partialQueryCache('http://localhost:3000/graphql', client)
// );

app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

app.get('/*', (req: Request, res: Response) => {
  return res.sendFile(
    path.resolve(__dirname, '../client/index.html'),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.listen(port, console.log(`Server listening on ${port}`));

module.exports = app;
