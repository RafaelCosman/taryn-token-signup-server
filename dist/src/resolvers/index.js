"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = undefined;

var payoutNextTokenGifts = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var tokenGifts, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, gift;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _index2.default.TokenGift.findAll({
              where: { transactionHash: null },
              limit: 20
            });

          case 2:
            tokenGifts = _context.sent;

            console.log("payoutNextTokenGifts with " + tokenGifts.length + " items");
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 7;
            _iterator = tokenGifts[Symbol.iterator]();

          case 9:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 16;
              break;
            }

            gift = _step.value;
            _context.next = 13;
            return (0, _payoutTokenGift3.default)(gift);

          case 13:
            _iteratorNormalCompletion = true;
            _context.next = 9;
            break;

          case 16:
            _context.next = 22;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](7);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 22:
            _context.prev = 22;
            _context.prev = 23;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 25:
            _context.prev = 25;

            if (!_didIteratorError) {
              _context.next = 28;
              break;
            }

            throw _iteratorError;

          case 28:
            return _context.finish(25);

          case 29:
            return _context.finish(22);

          case 30:
            console.log("payoutNextTokenGifts complete");
            return _context.abrupt("return", tokenGifts);

          case 32:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[7, 18, 22, 30], [23,, 25, 29]]);
  }));

  return function payoutNextTokenGifts() {
    return _ref.apply(this, arguments);
  };
}();

var _index = require("../models/index");

var _index2 = _interopRequireDefault(_index);

var _confirmEmail2 = require("./confirmEmail");

var _createUser2 = require("./createUser");

var _createUser3 = _interopRequireDefault(_createUser2);

var _sendTokens = require("./sendTokens");

var _sendTokens2 = _interopRequireDefault(_sendTokens);

var _payoutTokenGift2 = require("./payoutTokenGift");

var _payoutTokenGift3 = _interopRequireDefault(_payoutTokenGift2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
    });
  },
  tokenCount: function tokenCount(_, data) {
    return _index2.default.TokenGift.findAll({}).then(function (result) {
      return { count: result.length };
    });
  }
};

var Mutation = {
  confirmEmail: function confirmEmail(_, _ref2) {
    var confirmationToken = _ref2.confirmationToken;

    return (0, _confirmEmail2.confirmEmail)(confirmationToken);
  },
  createUser: function createUser(_, data) {
    return (0, _createUser3.default)(data);
  },
  payoutTokenGift: function payoutTokenGift(_, data) {
    return _index2.default.TokenGift.findOne({
      where: { id: data.id }
    }).then(function (tokenGift) {
      return (0, _payoutTokenGift3.default)(tokenGift);
    });
  },
  payoutNextTokenGifts: payoutNextTokenGifts
};

var resolvers = { Query: Query, Mutation: Mutation };

exports.resolvers = resolvers;