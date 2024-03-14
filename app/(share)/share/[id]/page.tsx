"use client"

import { useGetSharedChat } from "@/hooks/api/chatbot";
import { useChatbotDetail } from "@/hooks/api/chatbot";
import { useParams } from "next/navigation";
import AvatarDefault from "@/public/images/avatar-default.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Router } from "next/router";

type Message = {
  message: string,
  sender: string,
  create: string,
}

const MessageHistory = ({
  messageHistory,
  botImage,
  botName,
}: {
  messageHistory?: Message[];
  botImage?: string;
  botName?: string;
}) => {
  return (
    <div className="text-white py-10">
      {messageHistory?.map((message, index) => {
        return (
          <div className="flex flex-row p-4 space-x-4" key={index}>
            <Image
              src={message.sender === "user" ? AvatarDefault : botImage}
              className="w-8 h-8 rounded"
              alt="Profile"
              width={50}
              height={50}
            />
            <div className="flex flex-col space-y-4 pt-2 w-full text-sm font-light">
              <p>{message.sender === "user" ? "Anonymous": botName}</p>
              <p className="whitespace-break-spaces">{message.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  )
}

const SharedChat = () => {
  const id = useParams();
  const sharedChat = useGetSharedChat({ "share_id": id.id })
  const chatbotDetail = useChatbotDetail({ "chatbot_id": sharedChat.data?.data.chatbot_id })
  const sharedDate = new Date(sharedChat.data?.data.last_shared_time).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const router = useRouter();
  console.log('yey')
    
  return (
    <div className={`flex flex-col bg-[#080403] ${sharedChat.isFetching ? "h-[200dvh]": "h-full"} border-[#393E44] text-[#7C878E]`}>
      <h1 className="border-b border-[#393E44] text-center py-10 text-3xl text-white">Knowledgefi</h1>
      <div className="flex flex-col w-1/2 mx-auto pt-16">
        <div className="border-b border-[#393E44] pb-6 space-y-5">
            <h1 className="text-white text-3xl">{chatbotDetail.data?.data.data.name}</h1>
            <h6 className="text-sm">{sharedChat.isFetching ? "" : sharedDate}</h6>
        </div>
        <MessageHistory messageHistory={sharedChat.data?.data.chat_history} botImage={chatbotDetail.data?.data.data.profile_image} botName={chatbotDetail.data?.data.data.name} />
        <button
        type="button"
        className="text-[#00FFFF] bg-[#353945] hover:bg-slate-600 px-5 py-2 mb-20 mx-auto rounded"
        onClick={() =>  router.push("/onboarding")}>
          Start to explore KnowledgeFi
        </button>
      </div>
    </div>
  )
}

export default SharedChat;