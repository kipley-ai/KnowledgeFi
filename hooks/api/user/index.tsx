import { useMutation, useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import axios from "axios";

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

