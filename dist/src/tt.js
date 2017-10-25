'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var contract = require('truffle-contract');

var _Token = require("./Token.json");

var _token = contract(_Token);

var web3 = require('web3');

var Instance = function () {
    function Instance(contract, provider, account) {
        _classCallCheck(this, Instance);

        this.contract = contract;
        this.provider = new web3.providers.HttpProvider("http://localhost:8545");
        this.contract.setProvider(this.provider);
        this.account = account;
        this.instance = null;
    }

    _createClass(Instance, [{
        key: 'at',
        value: function at(location) {
            this.instance = this.contract.at(location);
        }
    }, {
        key: 'deployed',
        value: function deployed() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                _this.contract.deployed().then(function (i) {
                    _this.instance = i;
                    resolve(_this);
                }).catch(function (e) {
                    return console.log("OHNO", e);
                });
            });
        }
    }]);

    return Instance;
}();

module.exports = function (_Instance) {
    _inherits(Token, _Instance);

    function Token(provider, account) {
        _classCallCheck(this, Token);

        var _this2 = _possibleConstructorReturn(this, (Token.__proto__ || Object.getPrototypeOf(Token)).call(this, _token, provider, account));

        _this2.services = null;
        _this2.trusts = null;
        return _this2;
    }

    _createClass(Token, [{
        key: 'getFoo',
        value: function getFoo() {
            var _this3 = this;

            console.log("1");
            return new Promise(function (resolve, reject) {
                console.log("2");
                _this3.instance.foo().then(function (foo) {
                    console.log("GOT FOO!", foo);
                });
            });
        }
    }]);

    return Token;
}(Instance);