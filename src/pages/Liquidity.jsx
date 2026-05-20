import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useState } from "react";
import { ethers } from "ethers";

import { SWAP_ADDRESS, SWAP_ABI } from "../utils/swapContract";

import { TOKEN_ADDRESS, TOKEN_ABI } from "../utils/contract";

import TransactionModal from "../components/TransactionModal";

export default function Liquidity() {
  const [ethAmount, setEthAmount] = useState("");

  const [nxsAmount, setNxsAmount] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const [txStatus, setTxStatus] = useState("waiting");

  const [txHash, setTxHash] = useState("");

  async function addLiquidity() {
    try {
      if (!window.ethereum) {
        alert("MetaMask not found");
        return;
      }

      if (!ethAmount || !nxsAmount) {
        alert("Enter amounts");
        return;
      }

      setModalOpen(true);

      setTxStatus("waiting");

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();

      // TOKEN CONTRACT
      const token = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);

      // SWAP CONTRACT
      const swap = new ethers.Contract(SWAP_ADDRESS, SWAP_ABI, signer);

      // APPROVE TOKENS
      const approveTx = await token.approve(
        SWAP_ADDRESS,
        ethers.utils.parseUnits(nxsAmount, 18),
      );

      setTxHash(approveTx.hash);

      setTxStatus("pending");

      await approveTx.wait();
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // ADD LIQUIDITY
      const liquidityTx = await swap.addLiquidity(
        ethers.utils.parseUnits(nxsAmount, 18),
        {
          value: ethers.utils.parseEther(ethAmount),
        },
      );

      setTxHash(liquidityTx.hash);

      await liquidityTx.wait();

      // SAVE TRANSACTION
      const existing = JSON.parse(localStorage.getItem("nexusTxs") || "[]");

      existing.unshift({
        type: "Liquidity",
        amount: `${ethAmount} SCAI + ${nxsAmount} NXS`,
        hash: liquidityTx.hash,
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

      <div className="relative pt-40 px-6 pb-24 flex items-center justify-center">
        <div className="absolute w-[700px] h-[700px] bg-violet-500/10 rounded-full blur-3xl top-20 left-1/2 -translate-x-1/2" />

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="relative w-full max-w-2xl rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8"
        >
          <div className="mb-10">
            <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs mb-3">
              Nexus Liquidity Protocol
            </p>

            <h1 className="text-5xl font-black">Add Liquidity</h1>
          </div>

          {/* SCAI */}
          <div className="rounded-3xl border border-white/10 bg-black/20 p-6 mb-6">
            <div className="flex justify-between mb-4">
              <span className="text-zinc-500">SCAI Amount</span>

              <span className="text-zinc-500">Deposit SCAI</span>
            </div>

            <input
              type="text"
              value={ethAmount}
              onChange={(e) => setEthAmount(e.target.value)}
              placeholder="0.0"
              className="bg-transparent outline-none text-5xl font-black w-full placeholder:text-zinc-700"
            />
          </div>

          {/* NXS */}
          <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
            <div className="flex justify-between mb-4">
              <span className="text-zinc-500">NXS Amount</span>

              <span className="text-zinc-500">Deposit NXS</span>
            </div>

            <input
              type="text"
              value={nxsAmount}
              onChange={(e) => setNxsAmount(e.target.value)}
              placeholder="0.0"
              className="bg-transparent outline-none text-5xl font-black w-full placeholder:text-zinc-700"
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={addLiquidity}
            className="w-full mt-8 py-5 rounded-3xl bg-gradient-to-r from-cyan-300 to-violet-400 text-black text-lg font-black hover:scale-[1.02] transition-all duration-300"
          >
            Add Liquidity
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
