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
import { useEffect, useState } from "react";
import Image from "next/image";
import Avatar from "public/images/avatar-gradient-icon.svg";
import EnterIcon from "public/images/arrow-2-icon.svg";
import { useDefaultValue } from "@/hooks/api/default_value";

const MessageInput = () => {
  const {
    // Newly entered question
    newQuestion,
    setNewQuestion,
    setLastQuestion,

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
  const { address } = useAccount();
  const { id } = useParams();
  const chatSession = useGetSession({ chatbot_id: id as string });
  const newSession = useNewSession();
  const pluginConfig = useDefaultValue({key:"plugin_config"})

  

  const [model,setModel] = useState("gpt-3.5-turbo")
  const [promptTemplate2,setPromptTemplate2] = useState("\n\nAct as the person described above, and utilize the available information below to answer the question.\nRemember, the user is looking for assistance, so keep your responses natural, concise, accurate, and informative. If you are uncertain about a query or if the user asked something which is unidentified by you, prompt the user to rephrase it.\nHere is the available information: \n{context}\n\nHere is user's question:\n{question}")
  const [temprature,setTemprature] = useState(0)
  const [topP,setTopP] = useState(1)
  const [frequencyPenalty,setFrequencyPenalty] = useState(0)
  const [presencePenalty,setPresencePenalty] = useState(0)
  const [topDocs,setTopDocs] = useState(10)


  const { data: chatbotData, isSuccess } = useChatbotDetail({
    chatbot_id: id as string,
  });

  useEffect(() => {
    console.log(!chatSession.data?.data.data?.session_id);
  }, [chatSession.isSuccess]);

  useEffect(()=> {
    console.log(pluginConfig.data?.data)
    if(pluginConfig.isSuccess){
      // console.log(pluginConfig.data?.data)
      const plugin_config = JSON.parse(pluginConfig.data?.data.data.value)
      console.log(plugin_config)
      setModel(plugin_config.model)
      setPromptTemplate2(plugin_config.prompt_template)
      setTemprature(plugin_config.model_temprature)
      setTopP(plugin_config.top_p)
      setFrequencyPenalty(plugin_config.frequency_penalty)
      setPresencePenalty(plugin_config.presence_penalty)
      setTopDocs(plugin_config.top_k_docs)
    }
  },[pluginConfig.isSuccess])

  const handleSendMessage = async () => {
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
                '{"model":"'+model+'","prompt_template":' +promptTemplate +
                ',"model_temperature":'+temprature+
                ',"top_p":'+topP+
                ',"frequency_penalty":'+frequencyPenalty+
                ',"presence_penalty":'+presencePenalty+
                ',"top_k_docs":'+topDocs+'}',
            });
            setMessageHistory((prevHistory) => [
              ...prevHistory,
              { sender: "user", message: newQuestion },
            ]);
            setNewQuestion("");
            setReplyStatus("answering");
            setLastQuestion(newQuestion);
          },
        }
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
        '{"model":"'+model+'","prompt_template":' +promptTemplate +
        ',"model_temperature":'+temprature+
        ',"top_p":'+topP+
        ',"frequency_penalty":'+frequencyPenalty+
        ',"presence_penalty":'+presencePenalty+
        ',"top_k_docs":'+topDocs+'}',
      });
      setMessageHistory((prevHistory) => [
        ...prevHistory,
        { sender: "user", message: newQuestion },
      ]);
      setNewQuestion("");
      setReplyStatus("answering");
      setLastQuestion(newQuestion);
    }
  };

  const promptTemplate: string =
    (('"' + chatbotData?.data.data.instruction) as string) +
    promptTemplate2 +
    '"';

  return (
    <div className="sticky bottom-4 lg:bottom-0 inset-x-0 flex items-center rounded-full border border-gray-600 focus-within:border-[#01F7FF] bg-stone-800 px-4 py-2 mt-6 w-auto lg:w-full">
      {/* Profile picture placeholder */}
      {/* <Image src={Avatar} alt="Profile" className="w-8 h-8 rounded-full mr-4" /> */}
      {/* Input Field */}
      <input
        type="text"
        placeholder="Ask me anything"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSendMessage();
          // console.log(e.key)
        }}
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
            handleSendMessage();
          }}
        >
          <Image src={EnterIcon} alt="Submit" />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
