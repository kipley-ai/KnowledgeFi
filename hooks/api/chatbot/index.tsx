import { useAccount } from "wagmi";
import {
  useQuery,
  useMutation,
  useInfiniteQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import axios from "axios";
import {
  ICreateChatbotParams,
  IChatbotDetailParams,
  IUpdateChatbotParams,
  IChatbotList,
} from "../interfaces";
import { ChatbotDataListResponse } from "@/lib/types";

export const useChatbotList = (
  params: IChatbotList,
  placeholderData: typeof keepPreviousData | undefined = undefined,
) => {
  const appId = process.env.APP_ID;

  return useQuery({
    queryKey: [
      "chatbot",
      "list",
      params.page,
      params.page_size,
      params.sort_by,
    ],
    queryFn: () =>
      axios.post<ChatbotDataListResponse>("/api/chatbot/list", params),
    placeholderData: placeholderData,
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

export const useGetSession = (params: IChatbotDetailParams) => {
  const { address } = useAccount();

  return useQuery({
    queryKey: ["session", params.chatbot_id],
    queryFn: () =>
      axios.post("/api/chatbot/get_session", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};

export const useChatbotChatList = () => {
	const { address } = useAccount();

	return useQuery({
		queryKey: ["chatbot", "chat_list"],
		queryFn: () =>
			axios.post("/api/chatbot/chat_list", {}, {
				headers: {
					"x-kf-user-id": address,
				},
			}),
	});
};
