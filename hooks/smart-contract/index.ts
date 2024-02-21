import { tokenProfit } from "@/smart-contract/kip-protocol-contract";
import { getSftContract } from "@/smart-contract/kip-protocol-contract";
import { useQuery } from "@tanstack/react-query";
import { Contract } from "ethers";
import { useEffect, useState } from "react";

export const useTokenProfit_ = (
  contractAddress: string | undefined,
  tokenId: number | undefined,
) => {
  return useQuery({
    queryKey: ["token_profit", contractAddress, tokenId],
    queryFn: async () => {
      if (contractAddress && tokenId) {
        const { contractRead } = await getSftContract(contractAddress);
        return await tokenProfit(contractRead, tokenId);
      }
      return null;
    },
    enabled: !!contractAddress && !!tokenId,
  });
};

export const useSftContract = (contractAddress: string | undefined) => {
  const [loading, setLoading] = useState(true);
  const [contract, setContract] = useState<Contract | null>(null);
  const [error, setError] = useState<string[]>([]);

  useEffect(() => {
    if (!contractAddress) {
      return;
    }

    (async () => {
      try {
        const { contractRead } = await getSftContract(contractAddress); // Ensure tokenProfit is defined somewhere
        setContract(contractRead);
        setError([]); // Reset error state in case of success
      } catch (e) {
        setError([e as string, "Failed to fetch sft contract"]); // Set error state
      } finally {
        setLoading(false);
      }
    })();
  }, [contractAddress]);

  return { contract, loading, error };
};

export const useTokenProfit = (
  contractRead: Contract | null,
  tokenId: number | null,
) => {
  const [loading, setLoading] = useState(true);
  const [profit, setProfit] = useState<string | null>(null);
  const [error, setError] = useState<string[]>([]); // Added for error handling

  useEffect(() => {
    if (!contractRead || !tokenId) {
      return;
    }

    (async () => {
      try {
        const _profit = await tokenProfit(contractRead, tokenId); // Ensure tokenProfit is defined somewhere
        console.log("sneed chuck");
        console.log(_profit);
        setProfit(_profit);
        setError([]); // Reset error state in case of success
      } catch (e) {
        setError([e as string, "Failed to fetch token profit"]); // Set error state
      } finally {
        setLoading(false);
      }
    })();
  }, [contractRead, tokenId]);

  return { profit, loading, error }; // Return error state as well
};
