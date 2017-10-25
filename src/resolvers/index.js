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
    let item, _tokenGift, _user;
    return db.TokenGift.findOne({
      where: { id: data.id }
    })
    .then((tokenGift) => {
      _tokenGift = tokenGift;
      return tokenGift.getUser()
    })
    .then((user) => {
      _user = user;
      return sendTokens({address: user.dataValues.ethereumAddress, amount: 1})
    })
    .then((transaction) => {
      return _tokenGift.update({transactionHash: transaction.id})
    })
    .then((t) => {
      return _tokenGift.dataValues
    })
  },
  createTokenGift: () => {
    return db.TokenGift.create({userId: "dec0ef1c-2fb0-4d96-a98f-60d5e3fe7eaa"})
      .then(result => result.dataValues)
  }
}

const resolvers = { Query, Mutation };

export { resolvers };