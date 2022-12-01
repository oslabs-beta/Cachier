require('dotenv').config();
const path = require('path');
const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const schema = require('./schema.js');
const demoFunc = require('./DemoFunc.js');

const cors = require('cors');
const connectDB = require('./config/db');
const port = process.env.PORT || 3000;
const app = express();
const partialQueryCache = require('../../NPM_PartialCache/partialQuery.js');

connectDB();
// Changed package.json to "start": "server2.js"


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(express.static(path.resolve(__dirname, '../client')));
app.use(express.static(path.resolve(__dirname, '../../dist')));

app.use('/cacheMoney', demoFunc('https://cachier.onrender.com/graphql', 4, 2));

app.use(
  '/partialCache',
  partialQueryCache('https://cachier.onrender.com/graphql', 60)
);

app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: false
  })
);

app.get('/*', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, '../../dist/index.html'),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.use((req, res) => res.status(404).send('Cannot get route'));

app.listen(port, console.log(`Server listening on ${port}`));

module.exports = app;
