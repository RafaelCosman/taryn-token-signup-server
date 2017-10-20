const express = require('express');

// This package automatically parses JSON requests.
const bodyParser = require('body-parser');

const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');

const schema = require('./src/schema');
var app = express();

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// const PORT = 3000
app.listen(process.env.PORT, () => {});