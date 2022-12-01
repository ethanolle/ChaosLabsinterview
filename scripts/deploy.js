const { deployContract } = require('./helpers/methods');
const ABI = require('../artifacts/contracts/Tester.sol/Tester.json').abi;
const hre = require('hardhat');

async function main() {
  const contract = await deployContract();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
