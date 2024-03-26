import Image from "next/image";
import { CopyButton } from "./last-message";
import { useState } from "react";
import AvatarDummy from "public/images/avatar-default-02.svg";
import TweetAnswer from "./tweet-answer";

const ChatMessage = ({
  chatbotData,
  message,
}: {
  chatbotData: any;
  message: any;
}) => {
  const [showCopy, setShowCopy] = useState(false);

  const sources: string[] = [];
  if (message.chunks) {
    const chunksObject = JSON.parse(message.chunks);
    chunksObject.chunks.forEach((chunk: any) => {
      sources.push(chunk.metadata.source);
    });
  }

  const trimQuotationMarks = (str: string): string => {
    return str.replace(/"/g, '');
  };

  return (
    <div
      onMouseEnter={() => setShowCopy(true)}
      onMouseLeave={() => setShowCopy(false)}
    >
      <div className="relative flex items-start space-x-4">
        <Image
          src={message.sender == "bot" ? chatbotData?.data.data.profile_image : AvatarDummy}
          alt="User avatar"
          className="w-8 h-8 rounded-full"
          width={50}
          height={50}
        />
        <div className="w-full text-white">
          <h6 className="mb-2 mt-1 font-black text-lg">
            {message.sender == "bot" ? chatbotData?.data.data.name : "You"}
          </h6>
          <p className="whitespace-break-spaces text-sm">{trimQuotationMarks(message.message)}</p>
          {/* {message.sender === "bot" && sources.length > 0 && (
            <TweetAnswer chunks={sources} />
          )} */}
          {sources.map((source: string, index: number) => (
            <p key={index}>
              <a href={source} className="text-sm hover:underline" target="_blank" rel="noreferrer">{source}</a>
            </p>
          ))}
        </div>
        {showCopy && <CopyButton message={message.message} />}
      </div>
    </div>
  );
};

export default ChatMessage;
