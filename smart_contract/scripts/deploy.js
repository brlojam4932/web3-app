// npx hardhat (to be run after installing dependancies - creates a project structure)

// npx hardhat run scripts/deploy.js --network ropsten


const main = async () => {
  // We get the contract to deploy
  const Transactions = await hre.ethers.getContractFactory("Transactions");
  // create an instance
  const transactions = await Transactions.deploy();

  await transactions.deployed();

  console.log("Transactions deployed to:", transactions.address);
}

// most recent pattern
const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain();

/*

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
 
*/

