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
  allTokenGifts: () => {
    return db.TokenGift.findAll({})
    .then(e => e.map(e => e.dataValues))
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
  payoutTokenGift:(_, data) => {
    let item;
    return db.TokenGift.findOne({
      where: { id: data.id }
    })
    .then((tokenGift) => {
      item = tokenGift;
      return sendTokens({address: "0xdf7850D6CC6AFF77E8AFC42Accdc34B82099CaCC", amount: 1})
    })
    .then((transaction) => {
      item.update({transactionHash: transaction.id})
      .then(t => {return item.dataValues})
    })
  },
  createTokenGift: () => {
    return db.TokenGift.create({})
      .then(result => result.dataValues)
  }
}

const resolvers = { Query, Mutation };

export { resolvers };