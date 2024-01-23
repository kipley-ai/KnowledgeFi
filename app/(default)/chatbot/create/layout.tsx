
import { CreateChatbotProvider } from "../[id]/create-chatbot-context";

  
export default function CreateChatbotLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <CreateChatbotProvider>{children}</CreateChatbotProvider>;
}
  