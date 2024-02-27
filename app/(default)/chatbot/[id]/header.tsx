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
    <div className="sticky top-0 flex items-center justify-between border-b border-b-gray-600 py-3 text-white lg:-top-8 xl:py-5">
      <div className="flex items-center gap-5">
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
          <svg
            width="20"
            height="20"
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
