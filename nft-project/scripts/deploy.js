async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const TopWeb3NFT = await ethers.getContractFactory("TopWeb3NFT");
  const deployed = await TopWeb3NFT.deploy();

  console.log("TopWeb3NFT deployed to:", deployed.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
