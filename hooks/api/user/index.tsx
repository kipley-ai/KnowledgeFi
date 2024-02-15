import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import axios from "axios";
import { IPaginate } from "../interfaces";

export const useCreateUser = () => {
	// const { address } = useAccount();

	return useMutation({
		mutationFn: (address:string) =>
			axios.post("/api/user/create", {wallet_addr:address}, {
				headers: {
					"x-kf-user-id": address,
				},
			}),
	});
};

export const useDepositHistory = (
	params: IPaginate,
	placeholderData: typeof keepPreviousData | undefined = undefined,
) => {
	const { address } = useAccount();
	
	return useQuery({
		queryKey: ["deposit", params.page],
		queryFn: () =>
			axios.post("/api/user/deposit", params, {
				headers: {
					"x-kf-user-id": address,
				},
			}),
	});
};

export const useWithdrawHistory = (
	params: IPaginate,
	placeholderData: typeof keepPreviousData | undefined = undefined,
) => {
	const { address } = useAccount();
	
	return useQuery({
		queryKey: ["withdraw", params.page],
		queryFn: () =>
			axios.post("/api/user/withdraw", params, {
				headers: {
					"x-kf-user-id": address,
				},
			}),
	});
};
