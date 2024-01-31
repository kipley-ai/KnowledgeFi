import { useMutation, useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import axios from "axios";
import { ICreateKBAndNFTParams, IKBItem } from "../interfaces";

export const useCreateKBAndMintNFT = () => {
	const { address } = useAccount();

	return useMutation({
		mutationFn: (params: ICreateKBAndNFTParams) =>
			axios.post("/api/kb/create", params, {
				headers: {
					"x-kf-user-id": address,
				},
			}),
	});
};

export const useMintNFT = () => {
	const { address } = useAccount();

	return useMutation({
		mutationFn: (params: {kb_id:string}) =>
			axios.post("/api/kb/mint_nft", params, {
				headers: {
					"x-kf-user-id": address,
				},
			}),
	});
};

export const useKBItem = (params: IKBItem) => {
	const { address } = useAccount();

	return useQuery({
		queryKey: ["kb-item", params.kb_id],
		queryFn: () =>
			axios.post("/api/kb/item", params, {
				headers: {
					"x-kf-user-id": address,
				},
			}),
	});
};