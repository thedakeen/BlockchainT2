const { ethers } = require("ethers");
require("dotenv").config();

const contractABI =
    require("../token-project/artifacts/contracts/DAAToken.sol/DAAToken.json").abi;

const tokenService = {
    provider: new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_URL),
    contractAddress: "0x16ac2EbC6065B1903f9dCF9b76a0E39Acab28f9f",
    contractABI: contractABI,

    initContract: function () {
        return new ethers.Contract(
            this.contractAddress,
            this.contractABI,
            this.provider
        );
    },

    async getBalance(userAddress) {
        const signer = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
        const contract = this.initContract().connect(signer);

        try {
            const balance = await contract.balanceOf(userAddress);
            console.log(`Balance of ${userAddress}: ${balance}`);
            return balance.toString();
        } catch (error) {
            console.error(`Error getting balance: ${error}`);
            return null;
        }
    },
};

module.exports = tokenService;
