const Web3 = require('web3');
const _Token = require("../Token.json");

const secretKey = process.env.SECRET_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;
const providerUrl = process.env.PROVIDER_URL;
const Promise = require("es6-promise").Promise

const provider = new Web3.providers.HttpProvider(providerUrl)

const web3 = new Web3(provider)

const account = web3.eth.accounts.wallet.add(secretKey)
const abi = _Token
const contract = new web3.eth.Contract(abi, contractAddress)

module.exports = function sendTokens(data) {
    const {address, amount} = data;
    return new Promise((resolve, reject) => {
        contract.methods.sendCoin(address, amount).send({from: account.address,  gas: 100000}).then(transaction => {
            console.log('Transaction Initiated', transaction)
            resolve({id: transaction.transactionHash})
        })
        .catch(e => {console.log("Error", e)})
    }) 
}