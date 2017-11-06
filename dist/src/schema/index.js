"use strict";

var _resolvers = require("../resolvers");

var _require = require('graphql-tools'),
    makeExecutableSchema = _require.makeExecutableSchema;

// Define types
var typeDefs = "\n  type User {\n    id: ID! \n    email: String!\n    hasConfirmedEmail: Boolean\n    tokenCount: Int!\n  }\n\n  type TokenGift {\n    id: ID! \n    transactionHash: String\n    isForReferral: Boolean\n  }\n\n  type TokenCountPayload {\n    count: Int!\n  }\n\n  type Query {\n    User(id: ID): User\n    TokenGift(id: ID): TokenGift\n    allTokenGifts: [TokenGift]\n    tokenCount: TokenCountPayload\n    userTokenBalance(ethereumAddress: String!): TokenCountPayload\n  }\n\n  type ConfirmEmailPayload {\n    id: ID!\n    ethereumAddress: String\n    email: String\n  }\n\n  type CreateUserPayload {\n    id: ID!\n    email: String\n    ethereumAddress: String\n  }\n\n  type Transaction {\n    id: ID!\n  }\n\n  type Mutation {\n    confirmEmail(confirmationToken: String!): User\n    createUser(email: String!, ethereumAddress: String!, referrerId: ID): CreateUserPayload\n    payoutTokenGift(id: String!): TokenGift\n    payoutNextTokenGifts: [TokenGift]\n  }\n";

// Generate the schema object from your types definition.
module.exports = makeExecutableSchema({ typeDefs: typeDefs, resolvers: _resolvers.resolvers });