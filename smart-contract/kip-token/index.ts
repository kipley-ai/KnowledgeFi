import { ethers } from "ethers";
import abi from "./abi.json";
import { getSigner } from "..";

export async function getKipTokenContract() {
  const contractAddress = process.env.NEXT_PUBLIC_KIP_TOKEN_CONTRACT_ADDRESS!;
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
  const tx = await contractWrite.approve(
    process.env.NEXT_PUBLIC_KIP_PROTOCOL_CONTRACT_ADDRESS!,
    value,
  );
  await tx.wait();
  return tx.hash;
}

export async function allowance() {
  const signer = await getSigner();
  const { contractWrite } = await getKipTokenContract();
  return await contractWrite.allowance(
    signer.address,
    process.env.NEXT_PUBLIC_KIP_PROTOCOL_CONTRACT_ADDRESS!,
  );
}

export async function balanceOf() {
  const signer = await getSigner();
  const { contractWrite } = await getKipTokenContract();
  return await contractWrite.balanceOf(signer.address);
}
