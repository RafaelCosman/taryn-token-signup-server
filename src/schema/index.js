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
  type Mutation {
    sendTokens(address: String!, amount: Int!): Transaction 
  }
`;

// Generate the schema object from your types definition.
module.exports = makeExecutableSchema({typeDefs, resolvers});