import ModalBlank from "@/components/modal-blank-3";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useUpdateSharedChat, useGetSharedChatId } from "@/hooks/api/chatbot";
import AvatarDummy from "public/images/avatar-default-02.svg";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  messageHistory: any[];
  chatbotData?: any;
};

const MessageHistory = ({
  messageHistory,
  botImage,
  botName,
}: {
  messageHistory: any[];
  botImage?: string;
  botName?: string;
}) => {
  return (
    <div className="h-full bg-[#151414] text-white scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-[#363434] scrollbar-track-[#151414] overflow-y-scroll">
      {messageHistory.map((message, index) => {
        return (
          <div className="flex flex-row p-4 space-x-4" key={index}>
            <Image
              src={message.sender === "user" ? AvatarDummy : botImage}
              className="w-8 h-8 rounded"
              alt="Profile"
              width={50}
              height={50}
            />
            <div className="flex flex-col space-y-4 pt-2  w-full text-sm font-light">
              <p>{message.sender === "user" ? "You": botName}</p>
              <p className="whitespace-break-spaces">{message.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  )
}

const ShareModal = ({ isOpen, setIsOpen, messageHistory, chatbotData }: ModalProps) => {
  const [isFirstShare, setIsFirstShare] = useState(true);
  const [sharedChatId, setSharedChatId] = useState("");
  const [copyClipboard, setCopyClipboard] = useState(false);
  const [lastSharedDate, setLastSharedDate] = useState(new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }));
  const sharedIdAPI = useGetSharedChatId({ chatbot_id: chatbotData?.chatbot_id });
  const updateSharedAPI = useUpdateSharedChat();
  const BASE_URL = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");

  // console.log(sharedChatId)

  useEffect(() => {
    if(sharedChatId){
      setIsFirstShare(false);
    }
  },[sharedChatId])

  useEffect(() => {
    if(sharedIdAPI.isSuccess && sharedIdAPI.data.data.data){
      setSharedChatId(sharedIdAPI.data.data.data.share_id);
      const formattedDate = new Date(sharedIdAPI.data.data.data.last_shared_time).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
      setLastSharedDate(formattedDate);

      if(!sharedIdAPI.isRefetching && copyClipboard){
        // console.log(`${BASE_URL}/chat/${sharedIdAPI.data.data.data.share_id}`)
        navigator.clipboard.writeText(`${BASE_URL}/share/${sharedIdAPI.data.data.data.share_id}`);
        setCopyClipboard(false);
      }
    }
  }, [sharedIdAPI.isSuccess, sharedIdAPI.isRefetching])
  
  const handleUpdateSharedChat = () => {
    updateSharedAPI.mutate(
      { chatbot_id: chatbotData?.chatbot_id },
      {
        onSuccess(data, variables, context) {
          sharedIdAPI.refetch();
          setCopyClipboard(true);
        }
      }
    );
  }

  const firstShareText = () => {
    return (
      <p className="text-sm text-white font-light">
        Anyone with the URL will be able to view the shared chat. Messages you send after creating your link won't be shared.
      </p>
    )
  }

  const updateShareText = () => {
    return (
      <p className="text-sm text-white font-light">
        You have shared this chat <span className="underline">before</span>. If you want to update the shared chat content, please update and get a new shared link.
      </p>
    )
  }

  return (
    <ModalBlank isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex flex-col px-8 py-8 space-y-5 bg-[#080403]">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-[#7C878E] text-2xl">Share Your Chat</h1>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" type="button" className="cursor-pointer" onClick={() => setIsOpen(false)}>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H2V2H0V0ZM4 4H2V2H4V4ZM6 6H4V4H6V6ZM8 6H6V8H4V10H2V12H0V14H2V12H4V10H6V8H8V10H10V12H12V14H14V12H12V10H10V8H8V6ZM10 4V6H8V4H10ZM12 2V4H10V2H12ZM12 2V0H14V2H12Z" fill="#7C878E"/>
          </svg>
        </div>
        {
          isFirstShare ? firstShareText() : updateShareText()
        }
        <div className="flex flex-col h-[336px] border-2 border-[#1E1E1E] rounded">
          <div className="flex flex-row h-[48px] bg-[#1E1E1E] py-2 px-4 justify-between items-center rounded rounded-b-none">
            <p className="text-white">{chatbotData?.name}</p>
            <p className="text-[#7C878E]">| {lastSharedDate}</p>
          </div>
          <MessageHistory messageHistory={messageHistory} botImage={chatbotData?.profile_image} botName={chatbotData?.name}/>
        </div>
        <button
          className="flex flex-row w-full bg-[#353945] items-center justify-center py-2 space-x-4 rounded" 
          type="button"
          onClick={handleUpdateSharedChat}
        >
          {
            updateSharedAPI.isSuccess || updateSharedAPI.isPending ?
            <></> :
            <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M18.5 8V2V0H16.5H10.5V2H14.5V4H12.5V6H10.5V8H8.5V10H6.5V12H8.5V10H10.5V8H12.5V6H14.5V4H16.5V8H18.5ZM8.5 2H2.5H0.5V4V16V18H2.5H14.5H16.5V16V10H14.5V16H2.5V4H8.5V2Z" fill="#01F7FF"/>
            </svg>
          }
          <p className="text-[#01F7FF]">{
            updateSharedAPI.isSuccess ? "COPIED!" : 
            updateSharedAPI.isPending ? "COPYING..." :
            isFirstShare ? "COPY LINK" : "UPDATE AND COPY LINK"
          }</p>
        </button>
      </div>
    </ModalBlank>
  )
}

export default ShareModal;