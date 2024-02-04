import {
  useChatHistory,
  useChatSession,
  useChatboxWS,
} from "@/hooks/api/chatbox";
import { useNftDetail } from "@/hooks/api/nft";
import { useEffect, useState, useRef } from "react";
import { useCreateChatbotContext } from "./create-chatbot-context";
import LastMessage, { CopyButton } from "./last-message";
import { useChatbotDetail, useGetSession } from "@/hooks/api/chatbot";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAccount } from "wagmi";
import Image from "next/image";
import AvatarDummy from "public/images/avatar-bot-dummy.svg";
import AvatarDummy2 from "public/images/avatar-user-dummy.svg";
import { StaticImageData } from "next/image";
import ChatMessage from "./chat-message";
import FirstAnswer from "./first-message";
import { useCreditDeduction } from "@/hooks/api/credit";
import { useAppProvider } from "@/providers/app-provider";
import { useCreditBalanceContext } from "./credit-balance-context";
import { useCreditBalance } from "@/hooks/api/credit";

const MessageList = () => {
  const [answersStream, setAnswersStream] = useState<string[]>([]);
  const fieldRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<StaticImageData | string>(
    ""
  );

  const { data: twitterSession, status: twitterStatus } = useSession();
  const { isConnected } = useAccount();
  const [isConnected_, setIsConnected_] = useState<boolean>(false);

  useEffect(() => {
    setIsConnected_(isConnected);
    setProfileImage(twitterSession?.user?.image || "");
  }, [isConnected, twitterStatus]);

  const {
    newQuestion,
    setNewQuestion,
    lastQuestion,

    lastJsonMessage,
    readyState,
    sendValidatedMessage,

    replyStatus,
    setReplyStatus,

    messageHistory,
    setMessageHistory,

    buttonSession,
  } = useCreateChatbotContext();

  const { id } = useParams();

  const { data: chatbotData, isSuccess: chatbotDetailIsSuccess } =
    useChatbotDetail({
      chatbot_id: id as string,
    });
  const chatSession = useGetSession({ chatbot_id: id as string });

  const chatHistoryAPI = useChatHistory({
    session_id: chatSession.data?.data.data?.session_id,
    app_id: id as string,
    page_num: 1,
    page_size: 10,
    // request_url:
    //   appDetail?.data?.data.data.app_info.plugin_meta_data.chat_history_api
    //     .request_url,
  });

  const { setCreditBalance } = useCreditBalanceContext();
  const { setModalTopUp } = useAppProvider();
  const creditDeduction = useCreditDeduction();

  useEffect(() => {
    console.log(chatbotDetailIsSuccess && chatHistoryAPI.isSuccess);
    if (chatbotDetailIsSuccess && chatHistoryAPI.isSuccess) {
      console.log(chatHistoryAPI.data?.data.length);
      if (chatHistoryAPI.data?.data.length) {
        console.log(chatHistoryAPI.data?.data);
        setMessageHistory(chatHistoryAPI.data?.data.reverse());
      } else if (chatHistoryAPI.data?.data.length === 0) {
        setMessageHistory(chatHistoryAPI.data?.data);
      }
      setAnswersStream([]);
    }

    // }, [chatHistoryAPI.isSuccess, chatHistoryAPI.data?.data]);
  }, [chatbotDetailIsSuccess, chatHistoryAPI.isSuccess, buttonSession]);

  useEffect(() => {
    fieldRef.current?.scrollIntoView({
      behavior: "smooth",
    });

    console.log("Answer Stream");
    console.log(answersStream.slice(0, -2));

    if (lastJsonMessage !== null && lastJsonMessage.type !== "error") {
      if (lastJsonMessage.type === "end") {
        chatHistoryAPI.refetch();

        const fullBotAnswer = answersStream
          .slice(0, -2)
          .map((message: string, idx: number) => {
            if (idx == 0) return "";
            return message;
          })
          .reduce((a: string, b: string) => a + b, "");

        console.log("fullBotAnswer");
        console.log(fullBotAnswer);

        setMessageHistory((prevHistory) => [
          ...prevHistory,
          { sender: "bot", message: fullBotAnswer },
        ]);

        setAnswersStream([]);
        setReplyStatus("idle");

        console.log("Message history");
        console.log(messageHistory);

        creditDeduction.mutate({
          answer: fullBotAnswer,
          question: lastQuestion,
          chatbot_id: id as string,
          session_id: chatSession.data?.data.data?.session_id,
        }, {
          onSuccess: () => {
            const creditBalance = useCreditBalance().data?.data.data.credit_balance;
            setCreditBalance(creditBalance);
          },
        });

        return;
      }

      setAnswersStream((prevAnswersStream) => {
        if (lastJsonMessage.sender == "user") {
          return prevAnswersStream;
        }
        return [...prevAnswersStream, lastJsonMessage.message];
      });
    }

    if (
      lastJsonMessage !== null &&
      lastJsonMessage.type === "error" &&
      lastJsonMessage.message === "Credit insufficient"
    ) {
      const msgHist = messageHistory.slice(0, -1);
      setMessageHistory(msgHist);
      setReplyStatus("idle");
      setModalTopUp(true);
      return;
    }
  }, [lastJsonMessage]);

  return (
    <div className="grow flex flex-col gap-2 md:space-y-4 overflow-auto">
      <FirstAnswer
        profileImage={chatbotData?.data.data.profile_image}
        sender={"bot"}
        message={chatbotData?.data.data.example_conversation}
        isGenerating={replyStatus == "answering"}
      />
      {messageHistory.map((message, index) => {
        return index < messageHistory.length - 1 || message.sender == "user" ? (
          <ChatMessage chatbotData={chatbotData} message={message} />
        ) : (
          // <div onMouseOver={}>
          // 	<div className="flex items-start space-x-3 ">
          // 		<Image src={chatbotData?.data.data.profile_image} alt="User avatar" className="w-8 h-8 rounded-full mr-5" />
          // 		<div className="text-white text-sm w-full">
          // 			<h6 className="mb-5 mt-1">{message.sender == "bot" ? chatbotData?.data.data.name : "You"}</h6>
          // 			<p>{message.message}</p>
          // 		</div>

          // 	</div>
          // 	<div className="flex items-center justify-end pl-10">
          // 		<CopyButton message={message.message}/>
          // 	</div>
          // </div>
          <>
            <LastMessage
              profileImage={chatbotData?.data.data.profile_image}
              sender={"bot"}
              message={message.message}
              isGenerating={replyStatus == "answering"}
            />
          </>
        );
      })}
      {replyStatus == "idle" ? (
        <></>
      ) : (
        <LastMessage
          profileImage={chatbotData?.data.data.profile_image}
          sender={"bot"}
          message={answersStream}
          isGenerating={replyStatus == "answering"}
        />
      )}
    </div>
  );
};

export default MessageList;
