import { ethers } from "ethers";

export const getSigner = async () => {
  const signerProvider = new ethers.BrowserProvider(window.ethereum);
  return await signerProvider.getSigner();
};
