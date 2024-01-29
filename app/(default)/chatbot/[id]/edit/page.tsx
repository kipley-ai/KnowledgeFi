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
        <div className="App">
            <div className="flex flex-col sm:px-6 lg:px-0 justify-center items-center bg-[#292D32] p-4 w-full shadow-md">
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`text-white font-semibold py-2 px-6 rounded-lg ${activeTab === 'settings' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'} focus:outline-none shadow`}
                    >
                        Chatbot Settings
                    </button>
                    <button
                        onClick={() => setActiveTab('dataSources')}
                        className={`text-white font-semibold py-2 px-6 rounded-lg ${activeTab === 'dataSources' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'} focus:outline-none shadow`}
                    >
                        Manage Data Sources
                    </button>
                </div>
            </div>
            {activeTab === 'settings' && <ChatBotSettings />}
            {activeTab === 'dataSources' && <ManageDataSources />}
        </div>
    );
}
