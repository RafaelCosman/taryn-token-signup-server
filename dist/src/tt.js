const contract = require('truffle-contract');

const _Token = require("./Token.json");

const _token = contract(_Token);

const web3 = require('web3');

class Instance {
    constructor(contract, provider, account) {
        this.contract = contract;
        this.provider = new web3.providers.HttpProvider("http://localhost:8545");
        this.contract.setProvider(this.provider);
        this.account = account;
        this.instance = null;
    }

    at(location) {
        this.instance = this.contract.at(location);
    }

    deployed() {
        return new Promise((resolve, reject) => {
            this.contract.deployed().then(i => {
                this.instance = i;
                resolve(this);
            }).catch(e => console.log("OHNO", e));
        });
    }
}

module.exports = class Token extends Instance {
    constructor(provider, account) {
        super(_token, provider, account);
        this.services = null;
        this.trusts = null;
    }

    getFoo() {
        console.log("1");
        return new Promise((resolve, reject) => {
            console.log("2");
            this.instance.foo().then(foo => {
                console.log("GOT FOO!", foo);
            });
        });
    }
};