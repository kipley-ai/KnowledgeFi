import { Contract, ethers } from "ethers";
import abi from "./abi.json";
import { getSigner } from "..";

const contractAddress = process.env.NEXT_PUBLIC_KIP_PROTOCOL_CONTRACT_ADDRESS!;

export async function getKipProtocolContract() {
  // const contractProvider = new ethers.JsonRpcProvider(
  //   "https://rpc.sepolia.org",
  // );
  const signer = await getSigner();

  // const contractRead = new ethers.Contract(
  //   contractAddress,
  //   abi,
  //   contractProvider,
  // ); // Read only

  const contractWrite = new ethers.Contract(contractAddress, abi, signer); // Write only

  return { contractWrite };
}

export async function getSftContract(contractAddress: string) {
  const _abi = [
    "function _tokenProfit(uint256 token_id) public view returns (uint256)",
  ];
  const contractProvider = new ethers.JsonRpcProvider(
    "https://sepolia.drpc.org",
  );
  const contractRead = new ethers.Contract(
    contractAddress,
    _abi,
    contractProvider,
  );

  return { contractRead };
}

export async function mintNFT(
  kbId: string,
  name: string,
  symbol: string,
  slotValue: number,
  assetId: number,
) {
  const signer = await getSigner();
  const { contractWrite } = await getKipProtocolContract();

  return await contractWrite.createSFT(
    name,
    symbol,
    slotValue,
    1,
    signer.address,
    kbId,
  );
}

export async function recharge(amount: number) {
  const { contractWrite } = await getKipProtocolContract();
  return await contractWrite.recharge(BigInt(amount * 1e18)).catch((e) => {
    console.log(e);
  });
}

export async function tokenProfit(
  contractRead: Contract,
  tokenId: number,
): Promise<string> {
  return await contractRead._tokenProfit(BigInt(tokenId)).catch((e) => {
    console.log(e);
  });
}

export async function withdrawEarnings(
  sftAddress: string,
  tokenId: number,
  amount: number,
) {
  const { contractWrite } = await getKipProtocolContract();

  return await contractWrite.claimIncome(
    sftAddress,
    BigInt(tokenId),
    BigInt(amount),
  );
}
