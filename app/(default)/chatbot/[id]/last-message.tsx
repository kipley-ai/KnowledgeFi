import { useChatbotDetail } from "@/hooks/api/chatbot";
import { chatbotIdFromSlug } from "@/utils/utils";
import Image from "next/image";
import { useParams } from "next/navigation";
import AvatarDummy from "public/images/avatar-bot-dummy.svg";
import LoadingIcon from "public/images/loading-icon.svg";
import { useState } from "react";
import TweetAnswer from "./tweet-answer";
import Copy from "@/components/icon/copy.svg"

export const CopyButton = ({ message }: { message: string }) => {
  return (
    <button
      className="absolute top-0 right-0 z-20 text-gray-400 hover:brightness-150"
      onClick={() => {
        navigator.clipboard.writeText(message);
      }}
    >
      <Image
        src={Copy}
        alt="Copy icon"
        className="mr-4"
        width={35}
        height={35}
      />
    </button>
  );
};

const LastAnswer = ({
  profileImage,
  sender,
  message,
  isGenerating,
  chunks = "",
}: {
  profileImage: any;
  sender: string;
  message: string[] | string;
  isGenerating: boolean;
  chunks?: string;
}) => {
  const isStream = Array.isArray(message);
  const { id: slug } = useParams();
  const id = chatbotIdFromSlug(slug.toString());

  const { data: chatbotData, isSuccess: chatbotDetailIsSuccess } =
    useChatbotDetail({
      chatbot_id: id as string,
    });
  const [showCopy, setShowCopy] = useState(false);

  const sources: string[] = [];
  if (chunks) {
    const chunksObject = JSON.parse(chunks);
    chunksObject.chunks.forEach((chunk: any) => {
      sources.push(chunk.metadata.source);
    });
  }

  const trimQuotationMarks = (str: string): string => {
    return str.replace(/"/g, '');
  };

  return (
    <>
      <div
        className="flex flex-col space-y-2"
        onMouseEnter={() => setShowCopy(true)}
        onMouseLeave={() => setShowCopy(false)}
      >
        {/* Loading icon and generating text */}
        {isGenerating && (
          <div className="mb-2 flex items-center gap-6 space-x-3 text-sm text-gray-400">
            <Image
              src={LoadingIcon}
              alt="Profile"
              className="ml-1 h-5 w-5 animate-spin text-white"
              width={50}
              height={50}
            />
            Generating answers for you...
          </div>
        )}
        {/* Message bubble */}
        <div className="flex flex-col space-y-2">
          {/* Message bubble */}
          <div className="relative flex items-start space-x-4">
            <Image
              src={profileImage}
              alt="Profile"
              className="h-7 w-7 md:h-8 md:w-8 rounded-full"
              width={50}
              height={50}
            />
            <div className="w-full text-white">
              <h6 className="mb-1 mt-1 font-black text-lg">
                {chatbotData?.data.data.name}
              </h6>
              <p className="text-sm whitespace-break-spaces break-words">
                {isStream ? message.slice(0, -2).join("") : trimQuotationMarks(message)}
                {/* {sender === "bot" && sources.length > 0 && (
                  <TweetAnswer chunks={sources} />
                )} */}
                {sources.map((source: string, index: number) => (
                  <p key={index}>
                    <a href={source} className="text-xs xs:text-sm hover:underline" target="_blank" rel="noreferrer">{source}</a>
                  </p>
                ))}
              </p>
            </div>
            {showCopy && !isStream && <CopyButton message={message} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default LastAnswer;
