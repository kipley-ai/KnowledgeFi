import { CreateChatbotProvider } from "../create-knowledge-context";
import DataSource from "../page";

export default function Page() {
  return (
    <CreateChatbotProvider>
      <DataSource />
    </CreateChatbotProvider>
  );
}
