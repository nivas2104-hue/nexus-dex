export async function switchToSCAI() {
  if (!window.ethereum) {
    alert("MetaMask not installed");
    return;
  }

  const scaiChainId = "0x22";

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: scaiChainId }],
    });
  } catch (switchError) {
    console.error(switchError);

    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x22",
            chainName: "SCAI Mainnet",
            nativeCurrency: {
              name: "SCAI",
              symbol: "SCAI",
              decimals: 18,
            },
            rpcUrls: ["https://mainnet-rpc.securechain.ai"],
            blockExplorerUrls: ["https://explorer.securechain.ai"],
          },
        ],
      });
    } catch (addError) {
      console.error(addError);
    }
  }
}
