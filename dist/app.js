'use strict';

var express = require('express');

// This package automatically parses JSON requests.
var bodyParser = require('body-parser');

var _require = require('apollo-server-express'),
  graphqlExpress = _require.graphqlExpress,
  graphiqlExpress = _require.graphiqlExpress;

var schema = require('./src/schema');
var app = express();

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: schema }));

// const PORT = 3000
app.listen(process.env.PORT, function () { });