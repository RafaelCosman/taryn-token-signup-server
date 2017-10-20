const {makeExecutableSchema} = require('graphql-tools');
const resolvers = require('./resolvers');

// Define your types here.
const typeDefs = `
  type Link {
    id: ID!
    url: String!
    description: String!
  }
  type Transaction {
    id: ID!
  }
  type Query {
    allLinks: [Link!]!
  }
  type Mutation {
    createLink(url: String!, description: String!): Link
    sendTokens(address: String!, amount: Int!): Transaction 
  }
`;

// Generate the schema object from your types definition.
module.exports = makeExecutableSchema({typeDefs, resolvers});