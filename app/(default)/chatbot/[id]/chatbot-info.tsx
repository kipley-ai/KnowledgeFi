import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useChatbotDetail } from "@/hooks/api/chatbot";
import { useNftDetail } from "@/hooks/api/nft";

import "./chat-messages.css";
import { chatbotIdFromSlug } from "@/utils/utils";

const ChatbotInfo = ({setIsOpen}: {setIsOpen: (isOpen: boolean) => void;}) => {
  const { id: slug } = useParams();
  const id = chatbotIdFromSlug(slug.toString());
  const router = useRouter();

  const { data: chatbotData } = useChatbotDetail({
    chatbot_id: id as string,
  });

  const { data: nftData } = useNftDetail({
    sft_id: chatbotData?.data.data.sft_id as string,
  });

  const nftOpenSeaLink = `${process.env.NEXT_PUBLIC_OPENSEA_URL}/${nftData?.data.data.sft_address}`;

  return (
    <div className="flex w-full items-start gap-4">
      <button
        onClick={() => router.back()}
        className="text-2xl text-white focus:outline-none"
      >
        <Image
          src={"/images/corner-up-left.png"}
          alt="icon"
          width={24}
          height={24}
        />
      </button>
      <div className="mb-2 flex w-full flex-col divide-y-2 divide-aqua-700 border-2 border-aqua-700">
        <div className="flex flex-row justify-between px-6 py-2">
          <h1
            className="font-semibold text-aqua-700 md:text-2xl"
            style={{
              textShadow: "0 0 10px #01F7FF",
            }}
          >
            {chatbotData?.data.data.name}
          </h1>
          <button 
            className="flex flex-row items-center space-x-3 bg-[#1E1E1E] px-4 rounded-md text-white"
            type="button"
            onClick={() => setIsOpen(true)}
          >
            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5.33333 1.83329V0.5H6.66667V1.83329L8.00006 1.83329V3.16663L9.33333 3.16663V4.49996H8V3.16663L6.66667 3.16663L6.66667 9.83333H5.33333L5.33333 3.16663H4.00008V4.49996H2.66675V3.16663H4.00006V1.83329L5.33333 1.83329ZM0 8.5V11.1666L5.96046e-08 12.5L1.78814e-07 12.5H1.33333V12.5L10.6667 12.5V12.5H12L12 12.5V11.1666L12 8.5H10.6667V11.1666L1.33333 11.1666L1.33333 8.5H0Z" fill="#01F7FF"/>
            </svg>
            <p>Share</p>
          </button>
        </div>
        <div className="relative flex flex-col gap-2 px-6 py-4">
          <div className="relative z-10 flex items-center gap-8">
            <Image
              src={chatbotData?.data.data.profile_image as string}
              alt="Profile"
              className="rounded-full border-2 border-aqua-700"
              style={{ boxShadow: "0 0 10px #01F7FF" }}
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
                  className=" border-2 border-aqua-700"
                  style={{ boxShadow: "0 0 10px #01F7FF" }}
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
          <div className="box absolute bottom-0 left-20 top-0 m-auto h-3/6 w-7/12 bg-transparent sm:w-9/12 xl:w-10/12"></div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotInfo;
