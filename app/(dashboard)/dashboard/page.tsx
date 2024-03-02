"use client";

import WelcomeBanner from "./welcome-banner";
import DashboardAvatars from "./dashboard-avatars";
import FilterButton from "@/components/dropdown-filter";
import Datepicker from "@/components/datepicker";
import DashboardCard01 from "./dashboard-card-01";
import DashboardCard02 from "./dashboard-card-02";
import DashboardCard03 from "./dashboard-card-03";
import DashboardCard04 from "./dashboard-card-04";
import DashboardCard05 from "./dashboard-card-05";
import DashboardCard06 from "./dashboard-card-06";
import DashboardCard07 from "./dashboard-card-07";
import DashboardCard08 from "./dashboard-card-08";
import DashboardCard09 from "./dashboard-card-09";
import DashboardCard10 from "./dashboard-card-10";
import DashboardCard11 from "./dashboard-card-11";
import Switcher from "@/components/switcher";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import chat_image from "@/public/images/chat-image.png";
import Image from "next/image";
import ModalLoginTwitter from "@/components/modal-login-twitter";
import { useAppProvider } from "@/providers/app-provider";
import { getBreakpoint } from "@/components/utils/utils";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { accounts } from "@/components/utils/twitter-account";
import { useChatSession } from "@/hooks/api/chatbox";
import { useUserDetail } from "@/hooks/api/user";
import { ChatbotData } from "@/lib/types";
import { LoadMore, LoadMoreSpinner } from "@/components/load-more";
import { useChatbotList } from "@/hooks/api/chatbot";
import { keepPreviousData } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

  const loadMoreRef = useRef(null);

  const chatSessionAPI = useChatSession({
    user_id: "test",
    app_id: "test",
    page_num: 1,
    page_size: 10,
    // request_url:
    //   appDetail?.data?.data.data.app_info.plugin_meta_data.chat_session_api
    //     .request_url,
  });

  const incrementAmount = 6;
  const [pageSize, setPageSize] = useState(20);

  const botsQuery = useChatbotList(
    {
      page: 1,
      page_size: pageSize, // AL: Set this so that we can get the total bots count for proper client side pagination for now
      sort_by: "created_at",
    },
    keepPreviousData,
  );

  const [hasMoreBots, setHasMoreBots] = useState(true);

  const handleLoadMore = (e: React.MouseEvent) => {
    setPageSize((prevSize) => prevSize + incrementAmount);
  };

  useEffect(() => {
    // Setup for window resize event listener and IntersectionObserver as before

    const observer = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries[0].isIntersecting;
        const totalBots = botsQuery.data?.data.data.chatbot_count ?? 0; // Use ?? to provide a default value

        // Check conditions before loading more items
        if (isIntersecting && !botsQuery.isFetching && pageSize < totalBots) {
          console.log("Loading more items"); // For debugging
          setPageSize((prevSize) => prevSize + incrementAmount);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    // Cleanup function remains the same
    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
      window.removeEventListener("resize", handleBreakpoint);
      setHeaderTitle("Explore");
      document.title = title;
    };
  }, [breakpoint, pageSize, botsQuery.isFetching]); // Ensure dependencies are correctly listed

  return (
    <div className="w-full max-w-[96rem] bg-stone-800 px-4 py-8 sm:px-6 lg:px-12">
      <ModalLoginTwitter isOpen={modalLogin} setIsOpen={setModalLogin} />
      {/* <Switcher
        texts={["All", "Technology", "Crypto", "Celebrities", "Others"]}
        mode={mode}
        setWhich={setMode}
      /> */}

      {/* <div>
					<Image
						className="h-full w-full cursor-pointer"
						alt="chat"
						src={chat_image}
						onClick={()=>setModalLogin(true)}/>
					</div> */}

      {/* <div className="grid-cols-4 gap-4 mx-[-22px] my-[8px]"> */}
      <div className="my-8 flex flex-wrap justify-between gap-y-8 md:gap-6 lg:justify-start">
        {/* <div className="grid grid-cols-6"> */}
        {botsQuery.data?.data.data
          ? botsQuery.data.data.data.chatbot_data.map((botData) => {
              return (
                <BotItem
                  key={botData.chatbot_id}
                  botData={botData}
                  onClick={() => {}}
                />
              );
            })
          : null}
      </div>

      <div ref={loadMoreRef} className="mb-8">
        {botsQuery.isFetching && <LoadMoreSpinner />}
      </div>
    </div>
  );
}

const BotItem = ({
  botData,
  onClick,
}: {
  botData: ChatbotData;
  onClick: (e: React.MouseEvent) => void;
}) => {
  return (
    <Link
      href={`/chatbot/${botData.chatbot_id}`}
      className="relative flex w-[calc(50dvw-30px)] cursor-pointer flex-col md:w-[155px]"
    >
      <div className="absolute right-px top-[5px] h-[60px] w-[60px] rounded-2xl bg-apricot-700"></div>
      <div
        className="rounded-tl-3xl bg-stone-500 p-2"
        style={{ clipPath: "url(#polygonPhoto)" }}
      >
        <div
          className="relative h-[138px] overflow-hidden rounded-[18px] bg-stone-400"
          style={{ clipPath: "url(#polygonPhoto)" }}
          onClick={onClick}
        >
          <Image
            src={botData.profile_image ?? ""}
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
        onClick={onClick}
      >
        <div className="text-md font-bold text-neutral-300">{botData.name}</div>
      </div>
    </Link>
  );
};
