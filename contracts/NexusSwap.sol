// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NexusSwap {

    IERC20 public token;

    uint public rate = 1000;

    uint public totalLiquidityETH;

    uint public totalLiquidityNXS;

    mapping(address => uint)
        public liquidityProviders;

    constructor(address tokenAddress) {
        token = IERC20(tokenAddress);
    }

    // BUY TOKENS
    function buyTokens()
        public
        payable
    {
        uint tokenAmount =
            msg.value * rate;

        require(
            token.transfer(
                msg.sender,
                tokenAmount
            ),
            "Transfer failed"
        );
    }

    // ADD LIQUIDITY
    function addLiquidity(
        uint tokenAmount
    ) public payable {

        require(
            msg.value > 0,
            "ETH required"
        );

        require(
            tokenAmount > 0,
            "Token amount required"
        );

        bool success =
            token.transferFrom(
                msg.sender,
                address(this),
                tokenAmount
            );

        require(
            success,
            "transferFrom failed"
        );

        totalLiquidityETH +=
            msg.value;

        totalLiquidityNXS +=
            tokenAmount;

        liquidityProviders[
            msg.sender
        ] += msg.value;
    }
}