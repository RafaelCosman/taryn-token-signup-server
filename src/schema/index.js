const { makeExecutableSchema } = require('graphql-tools');
import { resolvers } from "../resolvers";

// Define types
const typeDefs = `
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
  type TokenCountPayload {
    count: Int!
  }

  type Query {
    User(id: ID): User
    TokenGift(id: ID): TokenGift
    allTokenGifts: [TokenGift]
    tokenCount: TokenCountPayload
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
  type Transaction {
    id: ID!
  }

  type Mutation {
    sendTokens(address: String!, amount: Int!): Transaction 
    confirmEmail(confirmationToken: String!): User
    createUser(email: String!, ethereumAddress: String!, referrerId: ID): CreateUserPayload
    createTokenGift: TokenGift
    payoutTokenGift(id: String!): TokenGift
  }
`;

// Generate the schema object from your types definition.
module.exports = makeExecutableSchema({ typeDefs, resolvers });