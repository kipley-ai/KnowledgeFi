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
import { useCreateChatbotContext } from "./create-chatbot-context";
import SidebarRight from "@/components/ui/sidebar-right";
import Description from "./description";
import CreditBalance from "./credit-balance";

const archivo = Archivo({
  weight: ["400", "600"],
  subsets: ["latin"],
});

const Header = () => {
  const { buttonSession, setButtonSession } = useCreateChatbotContext();

  const newSession = useNewSession();
  const { id } = useParams();
  const router = useRouter();

  const { data: chatbotData, isSuccess: chatbotDetailIsSuccess } =
    useChatbotDetail({
      chatbot_id: id as string,
    });

  const title = chatbotData?.data.data.name + " - Chatbot";

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
    <div className="sticky top-0 lg:-top-8 flex items-center justify-between bg-stone-800 border-b border-b-gray-600 text-white py-3 xl:py-6">
      <div className="flex items-center gap-5">
        <button
          onClick={() => router.back()}
          className="text-2xl text-white focus:outline-none"
        >
          <svg
            width="26"
            height="12"
            viewBox="0 0 26 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.02001 6.79012C7.10637 6.79012 6.36572 7.53077 6.36572 8.44441C6.36572 9.35805 7.10637 10.0987 8.02001 10.0987L24.3456 10.0987C25.2593 10.0987 25.9999 9.35805 25.9999 8.44441C25.9999 7.53077 25.2593 6.79011 24.3456 6.79011L8.02001 6.79012Z"
              fill="#01F7FF"
            />
            <path
              d="M7.06796 6.99072C6.47814 7.63676 6.47814 8.6842 7.06796 9.33024C7.65778 9.97628 8.61406 9.97628 9.20388 9.33024L13.6053 4.50928C14.1951 3.86324 14.1951 2.8158 13.6053 2.16976C13.0155 1.52372 12.0592 1.52372 11.4694 2.16976L7.06796 6.99072Z"
              fill="#01F7FF"
            />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <Image
            src={chatbotData?.data.data.profile_image as string}
            alt="Profile"
            className="h-8 w-8 rounded-full"
            width={50}
            height={50}
          />
          <h1 className={`md:text-xl ${archivo.className} font-semibold`}>
            {chatbotData?.data.data.name}
          </h1>
        </div>
      </div>
      <div className="flex justify-between">
        {/* <button className="flex items-center justify-center rounded-3xl p-2 px-5 border-2 border-[#393E44]" type="submit">
                    <h5 className="text-[#7C878E] font-semibold flex-grow pr-2">Share</h5>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.3261 9.50616C16.5296 9.33179 16.6313 9.24461 16.6686 9.14086C16.7013 9.04979 16.7013 8.95019 16.6686 8.85913C16.6313 8.75538 16.5296 8.66819 16.3261 8.49382L9.26719 2.4433C8.917 2.14314 8.74191 1.99306 8.59367 1.98938C8.46483 1.98618 8.34177 2.04278 8.26035 2.14268C8.16667 2.25763 8.16667 2.48824 8.16667 2.94947V6.52885C6.38777 6.84006 4.75966 7.74146 3.54976 9.09488C2.23069 10.5704 1.50103 12.4799 1.5 14.4591V14.9691C2.37445 13.9157 3.46626 13.0638 4.70063 12.4716C5.78891 11.9495 6.96535 11.6403 8.16667 11.5588V15.0505C8.16667 15.5117 8.16667 15.7424 8.26035 15.8573C8.34177 15.9572 8.46483 16.0138 8.59367 16.0106C8.74191 16.0069 8.917 15.8568 9.26719 15.5567L16.3261 9.50616Z" stroke="#7C878E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button> */}
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
          <div className="rounded-full border-2 border-gray-500 p-2 font-semibold">
            <Image width={16} height={16} src={Refresh} alt="Refresh" />
          </div>
          {/* <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="rounded-full"
                    >
                        <circle
                            cx="20"
                            cy="20"
                            r="18.5"
                            stroke="#393E44"
                            stroke-width="2"
                        />
                        <g clip-path="url(#clip0_201_34)">
                            <path
                                d="M19.1665 11.6667L21.6665 14.1667M21.6665 14.1667L19.1665 16.6667M21.6665 14.1667H15.6665C14.2664 14.1667 13.5663 14.1667 13.0315 14.4392C12.5611 14.6789 12.1787 15.0613 11.939 15.5317C11.6665 16.0665 11.6665 16.7666 11.6665 18.1667V22.9167C11.6665 23.3037 11.6665 23.4972 11.6879 23.6597C11.8356 24.7815 12.7184 25.6643 13.8402 25.812C14.0026 25.8334 14.1962 25.8334 14.5832 25.8334M18.3332 25.8334H24.3332C25.7333 25.8334 26.4334 25.8334 26.9681 25.5609C27.4386 25.3212 27.821 24.9387 28.0607 24.4683C28.3332 23.9336 28.3332 23.2335 28.3332 21.8334V17.0834C28.3332 16.6963 28.3332 16.5028 28.3118 16.3404C28.1641 15.2185 27.2813 14.3358 26.1595 14.1881C25.997 14.1667 25.8035 14.1667 25.4165 14.1667M18.3332 25.8334L20.8332 28.3334M18.3332 25.8334L20.8332 23.3334"
                                stroke="#7C878E"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_201_34">
                                <rect
                                    width="20"
                                    height="20"
                                    fill="white"
                                    transform="translate(10 10)"
                                />
                            </clipPath>
                        </defs>
                    </svg> */}
        </button>
        <button
          className="ml-4 rounded-2xl border border-2 border-gray-500 px-3 text-base text-gray-400 md:hidden"
          onClick={toggleSidebar}
        >
          Info
        </button>
      </div>
      <SidebarRight isOpen={isSidebarOpen} onClose={closeSidebar}>
        <Description />
        <CreditBalance />
      </SidebarRight>
    </div>
  );
};

export default Header;
