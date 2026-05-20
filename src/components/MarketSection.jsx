import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { generateMarketData } from "../utils/marketEngine";

export default function MarketSection({ market }) {
  const marketData = generateMarketData(market);

  const navigate = useNavigate();

  return (
    <section className="relative py-32 px-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADING */}
        <div className="mb-16">
          <p className="text-cyan-200 uppercase tracking-[0.3em] text-sm mb-4">
            Live Markets
          </p>

          <h2 className="text-6xl font-black leading-tight">
            Trade Across
            <span className="block bg-gradient-to-r from-cyan-200 to-violet-400 bg-clip-text text-transparent">
              Infinite Liquidity
            </span>
          </h2>
        </div>

        {/* CARDS */}
        <div className="grid lg:grid-cols-3 gap-8">
          {marketData.map((marketItem, index) => (
            <motion.div
              key={marketItem.pair}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
              }}
              viewport={{
                once: true,
              }}
              className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-8 hover:border-cyan-300/20 transition-all duration-500"
            >
              {/* GLOW */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 bg-gradient-to-br from-cyan-400/5 to-violet-500/5" />

              {/* TOP */}
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-zinc-500 text-sm uppercase tracking-widest">
                    Trading Pair
                  </p>

                  <h3 className="text-3xl font-black mt-3">
                    {marketItem.pair}
                  </h3>
                </div>

                {/* ARROW BUTTON */}
                <button
                  onClick={() => {
                    if (marketItem.pair === "SCAI / NXS") {
                      navigate("/swap");
                    } else {
                      alert(
                        `${marketItem.pair} trading pair coming soon on Nexus DEX`,
                      );
                    }
                  }}
                  className="p-3 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] group-hover:rotate-12 transition-all duration-500"
                >
                  <ArrowUpRight className="text-cyan-200" />
                </button>
              </div>

              {/* PRICE */}
              <div className="relative mt-12">
                <p className="text-zinc-500 text-sm mb-3">Current Price</p>

                <div className="flex items-end justify-between">
                  <h2 className="text-5xl font-black tracking-tight">
                    {marketItem.price}
                  </h2>

                  <span className="text-emerald-400 font-semibold text-lg">
                    {marketItem.change}
                  </span>
                </div>
              </div>

              {/* CHART */}
              <div className="relative mt-10 h-28 flex items-end gap-2">
                {[40, 60, 30, 80, 65, 90, 70, 100].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-xl bg-gradient-to-t from-cyan-400/20 to-violet-400/60 group-hover:from-cyan-300/40 group-hover:to-violet-400/80 transition-all duration-500"
                    style={{
                      height: `${height}%`,
                    }}
                  />
                ))}
              </div>

              {/* BOTTOM */}
              <div className="relative mt-10 flex justify-between items-center">
                <div>
                  <p className="text-zinc-500 text-sm">24H Volume</p>

                  <h4 className="text-2xl font-bold mt-2">
                    {marketItem.volume}
                  </h4>
                </div>

                <button
                  onClick={() => {
                    if (marketItem.pair === "SCAI / NXS") {
                      navigate("/swap");
                    } else {
                      alert(
                        `${marketItem.pair} trading pair coming soon on Nexus DEX`,
                      );
                    }
                  }}
                  className="px-5 py-3 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300"
                >
                  {marketItem.pair === "SCAI / NXS"
                    ? "Trade Now"
                    : "Coming Soon"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
