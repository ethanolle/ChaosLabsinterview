const { ethers } = require('hardhat');
const { expect } = require('chai');
const poolAbi = require('../abi/lendingPool.json');
const poolContractAddress = '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9';

const AggregatorV3Interface = require('@chainlink/contracts/abi/v0.6/AggregatorV3Interface.json');
describe('Challenge ChaosLabs', function () {
  let deployer;

  before(async function () {
    // just test to talk with the contract
    [deployer] = await ethers.getSigners();
    const poolContract = new ethers.Contract(
      poolContractAddress,
      poolAbi,
      ethers.provider,
    );
    // get user data 0xBcCfF07Ab274DC2Da07055CED983eFd87323D30A
    const userData = await poolContract.getUserAccountData(
      '0xBcCfF07Ab274DC2Da07055CED983eFd87323D30A',
    );
    console.log('userData', userData);
  });
  it('Exploit', async function () {});

  after(async function () {
    /** SUCCESS CONDITIONS */
    // All ETH has been drained from the receiver
  });
});
