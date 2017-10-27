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
  userTokenBalance: (_, data) => {
    return db.User.findOne({
      where: { ethereumAddress: data.ethereumAddress }
    })
      .then(user => {
        return user.getTokenGifts();
      })
      .then(tokenGifts => {
        return ({ count: tokenGifts.length })
      })
  },
  allTokenGifts: () => {
    return db.TokenGift.findAll({})
      .then(e => e.map(e => e.dataValues))
  },
  TokenGift: (_, data) => {
    return db.TokenGift.findOne({
      where: { id: data.id }
    })
  },
  tokenCount: (_, data) => {
    return db.TokenGift.findAll({})
      .then(result => { return { count: result.length } })
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
  payoutTokenGift: (_, data) => {
    let item, _tokenGift, _user;
    return db.TokenGift.findOne({
      where: { id: data.id }
    })
    .then((tokenGift) => {
      if (!tokenGift) {
        throw new Error('TokenGift not found')
      }
      if (!!tokenGift.transactionHash){
        throw new Error('TokenGift has already been paid for')
      } else {
        _tokenGift = tokenGift;
        return tokenGift.getUser()
      }
    })
    .then((user) => {
      if (!user) {
        throw new Error('No user found for tokenGift')
      }
      _user = user;
      return sendTokens({ address: user.dataValues.ethereumAddress, amount: 1 })
    })
    .then((transaction) => {
      if (!transaction) {
        throw new Error('No transaction created, see logs')
      }
      return _tokenGift.update({ transactionHash: transaction.id })
    })
    .then((t) => {
      return _tokenGift
    })
  },
}

const resolvers = { Query, Mutation };

export { resolvers };