import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Hero({ market }) {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* TOP BADGES */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl">
              <div className="w-2 h-2 rounded-full bg-cyan-300 animate-pulse" />

              <span className="text-sm tracking-wider text-zinc-300 uppercase">
                Built on SCAI Blockchain
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-200 text-sm font-medium">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              LIVE ON SCAI MAINNET
            </div>
          </div>

          {/* HEADING */}
          <h1 className="text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight">
            The Future Of
            <span className="block bg-gradient-to-r from-cyan-200 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
              Decentralized
            </span>
            <span className="block">Trading.</span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-8 text-zinc-400 text-xl leading-relaxed max-w-xl">
            Nexus DEX is a next-generation decentralized exchange delivering
            immersive Web3 trading experiences, seamless liquidity management,
            and real on-chain swaps powered by the SCAI blockchain.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-5 mt-12">
            <button
              onClick={() => navigate("/swap")}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-300 to-violet-400 text-black font-bold hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(139,92,246,0.25)]"
            >
              Launch App
            </button>

            <button
              onClick={() => {
                window.scrollTo({
                  top: 900,
                  behavior: "smooth",
                });
              }}
              className="px-8 py-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl text-zinc-200 hover:bg-white/[0.06] transition-all duration-300"
            >
              Explore Ecosystem
            </button>
          </div>

          {/* STATS */}
          <div className="flex flex-wrap gap-12 mt-14">
            <div>
              <h3 className="text-3xl font-black text-white">$48.3K+</h3>

              <p className="text-zinc-500 mt-2">Trading Volume</p>
            </div>

            <div>
              <h3 className="text-3xl font-black text-white">12.4K+</h3>

              <p className="text-zinc-500 mt-2">Active Traders</p>
            </div>

            <div>
              <h3 className="text-3xl font-black text-white">SecureChain</h3>

              <p className="text-zinc-500 mt-2">Mainnet</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          {/* GLOW */}
          <div className="absolute -inset-10 bg-gradient-to-r from-cyan-400/10 to-violet-500/10 blur-3xl rounded-full" />

          {/* MAIN CARD */}
          <div className="relative rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-6 shadow-2xl max-w-[540px] ml-auto">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-zinc-500 text-sm uppercase tracking-wider">
                  Nexus Protocol
                </p>

                <h2 className="text-3xl font-bold mt-2">Smart Liquidity</h2>
              </div>

              <div className="w-4 h-4 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_20px_rgba(74,222,128,0.7)]" />
            </div>

            {/* CONTENT */}
            <div className="space-y-3">
              {/* LIQUIDITY BAR */}
              <div className="rounded-2xl bg-black/20 border border-white/5 p-3">
                <div className="flex justify-between mb-3">
                  <span className="text-zinc-400">Liquidity Pool</span>

                  <span className="text-cyan-200">+18.2%</span>
                </div>

                <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full w-[78%] bg-gradient-to-r from-cyan-300 to-violet-400 rounded-full" />
                </div>
              </div>

              {/* EFFICIENCY */}
              <div className="rounded-2xl bg-black/20 border border-white/5 p-3">
                <div className="flex justify-between mb-3">
                  <span className="text-zinc-400">Swap Efficiency</span>

                  <span className="text-violet-300">
                    {market.protocolHealth}%
                  </span>
                </div>

                <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-violet-400 to-cyan-300 rounded-full transition-all duration-700"
                    style={{
                      width: `${market.protocolHealth}%`,
                    }}
                  />
                </div>
              </div>

              {/* LIQUIDITY TREND */}
              <div className="rounded-2xl bg-black/20 border border-white/5 p-2">
                <div className="flex justify-between mb-2 px-2">
                  <span className="text-zinc-400">Liquidity Trend</span>

                  <span className="text-emerald-400">Live</span>
                </div>

                <div className="relative h-24">
                  <svg viewBox="0 0 300 100" className="w-full h-full">
                    <path
                      d="M0 80 Q40 60 80 70 T160 50 T240 40 T300 20"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#67e8f9" />

                        <stop offset="100%" stopColor="#a78bfa" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* BOTTOM CARDS */}
              <div className="grid grid-cols-2 gap-5 mt-6">
                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
                  <p className="text-zinc-500 text-sm">TVL</p>

                  <h3 className="text-3xl font-bold mt-3">$350</h3>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
                  <p className="text-zinc-500 text-sm">Avg Gas Fee</p>

                  <h3 className="text-3xl font-bold mt-3">0.001</h3>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
