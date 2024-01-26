import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCreateChatbotContext } from "./create-chatbot-context";
import { uuid } from "uuidv4";
import { useAccount } from "wagmi";
import { useChatbotDetail } from "@/hooks/api/chatbot";
import { useEffect } from "react";
import Image from "next/image";
import Avatar from "public/images/avatar-gradient-icon.svg";
import EnterIcon from "public/images/arrow-2-icon.svg";

const MessageInput = () => {
	const {
		// Newly entered question
		newQuestion,
		setNewQuestion,

		// WS
		sendValidatedMessage,
		setMessageHistory,

		// Loading
		setReplyStatus,
	} = useCreateChatbotContext();

	
	const searchParams = useSearchParams();
	const objParams = new URLSearchParams(searchParams.toString());
	const router = useRouter();
	const pathname = usePathname();
	const {address} = useAccount()
	const {id} = useParams()
	const {data:chatbotData , isSuccess} = useChatbotDetail({
		chatbot_id:id as string
	})

	const promptTemplate: string = chatbotData?.data.data.instruction as string + "\n\nAct as the person described above, and utilize the available information below to answer the question.\nRemember, the user is looking for assistance, so keep your responses natural, concise, accurate, and informative. If you are uncertain about a query or if the user asked something which is unidentified by you, prompt the user to rephrase it.\nHere is the available information: \n{context}\n\nHere is user's question:\n{question}"

	return (
		<div className="flex items-center rounded-full border border-gray-600 focus-within:border-[#01F7FF] bg-dark-blue px-4 py-2 mt-6 w-full">
			{/* Profile picture placeholder */}
			{/* <Image src={Avatar} alt="Profile" className="w-8 h-8 rounded-full mr-4" /> */}
			{/* Input Field */}
			<input
				type="text"
				placeholder="Ask me anything"
				className="flex-grow bg-transparent text-white placeholder-gray-300 border-0 outline-none rounded-full focus:ring-0 caret-[#01F7FF]"
				value={newQuestion}
				onChange={(e) => {
					setNewQuestion(e.target.value);
				}}
			/>
			{/* Icons or buttons */}
			<div className="flex items-center ml-4">
				<button
					className="text-light-blue"
					onClick={(e) => {
						console.log(chatbotData?.data.data,address)
						sendValidatedMessage({
							question: newQuestion,
							chatbot_id: id as string,
							session_id: chatbotData?.data.data.session_id as string,
							kb_id:chatbotData?.data.data.kb_id as string,
							// type: "twitter",
							user_id: address as string,
							plugin_config:'{"model":"gpt-3.5-turbo","prompt_template":' + promptTemplate + ',"model_temperature":0,"top_p":1,"frequency_penalty":0,"presence_penalty":0,"top_k_docs":10}',
						});
						setMessageHistory((prevHistory) => [
							...prevHistory,
							{ sender: "user", message: newQuestion },
						]);
						setNewQuestion("");
						setReplyStatus("answering");
					}}
				>
					<Image src={EnterIcon} alt="Submit"/>
				</button>
			</div>
		</div>
	);
};

export default MessageInput;
