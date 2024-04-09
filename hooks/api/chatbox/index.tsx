"use client";

import { GET_CHATBOX_SESSION, GET_CHATBOX_HISTORY } from "@/utils/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IChatBoxParams, IChatBoxHistoryParams } from "../interfaces";
import useWebSocket from "react-use-websocket";
// import { useAuthorizer } from "@authorizerdev/authorizer-react";
import { useAccount } from "wagmi";
import { constructHeader } from "@/app/api/utils";
import { chatPayloadSchema, ChatPayload, LastMessagePayload } from "./schema";
import axios from "axios";

export const useChatSession = (params: IChatBoxParams) => {
	const { address } = useAccount();

	return useQuery(
		{
			queryKey: [
				...GET_CHATBOX_SESSION,
				address,
				params.user_id,
				params.app_id,
			],
			queryFn: () =>
				axios.post("/api/chatbox/chat_session", params, {
					headers: {
						"x-kf-user-id": address,
					},
				}),
		}
		// {
		//   enabled: !!params.request_url,
		// }
	);
};

export const useChatboxWS = (socketUrl: string) => {
	const { sendMessage, lastJsonMessage, readyState } =
		useWebSocket<LastMessagePayload>(socketUrl);

	const sendValidatedMessage = (message: ChatPayload) => {
		try {
			// chatPayloadSchema.parse(message);

			sendMessage(JSON.stringify(message));
		} catch (error) {
			console.error("Validation failed", error);
		}
	};

	return { sendValidatedMessage, lastJsonMessage, readyState };
};

export const useChatHistory = (params: IChatBoxParams) => {
	const { address } = useAccount();

	return useQuery({
		queryKey: [...GET_CHATBOX_HISTORY, params.session_id],
		queryFn: () =>
			axios.post("/api/chatbox/chat_history", params, {
				headers: {
					"x-kf-user-id": address,
				},
			}),
	});
};

export const useDeleteChatHistory = () => {
	const { address } = useAccount();

	return useMutation({
		mutationFn: (params: IChatBoxHistoryParams) =>
			axios.post("/api/chatbox/delete_chat_history", params, {
				headers: {
					"x-kf-user-id": address,
				},
			}),
	});
};
