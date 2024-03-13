import {
  useChatbotDetail,
  useGetSession,
  useNewSession,
} from "@/hooks/api/chatbot";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import ProfileImageDummy from "public/images/avatar-bot-dummy.svg";
import Refresh from "public/images/refresh.png";
import { Archivo } from "next/font/google";
import { useChatHistory } from "@/hooks/api/chatbox";
import { useNftDetail } from "@/hooks/api/nft";
import { useCreateChatbotContext } from "./create-chatbot-context";
import SidebarRight from "@/components/ui/sidebar-right";
import Description from "./description";
import CreditBalance from "./credit-balance";
import { KF_TITLE } from "@/utils/constants";
import { chatbotIdFromSlug } from "@/utils/utils";

const archivo = Archivo({
  weight: ["400", "600"],
  subsets: ["latin"],
});

const Header = () => {
  const { buttonSession, setButtonSession } = useCreateChatbotContext();

  const newSession = useNewSession();
  const { id: slug } = useParams();
  const id = chatbotIdFromSlug(slug.toString());

  const router = useRouter();

  const { data: chatbotData, isSuccess: chatbotDetailIsSuccess } =
    useChatbotDetail({
      chatbot_id: id as string,
    });

  const { data: nftData, isSuccess: nftDetailIsSuccess } = useNftDetail({
    sft_id: chatbotData?.data.data.sft_id as string,
  });

  const title = KF_TITLE + chatbotData?.data.data.name + " - Chatbot";

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    console.log(chatbotData?.data.data.name);
  }, [chatbotDetailIsSuccess]);

  useEffect(() => {
    console.log(nftData?.data.data);
  }, [nftDetailIsSuccess]);

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

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between py-3 lg:-top-8 xl:py-4">
      <div className="flex w-full flex-col gap-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
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
            <h1 className="font-semibold text-aqua-700">
              EXPLORE THE POSSIBILITIES OF AI CHAT
            </h1>
          </div>
          {/* <div>
            <button
              className="ml-3 self-end rounded-full text-gray-400 hover:text-blue-500"
              onClick={() => {
                newSession.mutate(
                  { chatbot_id: id as string },
                  {
                    onSuccess(data, variables, context) {
                      chatSession.refetch();
                      chatHistoryAPI.refetch();
                      setButtonSession((prev: boolean) => !prev);
                    },
                  },
                );
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14 0H12V2H14V4H2V6H0V11H2V6H14V8H12V10H14V8H16V6H18V4H16V2H14V0ZM4 18H6V20H8V18H6V16H18V14H20V9H18V14H6V12H8V10H6V12H4V14H2V16H4V18Z"
                  fill="#6B7280"
                />
              </svg>
            </button>
            <button
              className="ml-4 rounded-2xl border border-2 border-gray-500 px-3 text-base text-gray-400 md:hidden"
              onClick={toggleSidebar}
            >
              Info
            </button>
          </div> */}
        </div>
      </div>
      {/* <SidebarRight isOpen={isSidebarOpen} onClose={closeSidebar}>
        <Description />
        <CreditBalance />
      </SidebarRight> */}
    </div>
  );
};

export default Header;
