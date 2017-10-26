"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = undefined;

var _index = require("../models/index");

var _index2 = _interopRequireDefault(_index);

var _confirmEmail2 = require("./confirmEmail");

var _createUser2 = require("./createUser");

var _createUser3 = _interopRequireDefault(_createUser2);

var _sendTokens2 = require("./sendTokens");

var _sendTokens3 = _interopRequireDefault(_sendTokens2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Query = {
  User: function User(_, data) {
    return _index2.default.User.findOne({
      where: { id: data.id }
    });
  },
  userTokenBalance: function userTokenBalance(_, data) {
    return _index2.default.User.findOne({
      where: { ethereumAddress: data.ethereumAddress }
    }).then(function (user) {
      return user.getTokenGifts();
    }).then(function (tokenGifts) {
      return { count: tokenGifts.length };
    });
  },
  allTokenGifts: function allTokenGifts() {
    return _index2.default.TokenGift.findAll({}).then(function (e) {
      return e.map(function (e) {
        return e.dataValues;
      });
    });
  },
  TokenGift: function TokenGift(_, data) {
    return _index2.default.TokenGift.findOne({
      where: { id: data.id }
    }).then(function (g) {
      return g[0].dataValues;
    }).catch(function (error) {
      return { errors: error };
    });
  },
  tokenCount: function tokenCount(_, data) {
    return _index2.default.TokenGift.findAll({}).then(function (result) {
      return { count: result.length };
    });
  }
};

var Mutation = {
  sendTokens: function sendTokens(_, data) {
    return (0, _sendTokens3.default)(data);
  },
  confirmEmail: function confirmEmail(_, _ref) {
    var confirmationToken = _ref.confirmationToken;

    return (0, _confirmEmail2.confirmEmail)(confirmationToken);
  },
  createUser: function createUser(_, data) {
    return (0, _createUser3.default)(data);
  },
  payoutTokenGift: function payoutTokenGift(_, data) {
    var item = void 0,
        _tokenGift = void 0,
        _user = void 0;
    return _index2.default.TokenGift.findOne({
      where: { id: data.id }
    }).then(function (tokenGift) {
      _tokenGift = tokenGift;
      return tokenGift.getUser();
    }).then(function (user) {
      _user = user;
      return (0, _sendTokens3.default)({ address: user.dataValues.ethereumAddress, amount: 1 });
    }).then(function (transaction) {
      return _tokenGift.update({ transactionHash: transaction.id });
    }).then(function (t) {
      return _tokenGift.dataValues;
    });
  }
};

var resolvers = { Query: Query, Mutation: Mutation };

exports.resolvers = resolvers;