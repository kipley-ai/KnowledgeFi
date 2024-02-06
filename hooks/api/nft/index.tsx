import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import axios from "axios";
import { INFTDetailParams, INftList } from "../interfaces";
import { NftData, NftDataListResponse, NftDetailResponse } from "@/lib/types";

export const useNFTList = (
  params: INftList,
  placeholderData: typeof keepPreviousData | undefined = undefined,
) => {
  const appId = process.env.APP_ID;

  return useQuery({
    queryKey: ["nfts", params.page],
    queryFn: () => axios.post<NftDataListResponse>("/api/nft/list", params),
    placeholderData: placeholderData,
  });
};

export const useNftDetail = (params: INFTDetailParams) => {
  const { address } = useAccount();

  return useQuery({
    queryKey: ["nft", address, params.sft_id],
    queryFn: () =>
      axios.post<NftDetailResponse>("/api/nft/detail", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};
