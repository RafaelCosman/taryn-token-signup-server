import db from "../models/index";
import sendTokens from "./sendTokens";
import sendTokenEmail from "./sendTokenEmail";

module.exports = async function payoutTokenGift(tokenGift, index=0) {
    if (!tokenGift) { throw new Error('TokenGift not found') }
    if (!!tokenGift.transactionHash){ throw new Error('TokenGift has already been paid for') } 

    const user = await tokenGift.getUser()
    if (!user) { throw new Error('No user found for tokenGift') }
    const transaction = await sendTokens({ address: user.dataValues.ethereumAddress, amount: 1 }, index)
    let _updatedTokenGift = await tokenGift.update({ transactionHash: transaction.id })
    console.log("Successfully created transaction with tokengift: ", _updatedTokenGift)
    await sendTokenEmail(user, transaction.id);
    return _updatedTokenGift 
}
