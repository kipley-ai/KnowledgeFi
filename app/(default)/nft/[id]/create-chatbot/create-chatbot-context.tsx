"use client";

import { createContext, useContext, useState } from "react";
import { ReactSetter } from "@/lib/aliases";
import { useChatSession, useChatboxWS } from "@/hooks/api/chatbox";
import { ChatPayload, LastMessagePayload } from "@/hooks/api/chatbox/schema";
import { useNftDetail } from "@/hooks/api/nft";

interface CreateChatbotContextProps {
	createChatbot: any;
	handleChangeChatbot: any;
	
}

const CreateChatbotContext = createContext<
	CreateChatbotContextProps | undefined
>(undefined);

export const CreateChatbotProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [createChatbot, setCreateChatbot] = useState({
		type: "",
		kb_data: [],
		username:""
	});



	const [step, setStep] = useState("data_source");
	

	// const nftDetail = useNftDetail({
	// 	sft_id: "SFTID11",
	// });

	const handleChangeChatbot = (name: string, value: any) => {
		setCreateChatbot((prevData:any) => {
			return {
				...prevData,
				[name]: value,
			};
		});
	};

	return (
		<CreateChatbotContext.Provider
			value={{
				createChatbot,
				handleChangeChatbot,
				
				
			}}
		>
			{children}
		</CreateChatbotContext.Provider>
	);
};

export const useCreateChatbotContext = () => {
	const context = useContext(CreateChatbotContext);
	if (!context) {
		throw new Error(
			"useCreateChatbotContext must be used within a CreateChatbotProvider"
		);
	}
	return context;
};
