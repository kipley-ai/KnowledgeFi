import Image from "next/image";
import { CopyButton } from "./last-message";
import { useState } from "react";
import AvatarDummy from "public/images/avatar-user-dummy.svg";

const ChatMessage = ({
  chatbotData,
  message,
}: {
  chatbotData: any;
  message: any;
}) => {
  const [showCopy, setShowCopy] = useState(false);
  return (
    <div
      onMouseEnter={() => setShowCopy(true)}
      onMouseLeave={() => setShowCopy(false)}
    >
      <div className="flex items-start space-x-3 ">
        <Image
          src={message.sender == "bot" ? chatbotData?.data.data.profile_image : AvatarDummy}
          alt="User avatar"
          className="w-8 h-8 rounded-full mr-5"
          width={50}
          height={50}
        />
        <div className="text-white text-sm w-full">
          <h6 className="mb-5 mt-1">
            {message.sender == "bot" ? chatbotData?.data.data.name : "You"}
          </h6>
          <p>{message.message}</p>
        </div>
      </div>
      <div className="h-[40px] flex items-center justify-end pl-10">
        {showCopy && <CopyButton message={message.message} />}
      </div>
    </div>
  );
};

export default ChatMessage;
