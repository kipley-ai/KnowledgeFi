"use client";

import React, { useState, useEffect } from "react";
import { useAppProvider } from "@/providers/app-provider";
import ChatBotSettings from "./chatbot-settings";
import ManageDataSources from "./manage-data-source";

import { useRouter } from "next/navigation";
import { useUserDetail } from "@/hooks/api/user";
import { KF_TITLE } from "@/utils/constants";

export default function EditChatbot() {
  const { setHeaderTitle } = useAppProvider();
  const title = KF_TITLE + "Edit Chatbot";

  const [activeTab, setActiveTab] = useState("settings");

  useEffect(() => {
    setHeaderTitle(title);
    document.title = title;
    return () => setHeaderTitle("Default Title");
  }, [setHeaderTitle, title]);

  return (
    <div className="flex w-full flex-col items-center justify-center bg-[#292D32] py-10">
      <div className="flex w-4/5 flex-col">
        <div className="flex w-full rounded-xl border-2 border-[#393E44] bg-[#181B1F] p-1">
          <button
            onClick={() => setActiveTab("settings")}
            className={`w-1/2 rounded-lg px-6 py-2 font-semibold text-white ${activeTab === "settings" ? "bg-[#292D32]" : "hover:bg-[#292D32]"} mr-1 shadow focus:outline-none`}
          >
            Chatbot Settings
          </button>
          <button
            onClick={() => setActiveTab("dataSources")}
            className={`w-1/2 rounded-lg px-6 py-2 font-semibold text-white ${activeTab === "dataSources" ? "bg-[#292D32]" : "hover:bg-[#292D32]"} shadow focus:outline-none`}
          >
            Manage Data Sources
          </button>
        </div>
        {activeTab === "settings" && <ChatBotSettings />}
        {activeTab === "dataSources" && <ManageDataSources />}
      </div>
    </div>
  );
}
