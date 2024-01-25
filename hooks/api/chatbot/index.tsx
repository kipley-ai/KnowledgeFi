import { useAccount } from "wagmi";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ICreateChatbotParams, IChatbotDetailParams } from "../interfaces";

export const useCreateChatbotAPI = () => {
	const { address } = useAccount();

	return useMutation({
		mutationFn: (params: ICreateChatbotParams) =>
			axios.post("/api/chatbot/create", params, {
				headers: {
					"x-kf-user-id": address,
				},
			}),
	});
};

export const useChatbotDetail = (params: IChatbotDetailParams) => {
	const { address } = useAccount();

	return useQuery({
		queryKey: ["chatbot", params.chatbot_id],
		queryFn: () =>
			axios.post("/api/chatbot/detail", params, {
				headers: {
					"x-kf-user-id": address,
				},
			}),
	});
};
