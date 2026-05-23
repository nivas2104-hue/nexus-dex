import etherAuthorityLogo from "../assets/etherauthority.png";
export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-24">
      <div className="max-w-7xl mx-auto px-8 py-8 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* LEFT */}
        <div>
          <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
            NEXUS DEX
          </h2>

          <p className="text-zinc-400 mt-2 text-sm">
            Built with Solidity, React, Hardhat & Ethers.js
          </p>
        </div>

        {/* CENTER */}
        <div className="text-zinc-400 text-sm">LIVE on SCAI Mainnet</div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          <img
            src={etherAuthorityLogo}
            alt="EtherAuthority"
            className="w-20 h-20 object-contain"
          />

          <div>
            <p className="text-white text-lg font-semibold">EtherAuthority</p>

            <p className="text-zinc-400 text-sm">
              Blockchain Internship Program
            </p>

            <p className="text-zinc-500 text-xs mt-1">
              Powered by SecureChain • 2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
