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
        .deploy({data: bytecode, arguments: [0, 'PetName', 2, 'Fog']})
        .send({from: accounts[0], gas: '1000000'})
});

describe('Addoption', () => {
    it('deploys a contract', () => {
        assert.ok(adoption.options.address); //checks if value exists by asser.ok funtion
    });

    it('constructor check',async () => {
        const pets = await adoption.methods.pets(0).call();
        assert.equal(pets[0], 'PetName');
    });

    it('set pet',async () => {
        await adoption.methods.setPet(1, 'Eggly', 2, 'dog').send({ from: accounts[0], gas: '2000000'});
        const pets = await adoption.methods.pets(1).call();
        assert.equal(pets[0], 'Eggly');
    }); 
});