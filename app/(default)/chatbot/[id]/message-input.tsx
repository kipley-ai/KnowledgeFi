import { useCreateChatbotContext } from "./create-chatbot-context";

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

	return (
		<div className="flex items-center rounded-xl border border-gray-600 focus-within:border-[#01F7FF] bg-dark-blue px-4 py-2 mt-6 w-full">
			{/* Profile picture placeholder */}
			<div className="rounded-full bg-gray-300 w-8 h-8 mr-4"></div>
			{/* Input Field */}
			<input
				type="text"
				placeholder="Ask me anything"
				className="flex-grow bg-transparent text-white placeholder-gray-300 border-0 outline-none rounded-full focus:ring-0"
				value={newQuestion}
				onChange={(e) => {
					setNewQuestion(e.target.value);
				}}
			/>
			{/* Icons or buttons */}
			<div className="flex items-center ml-4">
				<button
					className="text-light-blue mr-4"
					onClick={(e) => {
						sendValidatedMessage({
							question: newQuestion,
							chatbot_id: "1234",
							username: "elonmusk",
							session_id: "a",
							type: "twitter",
							user_id: "12",
							plugin_config:
								'{"model":"gpt-3.5-turbo","prompt_template":"Use the following pieces of context to answer the question at the end. If you don\'t know the answer, just say that you don\'t know, don\'t try to make up an answer.\\r\\n\\r\\n{context}\\r\\n\\r\\nQuestion: {question}\\r\\nHelpful Answer:","model_temperature":0,"top_p":1,"frequency_penalty":0,"presence_penalty":0,"top_k_docs":10}',
						});
						setMessageHistory((prevHistory) => [
							...prevHistory,
							{ sender: "user", message: newQuestion },
						]);
						setNewQuestion("");
						setReplyStatus("answering");
					}}
				>
					{/* Attachment icon */}
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
							stroke="#F1F5F9"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
				<button className="text-light-blue">
					{/* Microphone icon */}
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M20 12V13C20 17.4183 16.4183 21 12 21C7.58172 21 4 17.4183 4 13V12M12 17C9.79086 17 8 15.2091 8 13V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V13C16 15.2091 14.2091 17 12 17Z"
							stroke="#F1F5F9"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default MessageInput;
