import { useChatHistory, useChatSession, useChatboxWS } from "@/hooks/api/chatbox";
import { useNftDetail } from "@/hooks/api/nft";
import { useEffect, useState, useRef } from "react";
import { useCreateChatbotContext } from "./create-chatbot-context";
import LastMessage from "./last-message";
import { useChatbotDetail } from "@/hooks/api/chatbot";
import { useParams } from "next/navigation";
import Image from "next/image";
import AvatarDummy from "public/images/avatar-bot-dummy.svg";
import AvatarDummy2 from "public/images/avatar-user-dummy.svg";

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
		<div className="flex flex-col p-4 space-y-4 overflow-auto">
			{messageHistory.map((message, index) => {
				return index < messageHistory.length - 1 || message.sender == "user" ? (
					<>
						<div className="flex items-start space-x-3 my-4">
							<Image src={message.sender == "bot" ? AvatarDummy : AvatarDummy2} alt="Profile" className="w-8 h-8 rounded-full mr-5" />
							<div className="text-white text-sm w-full">
								<h6 className="mb-5 mt-1">{message.sender == "bot" ? "Levi Ackerman" : "You"}</h6>
								<p>{message.message}</p>
							</div>
						</div>
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
