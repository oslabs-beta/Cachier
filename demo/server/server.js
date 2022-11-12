const path = require('path');
const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const schema = require('./schema.js');
const cacheMoney = require('./cacheMoney.js');
const cors = require('cors');
const Redis = require('redis');
const REDIS_PORT = 6379;
const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const client = Redis.createClient(REDIS_PORT);
client.connect();

app.use(express.static(path.resolve(__dirname, "../client")));

app.use(
  '/cacheMoney',
  cacheMoney('http://localhost:3000/graphql', client, 50, 5)
);

app.use(
  '/graphql',
  expressGraphQL({
    schema: schema,
    graphiql: true,
  })
);

app.get('/*', (req, res) => {
    return res.sendFile(path.resolve(__dirname, "../client/index.html"), function(err) {
        if (err) {
            res.status(500).send(err)
        }
    })
})

app.use((req, res) => res.status(404).send('Cannot get route'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`listening on port ${PORT}...`));

module.exports = app;
