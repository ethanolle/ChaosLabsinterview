const { ethers } = require('hardhat');
const { expect } = require('chai');
const poolAbi = require('../abi/lendingPool.json');
const poolContractAddress = '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9';
const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');

describe('Challenge ChaosLabs', function () {
  let deployer;

  before(async function () {
    [deployer] = await ethers.getSigners();
    const poolContract = new ethers.Contract(
      poolContractAddress,
      poolAbi,
      provider,
    );
    const liquidator = await ethers.getContractFactory('Liquidator', deployer);
    this.liquidator = await liquidator.deploy();
  });
  it('During', async function () {
    const account = await getTestAccount(poolContract);
    const isHealthy = account.healthFactor.gt(ethers.utils.parseEther('1'));
    if (!isHealthy) {
      const tx = await this.liquidator
        .liquidate
        // address debtAddress,
        // address colAddress,
        // address victim
        ();
      await tx.wait();
    }
  });

  after(async function () {
    /** SUCCESS CONDITIONS */
    // All ETH has been drained from the receiver
  });
});

async function getTestAccount(poolContract) {
  const userData = await poolContract.getUserAccountData(
    '0xBcCfF07Ab274DC2Da07055CED983eFd87323D30A',
  );
  return userData;
}
