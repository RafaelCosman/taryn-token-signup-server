"use strict";

var Web3 = require('web3');
var _Token = require("../Token.json");

var ethUtil = require("ethereumjs-util");
var secretKey = process.env.SECRET_KEY;
var contractAddress = process.env.CONTRACT_ADDRESS;
var providerUrl = process.env.PROVIDER_URL;
var Promise = require("es6-promise").Promise;

var provider = new Web3.providers.HttpProvider(providerUrl);

var web3 = new Web3(provider);

// Note to self:
// Remember that secret key should begin with 0x.
// If you just got it from metamask, add an 0x to it.
var account = web3.eth.accounts.wallet.add(secretKey);
var abi = _Token;
var contract = new web3.eth.Contract(abi, contractAddress);

module.exports = function sendTokens(data, index) {
    var address = data.address,
        amount = data.amount;

    var gasPrice = 10000000000;
    var gas = 1000000;

    return new Promise(function (resolve, reject) {
        return contract.methods.mint(address, 1).send({ from: account.address, gas: gas, gasPrice: gasPrice.toString() }).then(function (transaction) {
            console.log("Got transaction", transaction);
            setTimeout(function () {
                resolve({ id: transaction.transactionHash });
            }, 60000);
        }).catch(function (error) {
            return reject(error);
        });
    });
};