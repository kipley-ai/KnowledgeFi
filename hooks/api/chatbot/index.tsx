import { useAccount } from "wagmi";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ICreateChatbotParams } from "../interfaces";

export const useCreateChatbotAPI = () => {
    const { address  } = useAccount();
  
    return useMutation((params: ICreateChatbotParams) =>
      axios.post("/api/chatbot/create", params, {
        headers: {
          "x-kf-user-id": address,
        },
      })
    );
  };