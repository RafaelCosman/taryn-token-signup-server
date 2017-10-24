const {makeExecutableSchema} = require('graphql-tools');
const resolvers = require('./resolvers');

// Define your types here.
const typeDefs = `
  type Transaction {
    id: ID!
  }
  type User {
    id: ID! 
    email: String!
    confirmationToken: String
    hasConfirmedEmail: Boolean
    ethereumAddress: String!
    tokenCount: Int!
    friendsReferred: [User!]!
    referrer: User
  }
  type TokenGift {
    id: ID! 
    transactionHash: String
    isForReferral: Boolean
  }
  type Query {
    user(id: ID): User
    tokenGift(id: ID): TokenGift
  }
  type ConfirmEmailPayload {
    id: ID!
    ethereumAddress: String
    email: String
  }
  type CreateUserPayload {
    id: ID!
    email: String
    ethereumAddress: String
  }
  type Mutation {
    sendTokens(address: String!, amount: Int!): Transaction 
    confirmEmail(confirmationToken: String!): ConfirmEmailPayload 
    createUser(email: String!, ethereumAddress: String!, referrerId: ID): CreateUserPayload
    createTokenGift: TokenGift
  }
`;

// Generate the schema object from your types definition.
module.exports = makeExecutableSchema({typeDefs, resolvers});