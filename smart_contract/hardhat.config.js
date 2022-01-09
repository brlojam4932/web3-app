require('@nomiclabs/hardhat-waffle');

// https://dashboard.alchemyapi.io/

// url is from my alchemy http address
// accounts is the exported key from my metamask private key account
module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/W2DuJ7kF_ny9952N_bJzu2pNmrP2158G",
      accounts: ["9bc11574f9790aa0d476b99828fd1cbc4d8ce8f10580d5ed2ea3e8b1c906875b"]
    }
  }
}