import db from "../models/index";
import { confirmEmail } from "./confirmEmail";
import createUser from "./createUser";
import sendTokens from "./sendTokens";

const Query = {
  User: (_, data) => {
    return db.User.findOne({
      where: { id: data.id },
    });
  },
  TokenGift: (_, data) => {
    return db.TokenGift.findOne({
      where: { id: data.id }
    })
      .then(g => {
        return (g[0].dataValues)
      })
      .catch(error => { return ({ errors: error }) });
  },
  tokenCount: async (_, data) => {
    return db.TokenGift.findAll({})
      .then(result => ({ count: result }))
  },
};

const Mutation = {
  sendTokens: (_, data) => {
    return sendTokens(data)
  },
  confirmEmail: (_, { confirmationToken }) => {
    return confirmEmail(confirmationToken)
  },
  createUser: (_, data) => {
    return createUser(data)
  },
  createTokenGift: () => {
    return db.TokenGift.create({})
      .then(result => result.dataValues)
  }
}

const resolvers = { Query, Mutation };

export { resolvers };