export function generateMarketData(market) {
  return [
    {
      pair: "ETH / NXS",

      price: "$3,423.21",

      change: "+12.4%",

      volume: "$8.2K",
    },

    {
      pair: "BTC / NXS",

      price: "$68,077.91",

      change: "+8.1%",

      volume: "$12.4K",
    },

    {
      pair: "SCAI / NXS",

      price: `$${market.scaiPrice}`,
      change: "+18.9%",

      volume: "$4.1K",
    },
  ];
}
