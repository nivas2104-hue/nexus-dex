/* eslint-env mocha */
/* global describe, it, beforeEach */

const { expect } = require("chai");

const { ethers } = require("hardhat");

describe("Nexus DEX", function () {
  let token;
  let swap;

  let owner;
  let user;

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();

    // DEPLOY TOKEN
    const NXSToken = await ethers.getContractFactory("NXSToken");

    token = await NXSToken.deploy();

    await token.deployed();

    // DEPLOY SWAP
    const NexusSwap = await ethers.getContractFactory("NexusSwap");

    swap = await NexusSwap.deploy(token.address);

    await swap.deployed();
  });

  // TOKEN DEPLOYMENT
  it("Should deploy token correctly", async function () {
    const name = await token.name();

    expect(name).to.equal("Nexus Token");
  });

  // TOKEN TRANSFER
  it("Should transfer tokens", async function () {
    await token.transfer(
      user.address,

      ethers.utils.parseUnits("1000", 18),
    );

    const balance = await token.balanceOf(user.address);

    expect(balance.toString()).to.equal(
      ethers.utils.parseUnits("1000", 18).toString(),
    );
  });

  // ADD LIQUIDITY
  it("Should add liquidity", async function () {
    // APPROVE TOKENS
    await token.approve(
      swap.address,

      ethers.utils.parseUnits("5000", 18),
    );

    // ADD LIQUIDITY
    await swap.addLiquidity(
      ethers.utils.parseUnits("5000", 18),

      {
        value: ethers.utils.parseEther("1"),
      },
    );

    const ethLiquidity = await swap.totalLiquidityETH();

    expect(ethers.utils.formatEther(ethLiquidity)).to.equal("1.0");
  });

  // BUY TOKENS
  it("Should swap ETH for tokens", async function () {
    // APPROVE TOKENS
    await token.approve(
      swap.address,

      ethers.utils.parseUnits("5000", 18),
    );

    // FUND LIQUIDITY
    await swap.addLiquidity(
      ethers.utils.parseUnits("5000", 18),

      {
        value: ethers.utils.parseEther("1"),
      },
    );

    // USER BUYS TOKENS
    await swap.connect(user).buyTokens({
      value: ethers.utils.parseEther("0.1"),
    });

    const userBalance = await token.balanceOf(user.address);

    expect(userBalance.gt(0)).to.equal(true);
  });
});
