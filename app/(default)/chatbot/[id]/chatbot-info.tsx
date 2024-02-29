import Image from "next/image";
import { useParams } from "next/navigation";
import { useChatbotDetail } from "@/hooks/api/chatbot";
import { useNftDetail } from "@/hooks/api/nft";

import "./chat-messages.css";

const ChatbotInfo = () => {
  const { id } = useParams();

  const { data: chatbotData } = useChatbotDetail({
    chatbot_id: id as string,
  });

  const { data: nftData } = useNftDetail({
    sft_id: chatbotData?.data.data.sft_id as string,
  });
  
  const nftOpenSeaLink = `${process.env.NEXT_PUBLIC_OPENSEA_URL}/${nftData?.data.data.sft_address}`;

  return (
    <div className="box mb-2 flex w-full flex-col divide-y-2 divide-aqua-700">
      <div className="px-6">
        <h1
          className="font-semibold text-aqua-700 md:text-2xl"
          style={{
            textShadow: "0 0 10px #01F7FF",
          }}
        >
          {chatbotData?.data.data.name}
        </h1>
      </div>
      <div className="relative flex flex-col gap-2 px-6 py-4">
        <div className="relative z-10 flex items-center gap-8">
          <Image
            src={chatbotData?.data.data.profile_image as string}
            alt="Profile"
            className="rounded-full"
            width={100}
            height={100}
          />
          <p className="line-clamp-4 text-sm">
            {chatbotData?.data.data.description}
          </p>
        </div>
        <div className="relative z-10 flex justify-end">
          <div className="relative">
            <a href={nftOpenSeaLink} target="_blank">
              <Image
                src={nftData?.data.data.profile_image as string}
                alt="Profile"
                className=""
                width={100}
                height={100}
              />
              <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center opacity-0 transition-opacity duration-300 hover:bg-gray-900/75 hover:opacity-100">
                <p className="text-center text-sm font-bold text-white lg:text-lg">
                  View SFT on OpenSea
                </p>
              </div>
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-20 top-0 m-auto h-3/6 w-7/12 border-b-2 border-l-2 border-aqua-700 bg-transparent sm:w-9/12 xl:w-10/12"></div>
      </div>
    </div>
  );
};

export default ChatbotInfo;
