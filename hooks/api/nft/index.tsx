import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import axios from "axios";
import { INFTDetailParams } from "../interfaces";

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
	});
};
