import { useChatbotDetail } from "@/hooks/api/chatbot";
import Image from "next/image";
import { useParams } from "next/navigation";
import AvatarDummy from "public/images/avatar-bot-dummy.svg";
import LoadingIcon from "public/images/loading-icon.svg";
import { useState } from "react";

export const CopyButton = ({ message }: { message: string }) => {
  return (
    <button
      className="text-gray-400 hover:text-blue-500"
      onClick={() => {
        navigator.clipboard.writeText(message);
      }}
    >
      {/* Insert copy icon here */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.75"
          y="0.75"
          width="38.5"
          height="38.5"
          rx="11.25"
          stroke="#393E44"
          stroke-width="1.5"
        />
        <g clip-path="url(#clip0_201_31)">
          <path
            d="M18.7498 11.669C18.1873 11.6766 17.8496 11.7092 17.5765 11.8483C17.2629 12.0081 17.0079 12.2631 16.8482 12.5767C16.709 12.8498 16.6765 13.1875 16.6688 13.75M26.2498 11.669C26.8124 11.6766 27.1501 11.7092 27.4232 11.8483C27.7368 12.0081 27.9917 12.2631 28.1515 12.5767C28.2906 12.8498 28.3232 13.1875 28.3308 13.75M28.3308 21.25C28.3232 21.8126 28.2907 22.1503 28.1515 22.4233C27.9917 22.7369 27.7368 22.9919 27.4232 23.1517C27.1501 23.2908 26.8124 23.3234 26.2498 23.331M28.3332 16.6667V18.3333M21.6665 11.6667H23.3331M14.3332 28.3334H20.6665C21.5999 28.3334 22.0666 28.3334 22.4232 28.1517C22.7368 27.9919 22.9917 27.7369 23.1515 27.4233C23.3332 27.0668 23.3332 26.6001 23.3332 25.6667V19.3334C23.3332 18.3999 23.3332 17.9332 23.1515 17.5767C22.9917 17.2631 22.7368 17.0081 22.4232 16.8483C22.0666 16.6667 21.5999 16.6667 20.6665 16.6667H14.3332C13.3997 16.6667 12.933 16.6667 12.5765 16.8483C12.2629 17.0081 12.0079 17.2631 11.8482 17.5767C11.6665 17.9332 11.6665 18.3999 11.6665 19.3334V25.6667C11.6665 26.6001 11.6665 27.0668 11.8482 27.4233C12.0079 27.7369 12.2629 27.9919 12.5765 28.1517C12.933 28.3334 13.3997 28.3334 14.3332 28.3334Z"
            stroke="#7C878E"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_201_31">
            <rect
              width="20"
              height="20"
              fill="white"
              transform="translate(10 10)"
            />
          </clipPath>
        </defs>
      </svg>
    </button>
  );
};

const LastAnswer = ({
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
        {isGenerating && (
          <div className="flex gap-6 items-center text-gray-400 text-sm mb-2 space-x-3">
            <Image
              src={LoadingIcon}
              alt="Profile"
              className="animate-spin h-5 w-5 ml-1 text-white"
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
              className="w-8 h-8 rounded-full"
              width={50}
              height={50}
            />
            <div className="text-white text-sm w-full">
              <h6 className="mb-5 mt-1 font-semibold">{chatbotData?.data.data.name}</h6>
              <p className="whitespace-break-spaces">{isStream ? message.slice(0, -2).join("") : message}</p>
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

export default LastAnswer;
