"use client";
import Header from "./header";
import MessageList from "./chat-messages";
import MessageInput from "./message-input";
import { useAppProvider } from "@/providers/app-provider";
import { useEffect } from "react";
import { useNftDetail } from "@/hooks/api/nft";
import { useParams, usePathname } from "next/navigation";
import { useChatHistory, useChatSession, useChatboxWS } from "@/hooks/api/chatbox";
import { CreateChatbotProvider } from "./create-chatbot-context";
import { useChatbotDetail } from "@/hooks/api/chatbot";

export default function ChatBotPage() {
	const { setHeaderTitle } = useAppProvider();
	const pathname = usePathname();
	

	useEffect(() => {
		setHeaderTitle("Chatbot"); // Set the title when the component is mounted
		console.log(pathname.split("/").pop());

		// Optional: Reset the title when the component is unmounted
		return () => setHeaderTitle("Default Title");
	}, []); // Empty dependency array to run only once on mount

	return (
		<div className="flex flex-col sm:px-6 lg:px-56 py-8 bg-[#292D32]">
			<CreateChatbotProvider>
				<Header />
				<MessageList />
				<MessageInput />
			</CreateChatbotProvider>
		</div>
	);
}
