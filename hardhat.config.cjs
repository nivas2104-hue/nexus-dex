require("@nomiclabs/hardhat-ethers");

require("dotenv").config();

module.exports = {
  solidity: "0.8.28",

  networks: {
    scai: {
      url: "https://mainnet-rpc.scai.network",

      chainId: 34,

      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
