"use client";
import Header from "./header";
import MessageList from "./chat-messages";
import MessageInput from "./message-input";
import { useRouter } from 'next/navigation'
import { useUserDetail } from '@/hooks/api/user'
import { useAppProvider } from "@/providers/app-provider";
import { useEffect, useState } from "react";
import { useNftDetail } from "@/hooks/api/nft";
import { useParams, usePathname } from "next/navigation";
import { useChatHistory, useChatSession, useChatboxWS } from "@/hooks/api/chatbox";
import { CreateChatbotProvider } from "./create-chatbot-context";
import { useChatbotDetail } from "@/hooks/api/chatbot";
import Description from "./description";
import CreditBalance from "./credit-balance";
import { CreditBalanceProvider } from "./credit-balance-context";

export default function ChatBotPage() {
	const router = useRouter();

	const { data: userDetail } = useUserDetail();

	const onboarding = userDetail?.data.data.onboarding;
	if (!onboarding) {
		router.push("/onboarding");
	}

	const { setHeaderTitle } = useAppProvider();
	const pathname = usePathname();

	useEffect(() => {
		setHeaderTitle("Chatbot"); // Set the title when the component is mounted
		console.log(pathname.split("/").pop());

		// Optional: Reset the title when the component is unmounted
		return () => setHeaderTitle("Default Title");
	}, []); // Empty dependency array to run only once on mount

	return (
		<div className="flex flex-col h-full md:flex-row px-4 md:px-0">
			<CreditBalanceProvider>
				<div className="flex flex-col md:px-6 xl:px-16 pb-4 bg-[#292D32] h-[calc(100vh-70px)] lg:h-[calc(100vh-120px)] w-full md:w-3/4 md:border-r-2 border-[#393E44]">
					<CreateChatbotProvider>
						<Header />
						<MessageList />
						<MessageInput />
					</CreateChatbotProvider>
				</div>
				<div className="hidden md:flex flex-col w-1/4 bg-[#292D32]">
					<div className="sticky top-0 lg:-top-8 h-fit w-full flex flex-col items-start divide-y-2 divide-[#393E44]">
						<Description />
						<CreditBalance />
					</div>
					<div></div>
				</div>
			</CreditBalanceProvider>
		</div>
	);
}
