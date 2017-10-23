'use strict';

var _require = require('graphql-tools'),
    makeExecutableSchema = _require.makeExecutableSchema;

var resolvers = require('./resolvers');

// Define your types here.
var typeDefs = '\n  type Transaction {\n    id: ID!\n  }\n  type User {\n    id: ID! \n    email: String!\n    confirmationToken: String\n    hasConfirmedEmail: Boolean\n    ethereumAddress: String!\n    tokenCount: Int!\n    friendsReferred: [User!]!\n    referrer: User\n  }\n  type Query {\n    user(id: ID): User\n  }\n  type Mutation {\n    sendTokens(address: String!, amount: Int!): Transaction \n  }\n';

// Generate the schema object from your types definition.
module.exports = makeExecutableSchema({ typeDefs: typeDefs, resolvers: resolvers });