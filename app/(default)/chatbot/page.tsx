"use client";
import Header from "./header";
import MessageList from "./chat-messages";
import MessageInput from "./message-input";

export default function ChatBotPage() {
    return (
        <div className="flex flex-col sm:px-6 lg:px-8 py-8 bg-[#292D32]">
            <Header />
            <MessageList />
            <MessageInput />
        </div>
    )
}