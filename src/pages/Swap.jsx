import Navbar from "../components/Navbar";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { ethers } from "ethers";
import { SWAP_ADDRESS, SWAP_ABI } from "../utils/swapContract";
import TransactionModal from "../components/TransactionModal";

export default function Swap() {
  const [ethAmount, setEthAmount] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const [txStatus, setTxStatus] = useState("waiting");

  const [txHash, setTxHash] = useState("");

  async function handleSwap() {
    try {
      if (!window.ethereum) {
        alert("MetaMask not detected");
        return;
      }

      if (!ethAmount || Number(ethAmount) <= 0) {
        alert("Enter valid SCAI amount");
        return;
      }

      setModalOpen(true);

      setTxStatus("waiting");

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();

      const swapContract = new ethers.Contract(SWAP_ADDRESS, SWAP_ABI, signer);

      const tx = await swapContract.buyTokens({
        value: ethers.utils.parseEther(ethAmount),
      });

      setTxHash(tx.hash);

      setTxStatus("pending");

      await tx.wait();

      const existing = JSON.parse(localStorage.getItem("nexusTxs") || "[]");

      existing.unshift({
        type: "Swap",
        amount: `${ethAmount} SCAI → ${Number(ethAmount) * 1000} NXS`,
        hash: tx.hash,
        time: new Date().toLocaleTimeString(),
      });

      localStorage.setItem("nexusTxs", JSON.stringify(existing));

      setTxStatus("success");

      setTimeout(() => {
        window.location.reload();
      }, 2500);
    } catch (err) {
      console.error(err);

      setTxStatus("error");
    }
  }

  return (
    <div className="min-h-screen text-white overflow-hidden">
      <Navbar />

      <div className="relative pt-40 px-6 pb-20 flex items-center justify-center">
        {/* Ambient Glow */}
        <div className="absolute w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-3xl top-20 left-1/2 -translate-x-1/2" />

        {/* Swap Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-xl rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs mb-3">
                Nexus Protocol
              </p>

              <h1 className="text-4xl font-black">Token Swap</h1>
            </div>

            <div className="w-4 h-4 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_20px_rgba(74,222,128,0.6)]" />
          </div>

          {/* FROM */}
          <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
            <div className="flex justify-between mb-4">
              <span className="text-zinc-500 text-sm">You Pay</span>

              <span className="text-zinc-500 text-sm">SCAI</span>
            </div>

            <div className="flex items-center justify-between">
              <input
                type="text"
                value={ethAmount}
                onChange={(e) => setEthAmount(e.target.value)}
                placeholder="0.0"
                className="bg-transparent outline-none text-5xl font-black w-40 placeholder:text-zinc-700"
              />

              <button className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] transition-all duration-300">
                <div className="w-3 h-3 rounded-full bg-cyan-300" />

                <span className="font-semibold">SCAI</span>
              </button>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center my-6">
            <button className="p-4 rounded-2xl border border-white/10 bg-white/[0.04] hover:rotate-180 transition-all duration-500">
              <ArrowDown className="text-cyan-200" />
            </button>
          </div>

          {/* TO */}
          <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
            <div className="flex justify-between mb-4">
              <span className="text-zinc-500 text-sm">You Receive</span>

              <span className="text-zinc-500 text-sm">
                {(Number(ethAmount || 0) * 1000).toLocaleString()} NXS
              </span>
            </div>

            <div className="flex items-center justify-between">
              <input
                type="text"
                value={ethAmount ? Number(ethAmount) * 1000 : ""}
                readOnly
                placeholder="0.0"
                className="bg-transparent outline-none text-5xl font-black w-52 placeholder:text-zinc-700"
              />

              <button className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] transition-all duration-300">
                <div className="w-3 h-3 rounded-full bg-violet-300" />

                <span className="font-semibold">NXS</span>
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="mt-8 rounded-3xl border border-white/5 bg-white/[0.03] p-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-zinc-500">Exchange Rate</span>

              <span className="font-medium">1 SCAI = 1000 NXS</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500">Network Fee</span>

              <span className="font-medium">~0.001 SCAI</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500">Estimated Time</span>

              <span className="font-medium">~4 Seconds</span>
            </div>
          </div>

          {/* Swap Button */}
          <button
            onClick={handleSwap}
            className="w-full mt-8 py-5 rounded-3xl bg-gradient-to-r from-cyan-300 to-violet-400 text-black text-lg font-black hover:scale-[1.02] transition-all duration-300 shadow-[0_0_30px_rgba(139,92,246,0.25)]"
          >
            Swap Tokens
          </button>
        </motion.div>
      </div>

      <TransactionModal
        isOpen={modalOpen}
        status={txStatus}
        hash={txHash}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
