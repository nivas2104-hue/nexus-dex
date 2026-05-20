async function main() {
  const NexusSwap = await ethers.getContractFactory("NexusSwap");

  const swap = await NexusSwap.deploy(
    "0xb636D73a75c5617FeCF034F028CbC5c597107586",
  );

  await swap.deployed();

  console.log("NexusSwap deployed to:", swap.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
