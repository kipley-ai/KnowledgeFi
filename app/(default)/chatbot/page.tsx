"use client";
import Header from "./header";
import MessageList from "./chat-messages";
import MessageInput from "./message-input";
import { useAppProvider } from "@/app/app-provider";
import { useEffect } from "react";

export default function ChatBotPage() {
    const { setHeaderTitle } = useAppProvider();

    useEffect(() => {
        setHeaderTitle("Chatbot"); // Set the title when the component is mounted

        // Optional: Reset the title when the component is unmounted
        return () => setHeaderTitle("Default Title");
    }, []); // Empty dependency array to run only once on mount

    return (
        <div className="flex flex-col sm:px-6 lg:px-8 py-8 bg-[#292D32]">
            <Header />
            <MessageList />
            <MessageInput />
        </div>
    )
}