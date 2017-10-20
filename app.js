const express = require('express');

const TruffleContract = require('truffle-contract')

const _Token = require("./src/Token.json");

// This package automatically parses JSON requests.
const bodyParser = require('body-parser');

// This package will handle GraphQL server requests and responses
// for you, based on your schema.
// const {graphqlExpress} = require('apollo-server-express');
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');

const schema = require('./src/schema');
const Token = require("./src/tt.js");

const Web3 = require('web3');

// const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
// const provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io:dYWKKqsJkbv9cZlQFEpI')
const provider = new Web3.providers.HttpProvider("http://localhost:8545")
const web3 = new Web3(provider)


// const address = "0xE3Dd478029184dCA93A596834a06c775361dF13c";
// console.log(web3.eth.getBalance(address))
 

var app = express();
// app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));


const TokenContract = TruffleContract(_Token)
TokenContract.setProvider(provider)
// const foo = TokenContract.at("0x30947cd58dcb06bd5b573fe4442d02af4116f822");

// const privateKey = '0x62543b4c00ede77bd7913dafbd7a1bf1b3f5ba7f155129170cebe9f52a0911d1';
// debugger;
// web3.eth.accounts.privateKeyToAccount();

const PORT = 3000
app.listen(PORT, () => {
  web3.eth.getAccounts((error, accounts) => {
    const abi = _Token["abi"]
    const foo = web3.eth.contract("0xE3Dd478029184dCA93A596834a06c775361dF13c", abi)
    debugger;
    // const m = new Token(web3.currentProvider, accounts[0])
    // m.at("0xE3Dd478029184dCA93A596834a06c775361dF13c")
    // m.at("0x89a0e882a865aade116f2cd022103948e0163742")
    // m.instance.sendCoin(accounts[1], 100, {from: accounts[0]})
    // m.instance.getBalance.call(accounts[0]).then(e => {console.log(e)});
    // m.instance.getBalance.call(accounts[1]).then(e => {console.log(e)});
    m.instance.foo()
      .then( i => {
        console.log(i)
      })
      .catch( e => console.log("OHNO", e))
    // m.deployed()
    //   .then( i => {
    //     console.log("YAY", i)
    //   })
      // .catch( e => console.log("OHNO", e))
    3
  })
});