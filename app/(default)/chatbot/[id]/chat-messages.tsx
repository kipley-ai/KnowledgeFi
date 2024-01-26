import { useChatHistory, useChatSession, useChatboxWS } from "@/hooks/api/chatbox";
import { useNftDetail } from "@/hooks/api/nft";
import { useEffect, useState, useRef } from "react";
import { useCreateChatbotContext } from "./create-chatbot-context";
import LastMessage from "./last-message";
import { useChatbotDetail } from "@/hooks/api/chatbot";
import { useParams } from "next/navigation";

const MessageList = () => {
	const [answersStream, setAnswersStream] = useState<string[]>([]);
	const fieldRef = useRef<HTMLInputElement>(null);

	const {
		newQuestion,
		setNewQuestion,

		lastJsonMessage,
		readyState,
		sendValidatedMessage,

        replyStatus,
        setReplyStatus,

		messageHistory,
		setMessageHistory,
	} = useCreateChatbotContext();

	const {id} = useParams()

	const {data:chatbotData , isSuccess: chatbotDetailIsSuccess} = useChatbotDetail({
		chatbot_id:id as string
	})

	const chatHistoryAPI = useChatHistory({
		session_id: chatbotData?.data.data.session_id,
		app_id: id as string,
		page_num: 1,
		page_size: 10,
		// request_url:
		//   appDetail?.data?.data.data.app_info.plugin_meta_data.chat_history_api
		//     .request_url,
	});

	useEffect(() => {
		if (chatbotDetailIsSuccess && chatHistoryAPI.isSuccess) {
			
		  // if (chatHistoryAPI.data.data.length) {
		  //   setChatList(chatHistoryAPI.data.data);
		  // }
		  if (chatHistoryAPI.data?.data.length) {
			console.log(chatHistoryAPI.data?.data)
			setMessageHistory(chatHistoryAPI.data?.data.reverse());
		  }
		  setAnswersStream([]);
		}
	  // }, [chatHistoryAPI.isSuccess, chatHistoryAPI.data?.data]);
	  }, [chatbotDetailIsSuccess,chatHistoryAPI.isSuccess]);

	useEffect(() => {
		fieldRef.current?.scrollIntoView({
			behavior: "smooth",
		});

		console.log("Answer Stream");
		console.log(answersStream.slice(0, -2));

		if (lastJsonMessage !== null && lastJsonMessage.type !== "error") {
			if (lastJsonMessage.type === "end") {
				chatHistoryAPI.refetch()

				const fullBotAnswer = answersStream
					.slice(0, -2)
					.map((message: string, idx: number) => {
						if (idx == 0) return "";
						return message;
					})
					.reduce((a: string, b: string) => a + b, "");

				console.log("fullBotAnswer");
				console.log(fullBotAnswer);

				setMessageHistory((prevHistory) => [
					...prevHistory,
					{ sender: "bot", message: fullBotAnswer },
				]);

				setAnswersStream([]);
				setReplyStatus("idle");

				console.log("Message history");
				console.log(messageHistory);

				return;
			}

			setAnswersStream((prevAnswersStream) => {
				if (lastJsonMessage.sender == "user") {
					return prevAnswersStream;
				}
				return [...prevAnswersStream, lastJsonMessage.message];
			});
		}
	}, [lastJsonMessage]);

	return (
		<div className="flex flex-col p-4 space-y-4 overflow-auto border border-gray-600">
			{messageHistory.map((message, index) => {
				return index < messageHistory.length - 1 || message.sender == "user" ? (
					<>
						<div className="flex items-start space-x-2">
							<div className="flex-none">
								<div className="rounded-full bg-gray-300 w-8 h-8"></div>
							</div>
							<div className="flex-grow">
								<div className="text-xs text-gray-400 mb-1">
									{message.sender}
								</div>
								<div className="text-white text-sm rounded-lg py-2 w-full">
									{message.message}
								</div>
							</div>
						</div>
						<hr className="border-t border-gray-600 mx-[-1rem]" />
					</>
				) : (
					<>
						<LastMessage
							sender={"bot"}
							message={message.message}
							isGenerating={replyStatus == "answering"}
						/>
					</>
				);
			})}
			{replyStatus == "idle" ? (
				<></>
			) : (
				<LastMessage
					sender={"bot"}
					message={answersStream}
					isGenerating={replyStatus == "answering"}
				/>
			)}
		</div>
	);
};

export default MessageList;
