// const { ethers } = require('hardhat');
// const { expect } = require('chai');
// const fs = require('fs');
// const tx = require('../tx.json');
// // import AggregatorV3Interface

// const AggregatorV3Interface = require('@chainlink/contracts/abi/v0.6/AggregatorV3Interface.json');
// describe('Challenge ChaosLabs', function () {
//   let deployer;

//   before(async function () {
//     /** SETUP SCENARIO - NO NEED TO CHANGE ANYTHING HERE */
//     [deployer] = await ethers.getSigners();

//     const liquidator = await ethers.getContractFactory('Liquidator', deployer);
//     this.liquidator = await liquidator.deploy();

//     const txInfo = await ethers.provider.getTransaction(
//       '0xcf03b004a76a5d42167af53f90576aa4f5b96006d4fcd8d7ab0cf90f9774501a',
//     );

//     fs.writeFileSync('tx2.json', JSON.stringify(txInfo, null, 2));

//     const iface = new ethers.utils.Interface(AggregatorV3Interface);
//     let decoded = iface.decodeFunctionData('transmit', tx.data);
//     const newReport = await decodeReportAndChange(decoded[0], 500480547);
//     const newData = [newReport, decoded[1], decoded[2], decoded[3]];
//     const encoded = iface.encodeFunctionData('transmit', newData);

//     // impersonate contract address with 100 eth in and send the same transaction again 0xdfd03bfc3465107ce570a0397b247f546a42d0fa
//     await hre.network.provider.request({
//       method: 'hardhat_impersonateAccount',
//       params: ['0x5a8216a9c47ee2E8Df1c874252fDEe467215C25b'],
//     });
//     const signer = await ethers.provider.getSigner(
//       '0x5a8216a9c47ee2E8Df1c874252fDEe467215C25b',
//     );
//     //  new contract instance 0xDfd03BfC3465107Ce570a0397b247F546a42D0fA
//     const priceFeed = new ethers.Contract(
//       '0xDfd03BfC3465107Ce570a0397b247F546a42D0fA',
//       AggregatorV3Interface,
//       signer,
//     );
//     let latestAnswer = await priceFeed.latestAnswer();
//     console.log('latestAnswer', latestAnswer.toString());

//     // decode
//     let beforesent = iface.decodeFunctionData('transmit', encoded);
//     console.log('beforesent', beforesent);
//     const tx2 = await signer.sendTransaction({
//       to: tx.to,
//       data: encoded,
//       gasPrice: tx.gasPrice,
//       gasLimit: tx.gasLimit,
//     });
//     await tx2.wait();
//     const test = await priceFeed.latestAnswer();
//     console.log('latestAnswer', test.toString());
//   });
//   it('Exploit', async function () {});

//   after(async function () {
//     /** SUCCESS CONDITIONS */
//     // All ETH has been drained from the receiver
//   });
// });

// function decodeReportAndChange(report, newPrice) {
//   const abiCoder = new ethers.utils.AbiCoder();
//   let res = abiCoder.decode(['bytes32', 'bytes32', 'int192[]'], report);
//   var test = res[2].slice(0);

//   let prices = [];
//   for (let i = 0; i < res[2].length; i++) {
//     // save all hexes of the numbers in an array remove the 0x before
//     prices.push(res[2][i]._hex.slice(2));
//   }
//   console.log(prices);
//   let updatedReport = abiCoder.encode(
//     ['bytes32', 'bytes32', 'int192[]'],
//     [res[0], res[1], res[2]],
//   );
//   // if one of the prices is included in the updatedReport change the exact place of the string  to the bigNewPrice
//   const bigNewPrice = ethers.BigNumber.from(newPrice);
//   const bigNewPriceHex = bigNewPrice.toHexString().slice(2);
//   console.log('updatedReport', updatedReport);
//   for (let i = 0; i < prices.length; i++) {
//     if (updatedReport.includes(prices[i])) {
//       updatedReport = updatedReport.replace(prices[i], '2d9c4df2');
//     }
//   }
//   console.log('updatedReport', updatedReport);
//   return updatedReport;
// }
// // 766612599
// // function decodeObservations(observations) {
// //   const decodedObservations = [];
// //   for (let i = 0; i < observations.length; i += 64) {
// //     const observation = observations.slice(i, i + 64);
// //     const decodedObservation = decodeObservation(observation);
// //     decodedObservations.push(decodedObservation);
// //   }
// //   return decodedObservations;
// // }

// // function decodeObservation(observation) {
// //   const decodedObservation = {};
// //   decodedObservation.timestamp = ethers.BigNumber.from(
// //     '0x' + observation.slice(0, 16),
// //   );
// //   decodedObservation.acc = ethers.BigNumber.from('0x' + observation.slice(16));
// //   return decodedObservation;
// // }

// // function encodeObservation(observation) {
// //   //   ethers.utils.hexlify
// //   const timestamp = ethers.utils.hexZeroPad(
// //     observation.timestamp.toHexString(),
// //     8,
// //   );
// //   const acc = ethers.utils.hexZeroPad(observation.acc.toHexString(), 32);
// //   const decodedObservation = decodeObservation(timestamp + acc);
// //   console.log(decodedObservation);
// //   return timestamp + acc.slice(2);
// // }
// // function encodeObservations(observations) {
// //   let encoded = '';
// //   for (let i = 0; i < observations.length; i++) {
// //     const observation = observations[i];
// //     encoded += encodeObservation(observation);
// //   }
// //   const decodeTest = decodeObservations(encoded);
// //   console.log(decodeTest);
// //   return encoded;
// // }

// // // ENCODE OBSERVATION WITHOUT tohexstrin
// // function decodeReportAndChange(report, newValue) {
// //   const rawReportContext = report.slice(0, 66);
// //   const rawObservers = report.slice(66, 130);
// //   const observations = report.slice(130);
// //   const decodedObservations = decodeObservations(observations);
// //   for (let i = 0; i < decodedObservations.length; i++) {
// //     decodedObservations[i].acc = ethers.BigNumber.from(newValue);
// //   }
// //   // set back to original and return the report
// //   const encodedObservations = encodeObservations(decodedObservations);
// //   return rawReportContext + rawObservers + encodedObservations;
// // }
