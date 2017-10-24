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
  type Query {
    user(id: ID): User
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
    confirmUser(confirmationToken: String!): ConfirmEmailPayload 
    createUser(email: String!, ethereumAddress: String!, refererId: ID): CreateUserPayload
  }
`;

// Generate the schema object from your types definition.
module.exports = makeExecutableSchema({typeDefs, resolvers});