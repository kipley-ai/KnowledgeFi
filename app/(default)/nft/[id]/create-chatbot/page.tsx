"use client"
import { CreateChatbotProvider } from "./create-chatbot-context";
import ChatBotForm from "./create-chatbot-form";

const CreateChatbot = () => {
    return ( <CreateChatbotProvider>
    <ChatBotForm/>
    </CreateChatbotProvider> );
}
 
export default CreateChatbot;