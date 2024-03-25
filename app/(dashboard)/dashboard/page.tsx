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
import { useChatbotList, useChatbotExplore } from "@/hooks/api/chatbot";
import { keepPreviousData } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { KF_TITLE } from "@/utils/constants";
import { chatbotSlug } from "@/utils/utils";

import ExploreBanner from "components/banner/explore-banner.png"

export default function Dashboard() {
  const title = KF_TITLE + "Dashboard";

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

  const incrementAmount = 5;
  const [pageSize, setPageSize] = useState(20);

  const botsQuery = useChatbotExplore(
    {
      page: 1,
      page_size: pageSize, // AL: Set this so that we can get the total bots count for proper client side pagination for now
      explore_name: "Chatbots",
    },
    keepPreviousData,
  );

  //console.log(botsQuery.data?.data); //For Debugging Purpose

  const featuredBotsQuery = useChatbotExplore(
    {
      page: 1,
      page_size: 5,
      explore_name: "Featured Chatbots"
    },
  );

  console.log(featuredBotsQuery); //For debugging purpose

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
      setHeaderTitle("AI Chats");
      document.title = title;
    };
  }, [breakpoint, pageSize, botsQuery.isFetching]); // Ensure dependencies are correctly listed

  return (
    <div className="w-full max-w-[96rem] bg-stone-800 px-4 py-8 sm:px-6 lg:px-12">
      <ModalLoginTwitter isOpen={modalLogin} setIsOpen={setModalLogin} />

      {/* Explorer Banner */}
      <Image src={ExploreBanner} alt="" className="w-full" />

      {/* Featured Chatbot */}
      <div className="mt-4">
        <h2 className="text-2xl text-white">Featured Chatbot</h2>
      </div>
      <div className="my-4 flex flex-wrap justify-between gap-y-4 md:gap-3 lg:justify-start">
        {featuredBotsQuery.data?.data?.data
          ? featuredBotsQuery.data.data.data.chatbot_data.map((botData) => {
            return (
              <BotItem
                key={botData.chatbot_id}
                botData={botData}
                onClick={() => { }}
              />
            );
          })
          : null}
      </div>

      {/* Chatbot lists */}
      <div className="mt-4">
        <h2 className="text-2xl text-white">Chatbots</h2>
      </div>
      <div className="my-4 flex flex-wrap justify-between gap-y-4 md:gap-3 lg:justify-start">
        {botsQuery.data?.data.data
          ? botsQuery.data.data.data.chatbot_data.map((botData) => {
            return (
              <BotItem
                key={botData.chatbot_id}
                botData={botData}
                onClick={() => { }}
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
      href={`/chatbot/${chatbotSlug(botData)}`}
      className="group relative flex cursor-pointer flex-col w-full md:w-[20%]"
      onClick={onClick}
    >
      <div className="bg-stone-500 p-2">
        <div
          className="relative w-full pb-[100%] overflow-hidden bg-stone-400"
        >
          <Image
            src={botData.profile_image ?? ""}
            layout="fill"
            objectFit="cover"
            alt="Avatar"
          />
        </div>
      </div>
      <div className="flex-grow bg-stone-500 p-4">
        <div className="text-md font-bold text-white">{botData.name}</div>
      </div>
    </Link>

  );
};
