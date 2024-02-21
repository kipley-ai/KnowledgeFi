"use client";

import Switcher from "@/components/switcher";
import { useEffect, useState } from "react";
import chat_image from "@/public/images/chat-image.png";
import Image from "next/image";
import ModalLoginTwitter from "@/components/modal-login-twitter";
import { useAppProvider } from "@/providers/app-provider";
import { getBreakpoint } from "@/components/utils/utils";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { accounts } from "@/components/utils/twitter-account";
import { useChatSession } from "@/hooks/api/chatbox";

export default function Dashboard() {
  const title = "Dashboard";

  const { setHeaderTitle } = useAppProvider();
  const [mode, setMode] = useState(0);
  const [breakpoint, setBreakpoint] = useState<string | undefined>(
    getBreakpoint(),
  );

  const handleBreakpoint = () => {
    setBreakpoint(getBreakpoint());
  };
  const { modalLogin, setModalLogin } = useAppProvider();

  useEffect(() => {
    window.addEventListener("resize", handleBreakpoint);
    setHeaderTitle("Dashboard"); // Set the title when the component is mounted

    // Optional: Reset the title when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleBreakpoint);
      setHeaderTitle("Default Title");

      document.title = title;
    };
  }, [breakpoint]);

  const chatSessionAPI = useChatSession({
    user_id: "test",
    app_id: "test",
    page_num: 1,
    page_size: 10,
    // request_url:
    //   appDetail?.data?.data.data.app_info.plugin_meta_data.chat_session_api
    //     .request_url,
  });

  return (
    <div className="w-full bg-stone-800">
      <ModalLoginTwitter isOpen={modalLogin} setIsOpen={setModalLogin} />
      <div className="w-full max-w-[96rem] px-4 py-8 sm:px-6 lg:px-12 ">
        <Switcher
          texts={["All", "Custom", "Custom", "Custom", "Custom"]}
          mode={mode}
          setWhich={setMode}
        />

        {/* <div>
					<Image
						className="h-full w-full cursor-pointer"
						alt="chat"
						src={chat_image}
						onClick={()=>setModalLogin(true)}/>
					</div> */}

        {/* <div className="grid-cols-4 gap-4 mx-[-22px] my-[8px]"> */}
        <div className="justify-left my-[8px] flex w-full flex-wrap">
          {/* <div className="grid grid-cols-6"> */}
          {accounts.map((person, index) => (
            // <div className="col-span-2">
            <AnimationOnScroll
              className="relative flex w-[100px] cursor-pointer flex-col"
              // style={{ flex: '0 0 calc(16.667% - 44px)', width: 'calc(16.667% - 44px)', margin: '27px 11px 0' }}
              // style={{ flex: '0 0 175px', width: 'calc(16.667% - 44px)', margin: '27px 11px 0' }}
              style={{ width: "155px", margin: "27px 22px 0 0" }}
              initiallyVisible
              key={index}
              animateOnce
            >
              <div className="absolute right-px top-[5px] h-[60px] w-[60px] rounded-2xl bg-apricot-700"></div>
              <div
                className="rounded-tl-3xl bg-stone-500 p-2"
                style={{ clipPath: "url(#polygonPhoto)" }}
              >
                <div
                  className="relative h-[138px] overflow-hidden rounded-[18px] bg-stone-400"
                  style={{ clipPath: "url(#polygonPhoto)" }}
                  onClick={() => setModalLogin(true)}
                >
                  <Image
                    src={person.image}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="138px"
                    alt="Avatar"
                  />
                </div>
                <svg width="0" height="0" className="block">
                  <clipPath id="polygonPhoto" clipPathUnits="objectBoundingBox">
                    <path d="M1 1V.215C1 .196.993.177.98.162L.851.023C.838.008.819 0 .8 0H0v1" />
                  </clipPath>
                </svg>
              </div>
              <div
                className="grow rounded-bl-3xl rounded-br-3xl bg-stone-500"
                style={{
                  padding: "16px 16px 20px",
                  overflowWrap: "break-word",
                }}
                onClick={() => setModalLogin(true)}
              >
                <div className="text-md font-bold text-neutral-300">
                  {person.name}
                </div>
              </div>
            </AnimationOnScroll>
            // </div>
          ))}
        </div>

        <div className="flex justify-center py-4">
          <button>
            <div className="flex items-center rounded-xl border-2 border-stone-900 px-5 py-3">
              <span className="text-center text-[15px] font-bold text-neutral-300">
                Load more
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
