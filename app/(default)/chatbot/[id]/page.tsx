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
import Description from "./description";
import CreditBalance from "./credit-balance";

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
		<div className="flex flex-row divide-x-2 divide-[#393E44]">
			<div className="flex flex-col sm:px-6 lg:px-16 py-8 bg-[#292D32] w-3/4">
				<CreateChatbotProvider>
					<Header />
					<MessageList />
					<MessageInput />
				</CreateChatbotProvider>
			</div>
			<div className="flex flex-col w-1/4 items-center bg-[#292D32] py-7 divide-y-2 divide-[#393E44]">
				<Description />
				<CreditBalance />
			</div>
		</div>
	);
}
