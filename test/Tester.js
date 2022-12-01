const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Challenge ChaosLabs', function () {
  let deployer;

  before(async function () {
    /** SETUP SCENARIO - NO NEED TO CHANGE ANYTHING HERE */
    [deployer] = await ethers.getSigners();
    const liquidator = await ethers.getContractFactory('Liquidator', deployer);
    this.liquidator = await liquidator.deploy();
  });

  it('Exploit', async function () {});

  after(async function () {
    /** SUCCESS CONDITIONS */
    // All ETH has been drained from the receiver
  });
});
