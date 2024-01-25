import { useAccount } from "wagmi";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { INFTDetailParams } from "../interfaces";

export const useNFTList = (params: any) => {
  const { address } = useAccount();

  return useQuery(['nfts'], () =>
    axios.post("/api/nft/list", params, {
      headers: {
        "x-kf-user-id": address,
      },
    })
  );
}

export const useNFTDetail = (params:INFTDetailParams) => {
    const { address  } = useAccount();
  
    return useQuery(['nft',params.sft_id],() =>
      axios.post("/api/nft/detail", params, {
        headers: {
          "x-kf-user-id": address,
        },
      })
    );
  };