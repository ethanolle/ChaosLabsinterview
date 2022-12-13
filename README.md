# Chaos Labs Interview Yayyy
this project will be made a bit like with damnvulnerabledefi I think it's a good architecture to start with and present and test

## What is this project about
 implement a simple liquidator agent script to run against an EVM fork. We recommend using Hardhat or Foundry(Anvil/forge). The agent should receive a list of accounts on Aave and monitor them for liquidation eligibility. Once any account is eligible the agent should liquidate (buy the collateral) and sell it back on any desired DEX for profit.

## Summary of the project.
I got too ambitious at the start and didn't finish the project within the allotted time. 
To try impressing I wanted to implement a process for changing the chainlink price by sending a fake transaction that modifies the value of all assets in the chainlink oracle(transmit Method). This will allow me to control the price of chainlink in a desired way.
After a few hours I have come to the conclusion that it is not possible.

My decision was based on my previous experience playing with transmit tx's in the memPool to get faster responses than my competitors.
After spending about 5 hours trying to do it, I decided to move on.
I wanted to simplify the process, so I searched for relevant projects on Github and came across your project. When I downloaded it, I noticed that it wasn't running properly, so I submitted a pull request directly to the relevant commit. The changes I made fixed the issue.
Due to the time constraints, I decided to use an existing liquidation contract rather than creating one from scratch.
As I delved deeper into understanding the relationship between price changes and liquidation, time seemed to slip away.
And I didn't mannaged to finish all the project.

Through my research and analysis, I have gained a deeper understanding of the connection between Chainlink and Aave contracts and how they interact with each other.


You can see all my researchs about the transmit function in the folder/fail

## Interesting points.
You can know the future price directly in the memPool before the tx is submitted.
So you as a riskManagement/riskTesting platform could take the information from the memPool and take actions in frontRunning the chainlink tx's in order to make safer aave defi system for example(since you take action before it is actually validated).

## How to run the project?
To run the project, you will need to perform some manual steps.
I apologize for the inconvenience, but I didn't have the time to finish the project.
First, use the provided tool to update the prices https://github.com/ethanolle/chainlink-oracle-cli
To find the user I did it by quering the gql of aave.
query the gql of aave to find the user's address that's borrowing on your pair.
Then, you can run npx hardhat test/Tester.js using the user's address as a parameter in the file directly.
Note that it will not work full flow since I didn't have the time to finish it(the passing params to the liquidat function).

