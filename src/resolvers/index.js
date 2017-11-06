import db from "../models/index";
import { confirmEmail } from "./confirmEmail";
import createUser from "./createUser";
import sendTokens from "./sendTokens";
import payoutTokenGift from "./payoutTokenGift"

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

async function payoutNextTokenGifts() {
  const tokenGifts = await db.TokenGift.findAll({
    where: { transactionHash: null },
    limit: 100,
  })
  for (const gift of tokenGifts){
    await payoutTokenGift(gift)
  }
  return tokenGifts 
}

const Mutation = {
  confirmEmail: (_, { confirmationToken }) => {
    return confirmEmail(confirmationToken)
  },
  createUser: (_, data) => {
    return createUser(data)
  },
  payoutTokenGift: (_, data) => {
    return db.TokenGift.findOne({
      where: { id: data.id }
    })
    .then((tokenGift) => {
      return payoutTokenGift(tokenGift)
    })
  },
  payoutNextTokenGifts
}

const resolvers = { Query, Mutation };

export { resolvers };