require ('dotenv').config()
const path = require('path');
const express = require('express');
//const expressGraphQL = require('express-graphql').graphqlHTTP;
const graphqlHTTP = require('express-graphql').graphqlHTTP;


const schema = require('./schema2.js');
// Jonathan's Linked List
const cacheMoney = require('./cacheMoney.js');
const cors = require('cors');
const Redis = require('redis');
const REDIS_PORT = 6379;
// Changing port variable 
// const PORT = 3000;
const connectDB = require ('./config/db');
const port = process.env.PORT || 3000 
const app = express(); 

connectDB();
// Changed package.json to "start": "server2.js"
app.use(cors());

app.use ('/graphql',
    graphqlHTTP({
    schema,  
    graphiql: process.env.NODE_ENV === 'development'
  })
);
app.listen (port, console.log (port, " AAAAAAA"));