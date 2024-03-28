import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useCreateChatbotContext } from "./create-chatbot-context";
import { uuid } from "uuidv4";
import { useAccount } from "wagmi";
import {
  useChatbotDetail,
  useGetSession,
  useNewSession,
} from "@/hooks/api/chatbot";
import { useChatHistory } from "@/hooks/api/chatbox";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Avatar from "public/images/avatar-gradient-icon.svg";
import EnterIcon from "public/images/arrow-right.svg";
import { useDefaultValue } from "@/hooks/api/default_value";
import { chatbotIdFromSlug } from "@/utils/utils";

const MessageInput = () => {
  const { id: slug } = useParams();
  const id = chatbotIdFromSlug(slug.toString());
  const {
    // Newly entered question
    newQuestion,
    setNewQuestion,
    setLastQuestion,

    // WS
    sendValidatedMessage,
    setMessageHistory,

    // Loading
    replyStatus,
    setReplyStatus,

    setButtonSession,
  } = useCreateChatbotContext();

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [inputRows, setInputRows] = useState(1);
  const { address } = useAccount();
  const chatSession = useGetSession({ chatbot_id: id as string });
  const newSession = useNewSession();

  const { data: chatbotData, isSuccess } = useChatbotDetail({
    chatbot_id: id as string,
  });
  const pluginConfig = useDefaultValue({
    key: chatbotData?.data.data.personality as string,
  });
  const chatHistoryAPI = useChatHistory({
    session_id: chatSession.data?.data.data?.session_id,
    app_id: id as string,
    page_num: 1,
    page_size: 10,
  });

  const [model, setModel] = useState("gpt-3.5-turbo");
  const [promptTemplate2, setPromptTemplate2] = useState(
    "\n\nAct as the person described above, and utilize the available information below to answer the question.\nRemember, the user is looking for assistance, so keep your responses natural, concise, accurate, and informative. If you are uncertain about a query or if the user asked something which is unidentified by you, prompt the user to rephrase it.\nHere is the available information: \n{context}\n\nHere is user's question:\n{question}",
  );
  const [temprature, setTemprature] = useState(0);
  const [topP, setTopP] = useState(1);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0);
  const [presencePenalty, setPresencePenalty] = useState(0);
  const [topDocs, setTopDocs] = useState(10);
  const [maxTokens, setMaxTokens] = useState(250);

  useEffect(() => {
    console.log(!chatSession.data?.data.data?.session_id);
  }, [chatSession.isSuccess]);

  useEffect(() => {
    console.log(pluginConfig.data?.data);
    if (pluginConfig.isSuccess) {
      // console.log(pluginConfig.data?.data)
      const plugin_config = JSON.parse(pluginConfig.data?.data.data.value);
      console.log(plugin_config);
      setModel(plugin_config.model);
      setPromptTemplate2(plugin_config.prompt_template);
      setTemprature(plugin_config.model_temprature);
      setTopP(plugin_config.top_p);
      setFrequencyPenalty(plugin_config.frequency_penalty);
      setPresencePenalty(plugin_config.presence_penalty);
      setTopDocs(plugin_config.top_k_docs);
      setMaxTokens(plugin_config.max_tokens);
    }
  }, [pluginConfig.isSuccess]);

  useEffect(() => {
    if (replyStatus === "idle") {
      inputRef.current?.focus();
    }
  }, [replyStatus]);

  const handleSendMessage = async (e: any) => {
    e.preventDefault();

    if (!newQuestion || newQuestion === "" || newQuestion.trim() === "") return;

    if (!chatSession.data?.data.data?.session_id) {
      newSession.mutate(
        { chatbot_id: id as string },
        {
          onSuccess(data, variables, context) {
            console.log(data);
            chatSession.refetch();
            sendValidatedMessage({
              question: newQuestion,
              chatbot_id: id as string,
              session_id: data?.data.session_id as string,
              kb_id: chatbotData?.data.data.kb_id as string,
              // type: "twitter",
              user_id: address as string,
              plugin_config:
                '{"model":"' +
                model +
                '","prompt_template":' +
                promptTemplate +
                ',"model_temperature":' +
                temprature +
                ',"top_p":' +
                topP +
                ',"frequency_penalty":' +
                frequencyPenalty +
                ',"presence_penalty":' +
                presencePenalty +
                ',"top_k_docs":' +
                topDocs +
                ',"max_tokens":' +
                maxTokens +
                "}",
            });
            setMessageHistory((prevHistory) => [
              ...prevHistory,
              { sender: "user", message: newQuestion },
            ]);
            setNewQuestion("");
            setReplyStatus("answering");
            setLastQuestion(newQuestion);
            setInputRows(1);
          },
        },
      );
    } else {
      sendValidatedMessage({
        question: newQuestion,
        chatbot_id: id as string,
        session_id: chatSession.data?.data.data.session_id as string,
        kb_id: chatbotData?.data.data.kb_id as string,
        // type: "twitter",
        user_id: address as string,
        plugin_config:
          '{"model":"' +
          model +
          '","prompt_template":' +
          promptTemplate +
          ',"model_temperature":' +
          temprature +
          ',"top_p":' +
          topP +
          ',"frequency_penalty":' +
          frequencyPenalty +
          ',"presence_penalty":' +
          presencePenalty +
          ',"top_k_docs":' +
          topDocs +
          ',"max_tokens":' +
          maxTokens +
          "}",
      });
      setMessageHistory((prevHistory) => [
        ...prevHistory,
        { sender: "user", message: newQuestion },
      ]);
      setNewQuestion("");
      setReplyStatus("answering");
      setLastQuestion(newQuestion);
      setInputRows(1);
    }
  };

  const promptTemplate: string =
    (('"' + chatbotData?.data.data.instruction) as string) +
    promptTemplate2 +
    '"';

  const handleClearChat = () => {
    newSession.mutate(
      { chatbot_id: id as string },
      {
        onSuccess(data, variables, context) {
          chatSession.refetch();
          chatHistoryAPI.refetch();
          setButtonSession((prev: boolean) => !prev);
        },
      },
    );
  };

  return (
    <div className="sticky inset-x-0 bottom-4 mt-6 flex w-auto items-center gap-4">
      <button
        className="rounded-2xl border border-gray-600 px-2 text-sm text-gray-600 hover:brightness-150"
        onClick={handleClearChat}
      >
        CLEAR
        <br />
        CHAT
      </button>
      <form
        onSubmit={handleSendMessage}
        className="flex grow items-center justify-between rounded-md border border-gray-600 bg-neutral-900 py-1 pl-1 focus-within:border-[#01F7FF] lg:bottom-0 lg:w-full"
      >
        {/* Profile picture placeholder */}
        {/* <Image src={Avatar} alt="Profile" className="w-8 h-8 rounded-full mr-4" /> */}
        {/* Input Field */}
        <textarea
          ref={inputRef}
          placeholder="Ask me anything"
          className="grow resize-none border-0 bg-neutral-900 text-white placeholder-gray-300 caret-[#01F7FF] outline-none focus:ring-0"
          value={newQuestion}
          onChange={(e) => {
            let lengthOfText = e.target.value.match(/\n/g)?.length;
            if (!lengthOfText) {
              setInputRows(1);
            }
            if (lengthOfText && lengthOfText < 2) {
              setInputRows(lengthOfText + 1);
            }
            setNewQuestion(e.target.value);
          }}
          disabled={replyStatus === "answering"}
          rows={inputRows}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.code === "Enter" && !e.shiftKey) {
              handleSendMessage(e);
            }
          }}
        />
        {/* Icons or buttons */}
        <div className="mx-4">
          <button
            className="text-light-blue"
            disabled={replyStatus === "answering"}
          >
            <svg
              width="20"
              height="14"
              viewBox="0 0 20 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.62268e-07 6L3.49691e-07 8L15 8L15 10L17 10L17 8L20 8L20 6L17 6L17 4L15 4L15 6L2.62268e-07 6ZM13 2L15 2L15 4L13 4L13 2ZM13 2L11 2L11 -4.80823e-07L13 -5.68248e-07L13 2ZM13 12L15 12L15 10L13 10L13 12ZM13 12L11 12L11 14L13 14L13 12Z"
                fill="#00FFFF"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
