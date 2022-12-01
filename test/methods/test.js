const latestAnswer = await priceFeed.latestAnswer();
console.log('latestAnswer', latestAnswer.toString());
const tx2 = await signer.sendTransaction({
  to: tx.to,
  data: tx.data,
  gasPrice: tx.gasPrice,
  gasLimit: tx.gasLimit,
});
await tx2.wait();
console.log(tx2);
});