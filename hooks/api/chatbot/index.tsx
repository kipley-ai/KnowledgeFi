import { useAccount } from "wagmi";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ICreateChatbotParams, IChatbotDetailParams, IUpdateChatbotParams } from "../interfaces";

export const useChatbotList = (params: any) => {
	const appId = process.env.APP_ID;

	return useQuery({
		queryKey: ["nft", "list", params.page],
		queryFn: () => axios.post("/api/chatbot/list", params),
	});
};

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

export const useUpdateChatbotAPI = () => {
	const { address } = useAccount();

	return useMutation({
		mutationFn: (params: IUpdateChatbotParams) =>
			axios.post("/api/chatbot/edit", params, {
				headers: {
					"x-kf-user-id": address,
				},
			}),
	});
};

export const useNewSession = () => {
	const { address } = useAccount();

	return useMutation({
		mutationFn: (params: IChatbotDetailParams) =>
			axios.post("/api/chatbot/new_session", params, {
				headers: {
					"x-kf-user-id": address,
				},
			}),
	});
};
