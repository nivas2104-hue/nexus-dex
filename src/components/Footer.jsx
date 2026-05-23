export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-24">
      <div className="max-w-7xl mx-auto px-8 py-10 flex flex-col lg:flex-row justify-between items-center gap-6">
        {/* LEFT */}
        <div>
          <h2 className="text-2xl font-black bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
            NEXUS DEX
          </h2>

          <p className="text-zinc-500 mt-2 text-sm">
            Built with Solidity, React, Hardhat & Ethers.js
          </p>
        </div>

        {/* CENTER */}
        <div className="text-zinc-500 text-sm text-center">
          LIVE on SCAI Mainnet
        </div>

        {/* RIGHT */}
        <div className="text-zinc-500 text-sm">
          Powered by SecureChain • 2026
          <p className="text-zinc-500 text-sm">
            Developed during EtherAuthority Blockchain Internship Program
          </p>
        </div>
      </div>
    </footer>
  );
}
