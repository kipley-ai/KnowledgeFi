import { ethers } from "ethers";
import abi from "./abi.json";
import { getSigner } from "..";
import {
  generateRandomDigitInteger,
  hashUUIDToInteger,
  hashUUIDToIntegerV2,
} from "@/utils/utils";

export async function getKipProtocolContract() {
  const contractAddress =
    process.env.NEXT_PUBLIC_KIP_PROTOCOL_CONTRACT_ADDRESS!;
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

export async function mintNFT(
  // kbId: string,
  name: string,
  symbol: string,
  slotValue: number,
  assetId: number
) {
  // let assetId = hashUUIDToIntegerV2(kbId);
  // if (kbId === "") {
  //   assetId = generateRandomDigitInteger();
  // }

  const signer = await getSigner();
  const { contractWrite } = await getKipProtocolContract();
  return await contractWrite.createSFT(
    name,
    symbol,
    slotValue,
    1,
    BigInt(assetId),
    signer.address
  );
}

export async function recharge(amount: number) {
  const { contractWrite } = await getKipProtocolContract();
  return await contractWrite.recharge(BigInt(amount * 1e18));
}
