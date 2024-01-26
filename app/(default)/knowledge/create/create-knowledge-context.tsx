"use client";

import { createContext, useContext, useState } from "react";
import { ReactSetter } from "@/lib/aliases";
import { useChatSession, useChatboxWS } from "@/hooks/api/chatbox";
import { ChatPayload, LastMessagePayload } from "@/hooks/api/chatbox/schema";
import { useNftDetail } from "@/hooks/api/nft";

interface CreateChatbotContextProps {
	createKb: any;
	handleChangeKb: any;
	createNft: any;
	handleChangeNft: any;
	step: string;
	setStep: any;
}

const CreateChatbotContext = createContext<
	CreateChatbotContextProps | undefined
>(undefined);

export const CreateChatbotProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [createKb, setCreateKb] = useState({
		type: "",
		kb_data: [],
		username:""
	});

	const [createNft,setCreateNft] = useState({
		name:"",
		description:"",
		contract_address:"",
		wallet_address:"",
		supply:"",
		category:"",
		token_symbol:"",
		price_per_query:"",
		query_royalties:"",
		url:"",
	})

	const [step, setStep] = useState("data_source");
	

	// const nftDetail = useNftDetail({
	// 	sft_id: "SFTID11",
	// });

	const handleChangeKb = (name: string, value: any) => {
		setCreateKb((prevData:any) => {
			return {
				...prevData,
				[name]: value,
			};
		});
	};

	const handleChangeNft = (name: string, value: any) => {
		setCreateNft((prevData:any) => {
			return {
				...prevData,
				[name]: value,
			};
		});
	};

	return (
		<CreateChatbotContext.Provider
			value={{
				createKb,
				handleChangeKb,
				createNft,
				handleChangeNft,
				step, 
				setStep
				
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
