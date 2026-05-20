import { useEffect, useState } from "react";
import { MarketContext } from "./MarketCore";

export function MarketProvider({ children }) {
  const [marketData, setMarketData] = useState({
    volume: 8200,

    traders: 120,

    tvl: 350,

    ethPrice: 3482,

    btcPrice: 68120,

    scaiPrice: 2.84,

    protocolHealth: 98.4,

    rewards: 12.6,

    profit24h: 42,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData((prev) => ({
        volume: prev.volume + Math.floor(Math.random() * 50000),

        traders: prev.traders + Math.floor(Math.random() * 5),

        tvl: prev.tvl + Math.floor(Math.random() * 20000),

        ethPrice: Number(
          (prev.ethPrice + (Math.random() * 20 - 10)).toFixed(2),
        ),

        btcPrice: Number(
          (prev.btcPrice + (Math.random() * 100 - 50)).toFixed(2),
        ),

        scaiPrice: Number(
          (prev.scaiPrice + (Math.random() * 0.1 - 0.05)).toFixed(2),
        ),

        protocolHealth: Number((97 + Math.random() * 2).toFixed(1)),

        rewards: Number((prev.rewards + 0.05).toFixed(2)),

        profit24h: Number((prev.profit24h + 0.3).toFixed(2)),
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MarketContext.Provider value={marketData}>
      {children}
    </MarketContext.Provider>
  );
}
