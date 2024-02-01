import { useChatbotDetail } from "@/hooks/api/chatbot";
import Image from "next/image";
import { useParams } from "next/navigation";
import AvatarDummy from "public/images/avatar-bot-dummy.svg";
import LoadingIcon from "public/images/loading-icon.svg";
import { useState } from "react";
import { CopyButton } from "./last-message";

const FirstAnswer = ({
  profileImage,
  sender,
  message,
  isGenerating,
}: {
  profileImage: any;
  sender: string;
  message: string[] | string;
  isGenerating: boolean;
}) => {
  const isStream = Array.isArray(message);
  const { id } = useParams();
  const { data: chatbotData, isSuccess: chatbotDetailIsSuccess } =
    useChatbotDetail({
      chatbot_id: id as string,
    });
  const [showCopy, setShowCopy] = useState(false);
  return (
    <>
      <div
        className="flex flex-col space-y-2 pt-5"
        onMouseEnter={() => setShowCopy(true)}
        onMouseLeave={() => setShowCopy(false)}
      >
        {/* Loading icon and generating text */}
        {/* {isGenerating && (
					<div className="flex items-center text-gray-400 text-sm mb-2 space-x-3">
						<Image src={LoadingIcon} alt="Profile" className="animate-spin mr-10 h-5 w-5 ml-1 text-white" />
						Generating answers for you...
					</div>
				)} */}
        {/* Message bubble */}
        <div className="flex flex-col space-y-2">
          {/* Message bubble */}
          <div className="flex items-start space-x-3">
            <Image
              src={profileImage}
              alt="Profile"
              className="w-8 h-8 rounded-full mr-5"
              width={50}
              height={50}
            />
            <div className="text-white text-sm w-full">
              <h6 className="mb-5 mt-1">{chatbotData?.data.data.name}</h6>
              <p>{isStream ? message.slice(0, -2).join("") : message}</p>
            </div>
          </div>

          {/* Interactive buttons */}
          <div className="h-[40px] flex items-center justify-end pl-10">
            {/* Regenerate answer button */}
            {/* Copy button icon */}
            {showCopy && !isStream ? <CopyButton message={message} /> : <></>}
          </div>
        </div>
      </div>
    </>
  );
};

export default FirstAnswer;
