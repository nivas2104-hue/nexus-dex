import { ethers } from "ethers";

export async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask not detected");
    return null;
  }

  try {
    await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    const address = await signer.getAddress();

    return {
      address,
      provider,
      signer,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
