const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {abi, bytecode} = require('../build/contracts/Adoption.json')
// console.log(bytecode)

let accounts;
let adoption;
beforeEach(async () => {
    //Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    //Use one of the accounts to deploy the contract
    adoption = await new web3.eth.Contract(abi)
        .deploy({data: bytecode})
        .send({from: accounts[0], gas: '1000000'})
});

describe('Addoption', () => {
    it('deploys a contract', () => {
        assert.ok(adoption.options.address); //checks if value exists by asser.ok
    })
});