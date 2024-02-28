import { useMutation, useQuery, keepPreviousData } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import axios from "axios";
import { ICreateKBAndNFTParams, IKBDetail, IKBItem } from "../interfaces";
import { KBItemResponse } from "@/lib/types";

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

export const useUpdateKB = () => {
	const { address } = useAccount();

	return useMutation({
		mutationFn: (params: {kb_id:string, kb_data:any}) =>
			axios.post("/api/kb/update_kb", params, {
				headers: {
					"x-kf-user-id": address,
				},
			}),
	});
};

export const useDeleteKBItem = () => {
	const { address } = useAccount();

	return useMutation({
		mutationFn: (params: {kb_id:string, items_name:string[]}) =>
			axios.post("/api/kb/delete-item", params, {
				headers: {
					"x-kf-user-id": address,
				},
			}),
	});
}

export const useKBItem = (
	params: IKBItem,
	placeholderData: typeof keepPreviousData | undefined = undefined,
) => {
	const { address } = useAccount();

	return useQuery({
		queryKey: ["kb-item", params.page],
		queryFn: () =>
			axios.post<KBItemResponse>("/api/kb/item", params, {
				headers: {
					"x-kf-user-id": address,
				},
			}),
			placeholderData: placeholderData,
	});
};

export const useKBDetail = (params: IKBDetail) => {
	const { address } = useAccount();

	return useQuery({
		queryKey: ["kb-detail", params.kb_id],
		queryFn: () =>
			axios.post("/api/kb/detail", params, {
				headers: {
					"x-kf-user-id": address,
				},
			}),
		enabled: !!params.kb_id,
	});
};