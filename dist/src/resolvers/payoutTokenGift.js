function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import db from "../models/index";
import sendTokens from "./sendTokens";
import sendTokenEmail from "./sendTokenEmail";

module.exports = (() => {
    var _ref = _asyncToGenerator(function* (tokenGift, index = 0) {
        if (!tokenGift) {
            throw new Error('TokenGift not found');
        }
        if (!!tokenGift.transactionHash) {
            throw new Error('TokenGift has already been paid for');
        }

        const user = yield tokenGift.getUser();
        if (!user) {
            throw new Error('No user found for tokenGift');
        }
        const transaction = yield sendTokens({ address: user.dataValues.ethereumAddress, amount: 1 }, index);
        let _updatedTokenGift = yield tokenGift.update({ transactionHash: transaction.id });
        console.log("Successfully created transaction with tokengift: ", _updatedTokenGift);
        yield sendTokenEmail(user);
        return _updatedTokenGift;
    });

    function payoutTokenGift(_x) {
        return _ref.apply(this, arguments);
    }

    return payoutTokenGift;
})();