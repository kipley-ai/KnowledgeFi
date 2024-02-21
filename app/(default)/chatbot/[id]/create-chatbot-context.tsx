"use client";

import { createContext, useContext, useState } from "react";
import { ReactSetter } from "@/lib/aliases";
import {
  useChatHistory,
  useChatSession,
  useChatboxWS,
} from "@/hooks/api/chatbox";
import { ChatPayload, LastMessagePayload } from "@/hooks/api/chatbox/schema";
import { useNftDetail } from "@/hooks/api/nft";

interface CreateChatbotContextProps {
  createChatbot: any;
  handleChange: any;

  newQuestion: string;
  setNewQuestion: ReactSetter<string>;
  lastQuestion: string;
  setLastQuestion: ReactSetter<string>;

  lastJsonMessage: LastMessagePayload;
  readyState: number;
  sendValidatedMessage: (message: ChatPayload) => void;

  replyStatus: "idle" | "answering";
  setReplyStatus: ReactSetter<"idle" | "answering">;

  messageHistory: Message[];
  setMessageHistory: ReactSetter<Message[]>;

  buttonSession: any;
  setButtonSession: any;
}

interface Message {
  sender: "bot" | "user";
  message: string;
}

const CreateChatbotContext = createContext<
  CreateChatbotContextProps | undefined
>(undefined);

export const CreateChatbotProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [createChatbot, setCreateChatbot] = useState({
    type: "",
    profile_image: "",
    username: "",
    category_id: "",
    name: "",
    description: "",
    instruction: "",
    example_conversation: "",
  });
  const [newQuestion, setNewQuestion] = useState("");
  const [lastQuestion, setLastQuestion] = useState("");
  const [buttonSession, setButtonSession] = useState(false);

  const [messageHistory, setMessageHistory] = useState<Message[]>([]);
  const { lastJsonMessage, readyState, sendValidatedMessage } = useChatboxWS(
    `${process.env.NEXT_PUBLIC_CHATBOT_WS}/chat_with_kb`,
  );
  const [replyStatus, setReplyStatus] = useState<"idle" | "answering">("idle");

  // const nftDetail = useNftDetail({
  // 	sft_id: "SFTID11",
  // });

  const handleChange = (name: string, value: any) => {
    setCreateChatbot((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  return (
    <CreateChatbotContext.Provider
      value={{
        createChatbot,
        handleChange,

        // Pressing send button
        newQuestion,
        setNewQuestion,
        lastQuestion,
        setLastQuestion,

        // WS
        lastJsonMessage,
        readyState,
        sendValidatedMessage,

        // Loading
        replyStatus,
        setReplyStatus,

        // Chat history
        messageHistory,
        setMessageHistory,

        buttonSession,
        setButtonSession,
      }}
    >
      {children}
    </CreateChatbotContext.Provider>
  );
};

export const useCreateChatbotContext = () => {
  const context = useContext(CreateChatbotContext);
  if (!context) {
    throw new Error(
      "useCreateChatbotContext must be used within a CreateChatbotProvider",
    );
  }
  return context;
};
