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
  IChatbotExplore,
} from "../interfaces";
import { ChatbotDataListResponse, ChatbotDetailResponse } from "@/lib/types";

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
      axios.post<ChatbotDetailResponse>("/api/chatbot/detail", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
    enabled: !!params.chatbot_id,
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
      axios.post(
        "/api/chatbot/chat_list",
        {},
        {
          headers: {
            "x-kf-user-id": address,
          },
        },
      ),
  });
};

export const useGetCategory = () => {
  const { address } = useAccount();

  return useQuery({
    queryKey: ["chatbot", "category"],
    queryFn: () =>
      axios.post(
        "/api/chatbot/category",
        {},
        {
          headers: {
            "x-kf-user-id": address,
          },
        },
      ),
  });
};

export const useMyChatbotList = (
  params: IChatbotList,
  placeholderData: typeof keepPreviousData | undefined = undefined,
) => {
  const { address } = useAccount();

  return useQuery({
    queryKey: ["my-chatbots", params.page],
    queryFn: () =>
      axios.post<ChatbotDataListResponse>("/api/chatbot/my_chatbot", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
    placeholderData: placeholderData,
  });
};

export const useGetChatbotPrice = (params: IChatbotDetailParams) => {
  const { address } = useAccount();

  return useQuery({
    queryKey: ["chatbot", "price", params.chatbot_id],
    queryFn: () =>
      axios.post("/api/chatbot/price", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
}

export const useChatbotPKLStatus = (params: any) => {
  const { address } = useAccount();

  return useQuery({
    queryKey: ["chatbot", "pkl", params.kb_id],
    queryFn: () =>
      axios.post("/api/chatbot/pkl", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
    refetchInterval: 3000,
    enabled: params.willRefetch,
  });
}

export const useUpdateSharedChat = () => {
  const { address } = useAccount();

  return useMutation({
    mutationFn: (params: any) =>
      axios.post("/api/chatbot/update_shared_chat", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
}

export const useGetSharedChatId = (params: any) => {
  const { address } = useAccount();

  return useQuery({
    queryKey: ["chatbot", "shared_chat_id", params.chatbot_id],
    queryFn: () =>
      axios.post("/api/chatbot/shared_chat_id", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
}

export const useGetSharedChat = (params: any) => {
  const { address } = useAccount();

  return useQuery({
    queryKey: ["chatbot", "shared_chat", params.id],
    queryFn: () =>
      axios.post("/api/chatbot/shared_chat", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
}

export const useChatbotExplore = (
  params: IChatbotExplore,
  placeholderData: typeof keepPreviousData | undefined = undefined,
) => {
  const appId = process.env.APP_ID;

  return useQuery({
    queryKey: [
      params.page,
      params.page_size,
      params.explore_name
    ],
    queryFn: () =>
      axios.post<ChatbotDataListResponse>("/api/chatbot/list", params),
    placeholderData: placeholderData,
  });
};