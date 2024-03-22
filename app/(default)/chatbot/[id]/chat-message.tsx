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

  return (
    <div
      onMouseEnter={() => setShowCopy(true)}
      onMouseLeave={() => setShowCopy(false)}
    >
      <div className="flex items-start space-x-4">
        <Image
          src={message.sender == "bot" ? chatbotData?.data.data.profile_image : AvatarDummy}
          alt="User avatar"
          className="w-8 h-8 rounded-full"
          width={50}
          height={50}
        />
        <div className="text-white text-sm w-full">
          <h6 className="mb-5 mt-1 font-semibold">
            {message.sender == "bot" ? chatbotData?.data.data.name : "You"}
          </h6>
          <p className="whitespace-break-spaces">{message.message}</p>
          {message.sender === "bot" && sources.length > 0 && (
            <TweetAnswer chunks={sources} />
          )}
        </div>
      </div>
      <div className="h-[40px] flex items-center justify-end pl-10">
        {showCopy && <CopyButton message={message.message} />}
      </div>
    </div>
  );
};

export default ChatMessage;
