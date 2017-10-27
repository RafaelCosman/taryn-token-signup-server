const Web3 = require('web3');
const _Token = require("../Token.json");

const ethUtil = require("ethereumjs-util");
const secretKey = process.env.SECRET_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;
const providerUrl = process.env.PROVIDER_URL;
const Promise = require("es6-promise").Promise

const provider = new Web3.providers.HttpProvider(providerUrl)

const web3 = new Web3(provider)

// Note to self:
// Remember that secret key should begin with 0x.
// If you just got it from metamask, add an 0x to it.
const account = web3.eth.accounts.wallet.add(secretKey)
const abi = _Token
const contract = new web3.eth.Contract(abi, contractAddress)

const foo = ethUtil.privateToAddress(secretKey);
console.log(account.address)

module.exports = function sendTokens(data) {
    const {address, amount} = data;
    return new Promise((resolve, reject) => {
        contract.methods.mint(address, 1).send({from: account.address,  gas: 1000000, gasPrice: "13000000000"}).then(transaction => {
            resolve({id: transaction.transactionHash})
        })
    }) 
}
