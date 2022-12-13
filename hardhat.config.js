require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
// versions of solidity compiler 0.8.17, 0.7.6
module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.6.12',
      },
      {
        version: '0.8.13',
      },
      {
        version: '0.7.6',
      },
      {
        version: '^0.8.0',
      },
      {
        version: '^0.5.0',
      },
    ],
  },
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
        // blockNumber: 16090476,
      },
    },
  },
};
