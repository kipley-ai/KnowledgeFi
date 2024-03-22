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
      className="text-gray-400 hover:text-blue-500"
      onClick={() => {
        navigator.clipboard.writeText(message);
      }}
    >
      <Image
        src={Copy}
        alt="Copy icon"
        className="mr-4"
        width={40}
        height={40}
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
    console.log('chunksObjectLastMessage :>> ', chunksObject);
    chunksObject.chunks.forEach((chunk: any) => {
      sources.push(chunk.metadata.source);
    });
  }

  return (
    <>
      <div
        className="flex flex-col space-y-2 pt-5"
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
          <div className="flex items-start space-x-4">
            <Image
              src={profileImage}
              alt="Profile"
              className="h-8 w-8 rounded-full"
              width={50}
              height={50}
            />
            <div className="w-full text-sm text-white">
              <h6 className="mb-5 mt-1 font-semibold">
                {chatbotData?.data.data.name}
              </h6>
              <p className="whitespace-break-spaces break-words">
                {isStream ? message.slice(0, -2).join("") : message}
                {sender === "bot" && sources.length > 0 && (
                  <TweetAnswer chunks={sources} />
                )}
              </p>
            </div>
          </div>

          {/* Interactive buttons */}
          <div className="flex h-[40px] items-center justify-end pl-10">
            {/* Regenerate answer button */}
            {/* Copy button icon */}
            {showCopy && !isStream ? <CopyButton message={message} /> : <></>}
          </div>
        </div>
      </div>
    </>
  );
};

export default LastAnswer;
