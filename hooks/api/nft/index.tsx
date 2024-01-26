import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import axios from "axios";
import { INFTDetailParams } from "../interfaces";

export const useNFTList = (params: any) => {
  const appId = process.env.APP_ID;

  return useQuery({
		queryKey: ["nft", "list", params.page],
		queryFn: () => axios.post("/api/nft/list", params),
	});
};

export const useNftDetail = (params: INFTDetailParams) => {
	const { address } = useAccount();

	return useQuery({
		queryKey: ["nft", address, params.sft_id],
		queryFn: () =>
			axios.post("/api/nft/detail", params, {
				headers: {
					"x-kf-user-id": address,
				},
			}),
	});};

