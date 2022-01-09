// npx hardhat (to be run after installing dependancies - creates a project structure)

// to compile
// cd ..\smart_contract
// npx hardhat run scripts/deploy.js --network ropsten
// copy contract address into client, src, utils, constants.js
// copy artifacts, contracts, Transactions abi into client, src, utils, Transactions.json
// cd ..\client
// npm dev run

// https://hardhat.org/getting-started/

const main = async () => {
  // We get our contract to deploy
  const Transactions = await hre.ethers.getContractFactory("Transactions");
  // create an instance
  const transactions = await Transactions.deploy();

  await transactions.deployed();

  console.log("Transactions deployed to:", transactions.address);
  // our address of our smart contract will be deployed on the ropsten network
}

// most recent pattern
const runMain = async () => {
  try {
    await main();
    process.exit(0); // this means it's process was successfull
  } catch (error) {
    console.error(error);
    process.exit(1); //exit 1 means there was an error
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

