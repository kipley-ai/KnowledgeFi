
import { CreateChatbotProvider } from "./create-knowledge-context";

  
export default function CreateChatbotLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <CreateChatbotProvider>{children}</CreateChatbotProvider>;
}
  