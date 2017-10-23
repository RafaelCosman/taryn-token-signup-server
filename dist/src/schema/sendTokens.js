"use strict";

var Web3 = require('web3');
var _Token = require("../Token.json");

var secretKey = process.env.SECRET_KEY;
var contractAddress = process.env.CONTRACT_ADDRESS;
var providerUrl = process.env.PROVIDER_URL;
var Promise = require("es6-promise").Promise;

var provider = new Web3.providers.HttpProvider(providerUrl);

var web3 = new Web3(provider);

var account = web3.eth.accounts.wallet.add(secretKey);
var abi = _Token;
var contract = new web3.eth.Contract(abi, contractAddress);

module.exports = function sendTokens(data) {
    var address = data.address,
        amount = data.amount;

    return new Promise(function (resolve, reject) {
        contract.methods.sendCoin(address, amount).send({ from: account.address, gas: 100000 }).then(function (transaction) {
            console.log('Transaction Initiated', transaction);
            resolve({ id: transaction.transactionHash });
        }).catch(function (e) {
            console.log("Error", e);
        });
    });
};