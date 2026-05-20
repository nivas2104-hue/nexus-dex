import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

export default function TransactionModal({ isOpen, status, hash, onClose }) {
  if (!isOpen) return null;

  const config = {
    waiting: {
      title: "Waiting For Wallet",
      description: "Confirm the transaction in MetaMask.",
      icon: <Loader2 className="animate-spin text-cyan-300" size={70} />,
    },

    pending: {
      title: "Transaction Pending",
      description: "Blockchain confirmation in progress.",
      icon: <Loader2 className="animate-spin text-yellow-300" size={70} />,
    },

    success: {
      title: "Swap Successful",
      description: "Your tokens were swapped successfully.",
      icon: <CheckCircle2 className="text-emerald-400" size={70} />,
    },

    error: {
      title: "Transaction Failed",
      description: "Something went wrong during execution.",
      icon: <XCircle className="text-red-400" size={70} />,
    },
  };

  const current = config[status] || config.pending;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-xl"
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.85,
            y: 40,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
          }}
          transition={{
            duration: 0.35,
          }}
          className="relative w-full max-w-md rounded-[36px] border border-white/10 bg-[#050816]/90 backdrop-blur-3xl p-10 shadow-[0_0_80px_rgba(34,211,238,0.12)] overflow-hidden"
        >
          {/* Glow */}
          <div className="absolute w-72 h-72 bg-cyan-400/10 blur-3xl rounded-full top-[-100px] right-[-100px]" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-8">{current.icon}</div>

            <h2 className="text-3xl font-black mb-4">{current.title}</h2>

            <p className="text-zinc-400 leading-relaxed">
              {current.description}
            </p>

            {hash && (
              <div className="mt-8 w-full rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">
                  Transaction Hash
                </p>

                <p className="text-cyan-200 text-xs break-all">{hash}</p>
              </div>
            )}

            {(status === "success" || status === "error") && (
              <button
                onClick={onClose}
                className="mt-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-300 to-violet-400 text-black font-black hover:scale-[1.03] transition-all duration-300"
              >
                Close
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
