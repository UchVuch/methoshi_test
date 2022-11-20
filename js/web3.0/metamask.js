"use strict";

const ethereum = window.ethereum;
let currentNetwork;
let wallet;

async function switchNetwork() {
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${config.mainChainId.toString(16)}` }],
    });
  } catch (err) {
    console.error(err);
  }
}

async function connect() {
  try {
    if (ethereum) {
      currentNetwork = ethereum.networkVersion;
      if (currentNetwork !== config.mainChainId) {
        await switchNetwork();
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      wallet = accounts[0];
      store.user.wallet = accounts[0];

      return new ethers.providers.Web3Provider(ethereum);
    } else alert("Install Metamask!");
  } catch (err) {
    console.error(err);
  }
}
