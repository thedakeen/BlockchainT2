const { ethers } = require("ethers");
require("dotenv").config();

const contractABI =
  require("../nft-project/artifacts/contracts/TopWeb3NFT.sol/TopWeb3NFT.json").abi;

const nftService = {
  provider: new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_URL),
  contractAddress: "0x64a67bc3248f8A767dCa9A9Ea7dbEee517e0a013",
  contractABI: contractABI,

  initContract: function () {
    return new ethers.Contract(
      this.contractAddress,
      this.contractABI,
      this.provider
    );
  },

  async awardNFT(userAddress, tokenURI) {
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
    const contract = this.initContract().connect(signer);

    try {
      const transaction = await contract.awardItem(userAddress, tokenURI);
      await transaction.wait();
      console.log(`NFT awarded to ${userAddress}`);
      return true;
    } catch (error) {
      console.error(`Error awarding NFT: ${error}`);
      return false;
    }
  },
};

module.exports = nftService;
