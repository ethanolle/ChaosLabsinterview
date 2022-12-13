const { ethers } = require('hardhat');
const { expect } = require('chai');
const poolAbi = require('../abi/lendingPool.json');
const poolContractAddress = '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9';
const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');

const AggregatorV3Interface = require('@chainlink/contracts/abi/v0.6/AggregatorV3Interface.json');
describe('Challenge ChaosLabs', function () {
  let deployer;

  before(async function () {
    [deployer] = await ethers.getSigners();
    const poolContract = new ethers.Contract(
      poolContractAddress,
      poolAbi,
      provider,
    );

    await printATestAccount(poolContract);
  });
  it('Exploit', async function () {});

  after(async function () {
    /** SUCCESS CONDITIONS */
    // All ETH has been drained from the receiver
  });
});

async function printATestAccount(poolContract) {
  const userData = await poolContract.getUserAccountData(
    '0xBcCfF07Ab274DC2Da07055CED983eFd87323D30A',
  );
  console.log(userData);
  console.log('totalCollateralETH', userData.totalCollateralETH.toString());
  console.log('totalDebtETH', userData.totalDebtETH.toString());
  console.log('availableBorrowsETH', userData.availableBorrowsETH.toString());
  console.log(
    'currentLiquidationThreshold',
    userData.currentLiquidationThreshold.toString(),
  );
  console.log('ltv', userData.ltv.toString());
  console.log('healthFactor', userData.healthFactor.toString());
}
