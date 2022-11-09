//const path = require('path');
const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const schema = require('./schema.js');

const cors = require('cors');


const PORT = 3000;

// const REDIS_PORT = process.env.PORT || 6379;
// const client = redis.createClient(REDIS_PORT);
// client.connect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/graphql', expressGraphQL({
  schema: schema,
  graphiql: true,
}));


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

app.listen(PORT,  () => console.log(`listening on port ${PORT}...`));

//export default app;
module.exports = app
