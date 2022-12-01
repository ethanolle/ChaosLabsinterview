const { ethers } = require('hardhat');
const { expect } = require('chai');
const fs = require('fs');
const tx = require('../tx.json');
// import AggregatorV3Interface

const AggregatorV3Interface = require('@chainlink/contracts/abi/v0.6/AggregatorV3Interface.json');
describe('Challenge ChaosLabs', function () {
  let deployer;

  before(async function () {
    /** SETUP SCENARIO - NO NEED TO CHANGE ANYTHING HERE */
    [deployer] = await ethers.getSigners();

    const liquidator = await ethers.getContractFactory('Liquidator', deployer);
    this.liquidator = await liquidator.deploy();

    const txInfo = await ethers.provider.getTransaction(
      '0xcf03b004a76a5d42167af53f90576aa4f5b96006d4fcd8d7ab0cf90f9774501a',
    );

    fs.writeFileSync('tx2.json', JSON.stringify(txInfo, null, 2));

    const iface = new ethers.utils.Interface(AggregatorV3Interface);
    let decoded1 = iface.decodeFunctionData('transmit', tx.data);
    let decoded2 = iface.decodeFunctionData('transmit', txInfo.data);
    decoded1[0] = decoded2[0];
    const encoded = iface.encodeFunctionData('transmit', decoded1);

    // impersonate contract address with 100 eth in and send the same transaction again 0xdfd03bfc3465107ce570a0397b247f546a42d0fa
    await hre.network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: ['0x5a8216a9c47ee2E8Df1c874252fDEe467215C25b'],
    });
    const signer = await ethers.provider.getSigner(
      '0x5a8216a9c47ee2E8Df1c874252fDEe467215C25b',
    );
    //  new contract instance 0xDfd03BfC3465107Ce570a0397b247F546a42D0fA
    const priceFeed = new ethers.Contract(
      '0xDfd03BfC3465107Ce570a0397b247F546a42D0fA',
      AggregatorV3Interface,
      signer,
    );
    let latestAnswer = await priceFeed.latestAnswer();
    console.log('latestAnswer', latestAnswer.toString());
    const tx2 = await signer.sendTransaction({
      to: tx.to,
      data: encoded,
      gasPrice: tx.gasPrice,
      gasLimit: tx.gasLimit,
    });
    await tx2.wait();
    latestAnswer = await priceFeed.latestAnswer();
    console.log('latestAnswer', latestAnswer.toString());
  });
  it('Exploit', async function () {});

  after(async function () {
    /** SUCCESS CONDITIONS */
    // All ETH has been drained from the receiver
  });
});
