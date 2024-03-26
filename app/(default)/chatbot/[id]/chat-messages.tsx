import {
  useChatHistory,
  useChatSession,
  useChatboxWS,
} from "@/hooks/api/chatbox";
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
import { chatbotIdFromSlug } from "@/utils/utils";
import ShareModal from "@/components/share-chat-modal";
import TweetAnswer from "./tweet-answer";

const MessageList = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [answersStream, setAnswersStream] = useState<string[]>([]);
  const [chunks, setChunks] = useState<string>("");
  const fieldRef = useRef<HTMLDivElement>(null);
  const [profileImage, setProfileImage] = useState<StaticImageData | string>(
    "",
  );

  const { data: twitterSession, status: twitterStatus } = useSession();
  const { isConnected } = useAccount();
  const [isConnected_, setIsConnected_] = useState<boolean>(false);
  const [checkFirstQuotation, setCheckFirstQuotation] = useState(false);

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

  const { id: slug } = useParams();
  const id = chatbotIdFromSlug(slug.toString());

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
  const creditBalance = useCreditBalance();
  const creditDeduction = useCreditDeduction();

  const { setCreditBalance } = useCreditBalanceContext();
  const { setModalTopUp } = useAppProvider();

  useEffect(() => {
    console.log(chatbotDetailIsSuccess && chatHistoryAPI.isSuccess);
    if (chatbotDetailIsSuccess && chatHistoryAPI.isSuccess) {
      console.log(chatHistoryAPI.data?.data.length);
      if (chatHistoryAPI.data?.data.length) {
        console.log(chatHistoryAPI.data?.data);
        setMessageHistory(chatHistoryAPI.data?.data.reverse());
      }
      setAnswersStream([]);
    }
  }, [
    chatbotDetailIsSuccess,
    chatHistoryAPI.isSuccess,
    chatHistoryAPI.data?.data,
    buttonSession,
  ]);

  useEffect(() => {
    fieldRef.current?.scrollIntoView();

    // console.log("Answer Stream");
    // console.log(answersStream.slice(0, -2));
    console.log("lastJsonMessage :>> ", lastJsonMessage);

    if (lastJsonMessage !== null && lastJsonMessage.type !== "error") {
      if (lastJsonMessage.type === "end") {
        console.log("chunks :>> ", chunks);

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
          { sender: "bot", message: fullBotAnswer, chunks },
        ]);

        setAnswersStream([]);
        setReplyStatus("idle");
        setChunks("");

        console.log("Message history");
        console.log(messageHistory);

        creditDeduction.mutate(
          {
            answer: fullBotAnswer,
            question: lastQuestion,
            chatbot_id: id as string,
            session_id: chatSession.data?.data.data?.session_id,
          },
          {
            onSuccess: async () => {
              const { data } = await creditBalance.refetch();
              setCreditBalance(data?.data?.data.credit_balance);
              chatHistoryAPI.refetch();
            },
          },
        );

        return;
      } else if ("chunks" in lastJsonMessage) {
        const chunksObject = { chunks: lastJsonMessage.chunks };
        const chunksString = JSON.stringify(chunksObject);
        setChunks(chunksString);
      } else if (lastJsonMessage.type === "start") {
        setCheckFirstQuotation(true);
      }

      setAnswersStream((prevAnswersStream) => {
        if (lastJsonMessage.sender == "user") {
          return prevAnswersStream;
        }
        if (checkFirstQuotation && lastJsonMessage.message?.startsWith('"')) {
          setCheckFirstQuotation(false);
          return [
            ...prevAnswersStream,
            lastJsonMessage.message.slice(1, lastJsonMessage.message.length),
          ];
        } else {
          return [...prevAnswersStream, lastJsonMessage.message];
        }
      });
    }

    if (lastJsonMessage !== null && lastJsonMessage.type === "error") {
      if (lastJsonMessage.message === "Credit insufficient") {
        const msgHist = messageHistory.slice(0, -1);
        setMessageHistory(msgHist);
        setReplyStatus("idle");
        setModalTopUp(true);
      } else {
        setMessageHistory((prevHistory) => [
          ...prevHistory,
          { sender: "bot", message: "Sorry, something went wrong. Try again." },
        ]);
        setReplyStatus("idle");
      }
    }
  }, [lastJsonMessage]);

  return (
    <>
      <ShareModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        messageHistory={messageHistory}
        chatbotData={chatbotData?.data.data}
      />
      <div className="flex h-auto grow flex-col gap-2 overflow-auto md:space-y-4">
        <FirstAnswer
          profileImage={chatbotData?.data.data.profile_image}
          sender={"bot"}
          message={chatbotData?.data.data.example_conversation as string}
          isGenerating={replyStatus == "answering"}
        />
        {messageHistory.map((message, index) => {
          return index < messageHistory.length - 1 ||
            message.sender == "user" ? (
            <ChatMessage
              key={index}
              chatbotData={chatbotData}
              message={message}
            />
          ) : (
            <LastMessage
              key={index}
              profileImage={chatbotData?.data.data.profile_image}
              sender={"bot"}
              message={message.message}
              chunks={message.chunks}
              isGenerating={replyStatus == "answering"}
            />
          );
        })}
        {replyStatus == "idle" ? (
          <></>
        ) : (
          <LastMessage
            profileImage={chatbotData?.data.data.profile_image}
            sender={"bot"}
            message={answersStream}
            chunks={chunks}
            isGenerating={replyStatus == "answering"}
          />
        )}
        <div ref={fieldRef}></div>
      </div>
    </>
  );
};

export default MessageList;
