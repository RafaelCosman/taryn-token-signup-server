require("babel-core/register");
require('babel-polyfill');

const express = require('express');

// This package automatically parses JSON requests.
const bodyParser = require('body-parser');

const dotenv = require('dotenv').config();

const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');

var cors = require('cors');
const schema = require('./schema');
var app = express();

console.log(`Starting with contractAddress: ${process.env.CONTRACT_ADDRESS} and providerUrl: ${process.env.PROVIDER_URL}`)

app.use(cors())
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

//Todo: Fix this hack. This was put because payoutNextTokenGifts took forever.
const server = app.listen(process.env.PORT, () => {});
server.setTimeout(20 * 60 * 1000);
