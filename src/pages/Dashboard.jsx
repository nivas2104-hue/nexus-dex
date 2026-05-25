import Navbar from "../components/Navbar";
import PortfolioChart from "../components/PortfolioChart";

import { ArrowUpRight, Activity } from "lucide-react";

import { motion } from "framer-motion";

import { useEffect, useState } from "react";

import { ethers } from "ethers";

import { TOKEN_ADDRESS, TOKEN_ABI } from "../utils/contract";

import { SWAP_ADDRESS, SWAP_ABI } from "../utils/swapContract";

import { useMarket } from "../context/useMarket";

export default function Dashboard() {
  const market = useMarket();

  const [nxsBalance, setNxsBalance] = useState("0");

  const [ethBalance, setEthBalance] = useState("0");

  const [portfolioValue, setPortfolioValue] = useState("0");

  const [transactions, setTransactions] = useState([]);

  // REAL POOL DATA
  const [poolETH, setPoolETH] = useState("0");

  const [poolNXS, setPoolNXS] = useState("0");

  const [realTVL, setRealTVL] = useState("0");

  const [realNXSPrice, setRealNXSPrice] = useState("0");

  const ethPrice = 3500;

  const nxsPrice = Number(realNXSPrice || 0);

  // LOAD REAL POOL DATA
  useEffect(() => {
    async function loadPool() {
      if (!window.ethereum) return;

      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const swap = new ethers.Contract(SWAP_ADDRESS, SWAP_ABI, provider);

        const ethLiquidity = await swap.totalLiquidityETH();

        const nxsLiquidity = await swap.totalLiquidityNXS();

        const eth = Number(ethers.utils.formatEther(ethLiquidity));

        const nxs = Number(ethers.utils.formatUnits(nxsLiquidity, 18));

        setPoolETH(eth.toFixed(2));

        setPoolNXS(nxs > 0 ? nxs.toLocaleString() : "0");
        const tvl = eth * ethPrice;

        setRealTVL(tvl.toLocaleString());

        const tokenPrice = nxs > 0 ? (eth * ethPrice) / nxs : 0;

        setRealNXSPrice(tokenPrice.toFixed(2));
      } catch (err) {
        console.error(err);
      }
    }

    loadPool();
  }, []);

  // LOAD BALANCES
  useEffect(() => {
    async function loadBalance() {
      if (!window.ethereum) return;

      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const signer = provider.getSigner();

        const address = await signer.getAddress();

        // ETH
        const eth = await provider.getBalance(address);

        const formattedETH = ethers.utils.formatEther(eth);

        const rawETH = Number(formattedETH);

        const realisticETH = rawETH;
        setEthBalance(realisticETH.toFixed(2));

        // TOKEN
        const token = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, provider);

        const balance = await token.balanceOf(address);

        const formattedNXS = ethers.utils.formatUnits(balance, 18);

        const rawNXS = Number(formattedNXS);

        setNxsBalance(rawNXS.toLocaleString());

        const safePrice = Number(nxsPrice) || 0;

        const totalValue = realisticETH * ethPrice + rawNXS * safePrice;
        setPortfolioValue(
          totalValue.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          }),
        );

        // TX HISTORY
        const savedTxs = JSON.parse(localStorage.getItem("nexusTxs") || "[]");

        setTransactions(savedTxs);
      } catch (err) {
        console.error(err);
      }
    }

    loadBalance();
  }, [realNXSPrice]);

  // WALLET EVENTS
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = () => {
      window.location.reload();
    };

    const handleChainChanged = () => {
      window.location.reload();
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);

    window.ethereum.on("chainChanged", handleChainChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);

      window.ethereum.removeListener("chainChanged", handleChainChanged);
    };
  }, []);

  // SEND TOKENS
  async function sendTokens() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();

      const token = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);

      const tx = await token.transfer(
        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",

        ethers.utils.parseUnits("100", 18),
      );

      await tx.wait();
      window.location.reload();

      const existing = JSON.parse(localStorage.getItem("nexusTxs") || "[]");

      existing.unshift({
        type: "Send",

        amount: "100 NXS",

        hash: tx.hash,

        time: new Date().toLocaleTimeString(),
      });

      localStorage.setItem("nexusTxs", JSON.stringify(existing));

      alert("100 NXS Sent Successfully!");

      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  const assets = [
    {
      name: "Ethereum",

      symbol: "ETH",

      balance: ethBalance,

      value: `$${(Number(ethBalance) * ethPrice).toLocaleString()}`,

      change: "+8.2%",
    },

    {
      name: "Nexus Token",

      symbol: "NXS",

      balance: nxsBalance,

      value: `$${(
        Number(nxsBalance.replace(/,/g, "")) * nxsPrice
      ).toLocaleString()}`,

      change: "+18.4%",
    },

    {
      name: "SCAI",
      symbol: "SCAI",
      balance: ethBalance,
      value: `$${(Number(ethBalance) * ethPrice).toLocaleString()}`,
      change: "+4.1%",
    },
  ];

  return (
    <div className="min-h-screen pt-36 text-white overflow-hidden">
      <Navbar />

      <div className="relative px-6 pb-24">
        <div className="absolute w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-3xl top-20 right-[-200px]" />

        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-16"
          >
            <div>
              <p className="text-cyan-200 uppercase tracking-[0.3em] text-sm mb-5">
                Nexus Portfolio Analytics
              </p>

              <h1 className="text-7xl font-black leading-tight">
                Trading
                <span className="block bg-gradient-to-r from-cyan-200 to-violet-400 bg-clip-text text-transparent">
                  Dashboard
                </span>
              </h1>
            </div>

            <button className="mt-8 lg:mt-0 flex items-center gap-3 px-7 py-4 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.06] transition-all duration-300">
              <Activity className="text-cyan-200" />

              <span className="font-semibold">Live Analytics</span>
            </button>
          </motion.div>

          <div className="mb-12">
            <PortfolioChart />
          </div>

          {/* STATS */}
          <div className="grid lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                label: "Portfolio Value",

                value: `$${portfolioValue}`,
              },

              {
                label: "24H Profit",

                value: `+$${market.profit24h.toLocaleString()}`,
              },

              {
                label: "Liquidity Rewards",

                value: `$${market.rewards.toLocaleString()}`,
              },

              {
                label: "Total Transactions",

                value: transactions.length,
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                }}
                className="rounded-[30px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-6"
              >
                <p className="text-zinc-500 text-sm uppercase tracking-wider">
                  {stat.label}
                </p>

                <h2 className="text-4xl font-black mt-6">{stat.value}</h2>
              </motion.div>
            ))}
          </div>
          {/* MAIN LAYOUT */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Assets */}
            <div className="lg:col-span-2 rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs mb-3">
                    Asset Portfolio
                  </p>

                  <h2 className="text-4xl font-black">Wallet Holdings</h2>
                </div>

                <button className="p-4 rounded-2xl border border-white/10 bg-white/[0.03] hover:rotate-12 transition-all duration-500">
                  <ArrowUpRight className="text-cyan-200" />
                </button>
              </div>

              <div className="space-y-5">
                {assets.map((asset, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                    }}
                    className="group rounded-3xl border border-white/5 bg-black/20 p-6 hover:border-cyan-300/20 transition-all duration-500"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-300/20 to-violet-400/20 flex items-center justify-center text-xl font-bold">
                          {asset.symbol[0]}
                        </div>

                        <div>
                          <h3 className="text-2xl font-bold">{asset.name}</h3>

                          <p className="text-zinc-500 mt-1">
                            {asset.balance} {asset.symbol}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <h3 className="text-2xl font-bold">{asset.value}</h3>

                        <p className="text-emerald-400 mt-2">{asset.change}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="space-y-6">
              {/* Protocol Health */}
              <div className="rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8">
                <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs mb-4">
                  Protocol Health
                </p>

                <h2 className="text-5xl font-black">
                  {market.protocolHealth}%
                </h2>

                <p className="text-zinc-400 mt-4 leading-relaxed">
                  Nexus liquidity systems operating at peak efficiency across
                  decentralized pools.
                </p>

                <div className="mt-10">
                  <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full w-[98%] bg-gradient-to-r from-cyan-300 to-violet-400 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Pool Analytics */}
              <div className="rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8">
                <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs mb-4">
                  Pool Analytics
                </p>

                <div className="space-y-6">
                  <div>
                    <p className="text-zinc-500 text-sm">ETH Liquidity</p>

                    <h2 className="text-3xl font-black mt-2">{poolETH} ETH</h2>
                  </div>

                  <div>
                    <p className="text-zinc-500 text-sm">NXS Liquidity</p>

                    <h2 className="text-3xl font-black mt-2">{poolNXS} NXS</h2>
                  </div>

                  <div>
                    <p className="text-zinc-500 text-sm">Real TVL</p>

                    <h2 className="text-3xl font-black mt-2">${realTVL}</h2>
                  </div>

                  <div>
                    <p className="text-zinc-500 text-sm">On-Chain NXS Price</p>

                    <h2 className="text-3xl font-black mt-2 text-cyan-200">
                      ${realNXSPrice}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8">
                <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs mb-6">
                  Recent Activity
                </p>

                <div className="w-full py-5 rounded-3xl bg-cyan-400/20 border border-cyan-300/20 text-center">
                  <p className="text-cyan-200 text-lg font-black">
                    Multi-User Liquidity Sync Active
                  </p>
                </div>
                <div className="space-y-5">
                  {transactions.map((tx, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-white/5 bg-black/20 p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-cyan-200 font-semibold">{tx.type}</p>

                        <p className="text-zinc-500 text-xs">{tx.time}</p>
                      </div>

                      <p className="text-white text-lg font-bold">
                        {tx.amount}
                      </p>

                      <p className="text-zinc-500 text-xs break-all mt-3">
                        {tx.hash}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
