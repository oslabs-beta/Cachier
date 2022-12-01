import { Request, Response } from 'express';

require('dotenv').config();
const path = require('path');
const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const schema = require('./schema.js');
const redis = require('redis');
const demoFunc = require('./DemoFunc.js');

const cors = require('cors');
const connectDB = require('./config/db');
const port = process.env.PORT || 3000;
const app = express();
const partialQueryCache = require('@cachier/cache-partials');

connectDB();
// Changed package.json to "start": "server2.js"
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../client')));

app.use('/cacheMoney', demoFunc('http://localhost:3000/graphql', 4, 2));

app.use(
  '/partialCache',
  partialQueryCache('http://localhost:3000/graphql', 60)
);

app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

app.get('/*', (req: Request, res: Response) => {
  res.sendFile(
    path.resolve(__dirname, '../../dist/index.html'),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.use((req: Request, res: Response) =>
  res.status(404).send('Cannot get route')
);

app.listen(port, console.log(`Server listening on ${port}`));

module.exports = app;
