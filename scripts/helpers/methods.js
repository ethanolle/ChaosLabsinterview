const hre = require('hardhat');

async function deployContract() {
  const Tester = await hre.ethers.getContractFactory('Tester');
  const tester = await Tester.deploy();
  await tester.deployed();
  return tester;
}

module.exports = {
  deployContract,
};
