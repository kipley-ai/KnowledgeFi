import { GET_NFT_DETAIL } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import axios from "axios";
import { INftParams } from "../interfaces";

export const useNftDetail = (params: INftParams) => {
	const { address } = useAccount();

	return useQuery({
		queryKey: [...GET_NFT_DETAIL, address, params.sft_id],
		queryFn: () =>
			axios.post("/api/nft/detail", params, {
				headers: {
					"x-kf-user-id": address,
				},
			}),
		// {
		//   enabled: !!params.request_url,
		// }
	});
};
