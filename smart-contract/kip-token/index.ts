import { ethers } from "ethers";
import abi from "./abi.json";
import { getSigner } from "..";

export async function getKipTokenContract() {
  const contractAddress = "0x0C6b55aaB97617A0961ddCb868B6Fe9Cc67E76F7";
  // process.env.NEXT_PUBLIC_KIP_PROTOCOL_CONTRACT_ADDRESS!;
  // const contractProvider = new ethers.JsonRpcProvider(
  //     process.env.NEXT_PUBLIC_KIP_CONTRACT_API ||
  //         "https://polygon-mumbai.g.alchemy.com/v2/tOGMgTXPR3W7cl67uDprwaYuLhT5FKH1" // "http://127.0.0.1:8545/"
  // );

  const signer = await getSigner();

  // const contractRead = new ethers.Contract(
  //     contractAddress,
  //     abi,
  //     contractProvider
  // ); // Read only
  const contractWrite = new ethers.Contract(contractAddress, abi, signer); // Write only

  return { contractWrite };
}

export async function approve(value: BigInt) {
  const { contractWrite } = await getKipTokenContract();
  return await contractWrite.approve(
    process.env.NEXT_PUBLIC_KIP_PROTOCOL_CONTRACT_ADDRESS!,
    value
  );
}

export async function allowance() {
  const signer = await getSigner();
  const { contractWrite } = await getKipTokenContract();
  return await contractWrite.allowance(
    signer.address,
    process.env.NEXT_PUBLIC_KIP_PROTOCOL_CONTRACT_ADDRESS!
  );
}
