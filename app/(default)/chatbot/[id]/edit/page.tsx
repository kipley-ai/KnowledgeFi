"use client";

import React, { useState, useEffect } from "react";
import { useAppProvider } from "@/providers/app-provider";
import ChatBotSettings from "./chatbot-settings";
import ManageDataSources from "./manage-data-source";

export default function EditChatbot() {
    const { setHeaderTitle } = useAppProvider();
    const title = "Edit Chatbot";

    const [activeTab, setActiveTab] = useState('settings');

    useEffect(() => {
        setHeaderTitle(title);
        document.title = title;
        return () => setHeaderTitle("Default Title");
    }, [setHeaderTitle, title]);

    return (
        <div className="flex flex-col justify-center items-center w-full bg-[#292D32] py-10">
            <div className="flex flex-col w-3/5">
                <div className="flex w-full bg-[#181B1F] p-1 rounded-xl border-2 border-[#393E44]">
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`w-1/2 text-white font-semibold py-2 px-6 rounded-lg ${activeTab === 'settings' ? 'bg-[#292D32]' : 'hover:bg-[#292D32]'} focus:outline-none shadow mr-1`}
                    >
                        Chatbot Settings
                    </button>
                    <button
                        onClick={() => setActiveTab('dataSources')}
                        className={`w-1/2 text-white font-semibold py-2 px-6 rounded-lg ${activeTab === 'dataSources' ? 'bg-[#292D32]' : 'hover:bg-[#292D32]'} focus:outline-none shadow`}
                    >
                        Manage Data Sources
                    </button>
                </div>
                {activeTab === 'settings' && <ChatBotSettings />}
                {activeTab === 'dataSources' && <ManageDataSources />}
            </div>
        </div>
    );
}
