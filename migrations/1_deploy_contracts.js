// var Adoption = artifacts.require("Adoption");

// module.exports = function(deployer) {
//     deployer.deploy(Adoption, 0, "Doggy", 1, "Dog", "adoptable");
// }

//to deploy in real network
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {abi, evm} = require('../build/contracts/Adoption.json');

const provider = new HDWalletProvider(
    'dash gather process grief creek ready base indicate ridge drink resist subject',
    'https://goerli.infura.io/v3/fe8df09da42d48d3ac15e19a133edab8'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0])

    const result = await new web3.eth.Contract(abi)
        .deploy({data: evm, arguments: [0, 'Eggly', 2, 'dog', 'adoptable']})
        .send({gas: '1000000', from: accounts[0]})

    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
};
deploy();