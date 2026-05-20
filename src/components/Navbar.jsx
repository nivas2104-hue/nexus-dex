import { Link, useLocation } from "react-router-dom";
import { Wallet } from "lucide-react";
import { useState } from "react";
import { connectWallet } from "../utils/wallet";
import { switchToSCAI } from "../utils/network";
import { useEffect } from "react";

export default function Navbar() {
  const location = useLocation();
  const [walletAddress, setWalletAddress] = useState("");
  useEffect(() => {
    async function checkConnection() {
      if (!window.ethereum) return;

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
      }
    }

    checkConnection();
  }, []);
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Swap", path: "/swap" },
    { name: "Liquidity", path: "/liquidity" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-cyan-500/10 bg-black/30 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-black tracking-wider text-cyan-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]"
        >
          NEXUS DEX
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const active = location.pathname === link.path;

            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative uppercase text-sm tracking-[0.2em] transition-all duration-300 ${
                  active ? "text-cyan-300" : "text-zinc-400 hover:text-cyan-200"
                }`}
              >
                {link.name}

                {active && (
                  <div className="absolute left-0 top-7 w-full h-[2px] bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,1)]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Wallet Button */}
        <button
          onClick={async () => {
            const wallet = await connectWallet();

            if (wallet) {
              setWalletAddress(wallet.address);
            }
          }}
          className="group flex items-center gap-3 px-6 py-3 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl hover:bg-white/[0.07] transition-all duration-300"
        >
          <Wallet size={18} />

          <span className="font-semibold tracking-wide">
            {walletAddress
              ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
              : "Connect Wallet"}
          </span>
        </button>
      </div>
    </nav>
  );
}
