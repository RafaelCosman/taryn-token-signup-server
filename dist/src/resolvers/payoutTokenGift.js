"use strict";

var _index = require("../models/index");

var _index2 = _interopRequireDefault(_index);

var _sendTokens = require("./sendTokens");

var _sendTokens2 = _interopRequireDefault(_sendTokens);

var _sendTokenEmail = require("./sendTokenEmail");

var _sendTokenEmail2 = _interopRequireDefault(_sendTokenEmail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(tokenGift) {
        var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        var user, transaction, _updatedTokenGift;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (tokenGift) {
                            _context.next = 2;
                            break;
                        }

                        throw new Error('TokenGift not found');

                    case 2:
                        if (!tokenGift.transactionHash) {
                            _context.next = 4;
                            break;
                        }

                        throw new Error('TokenGift has already been paid for');

                    case 4:
                        _context.next = 6;
                        return tokenGift.getUser();

                    case 6:
                        user = _context.sent;

                        if (user) {
                            _context.next = 9;
                            break;
                        }

                        throw new Error('No user found for tokenGift');

                    case 9:
                        _context.next = 11;
                        return (0, _sendTokens2.default)({ address: user.dataValues.ethereumAddress, amount: 1 }, index);

                    case 11:
                        transaction = _context.sent;
                        _context.next = 14;
                        return tokenGift.update({ transactionHash: transaction.id });

                    case 14:
                        _updatedTokenGift = _context.sent;

                        console.log("Successfully created transaction with tokengift: ", _updatedTokenGift);
                        _context.next = 18;
                        return (0, _sendTokenEmail2.default)(user, transaction.id);

                    case 18:
                        return _context.abrupt("return", _updatedTokenGift);

                    case 19:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    function payoutTokenGift(_x) {
        return _ref.apply(this, arguments);
    }

    return payoutTokenGift;
}();