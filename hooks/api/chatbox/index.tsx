"use client";

import {
  GET_CHATBOX_SESSION,
  GET_CHATBOX_HISTORY,
} from "@/utils/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  IChatBoxParams,
  IChatBoxHistoryParams,
} from "../interfaces";
// import { useAuthorizer } from "@authorizerdev/authorizer-react";
import { useAccount } from "wagmi";
import axios from "axios";

export const useChatSession = (params: IChatBoxParams) => {
  const { address  } = useAccount();
  return useQuery(GET_CHATBOX_SESSION, () =>
    axios.post("/api/chatbox/chat_session", params, {
      headers: {
        "x-kf-user-id": address,
      },
    }),
    // {
    //   enabled: !!params.request_url,
    // }
  );
};

export const useChatHistory = (params: IChatBoxParams) => {
  const { address  } = useAccount();

  return useQuery([...GET_CHATBOX_HISTORY, params.session_id], () =>
    axios.post("/api/chatbox/chat_history", params, {
      headers: {
        "x-kf-user-id": address,
      },
    })
  );
};

export const useDeleteChatHistory = () => {
  const { address  } = useAccount();

  return useMutation((params: IChatBoxHistoryParams) =>
    axios.post("/api/chatbox/delete_chat_history", params, {
      headers: {
        "x-kf-user-id": address,
      },
    })
  );
}