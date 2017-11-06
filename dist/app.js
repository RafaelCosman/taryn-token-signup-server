'use strict';

var express = require('express');

// This package automatically parses JSON requests.
var bodyParser = require('body-parser');

var dotenv = require('dotenv').config();

var _require = require('apollo-server-express'),
    graphqlExpress = _require.graphqlExpress,
    graphiqlExpress = _require.graphiqlExpress;

var cors = require('cors');
var schema = require('./src/schema');
var app = express();
console.log(schema);

app.use(cors());
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: schema }));

app.listen(process.env.PORT, function () {});