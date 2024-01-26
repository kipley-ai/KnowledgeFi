import { useMutation, useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import axios from "axios";
import { ICreateKBAndNFTParams } from "../interfaces";

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
