import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetInitialSuggestedQuestions } from "@/hooks/api/chatbot";
import { chatbotIdFromSlug } from "@/utils/utils";

const ChatInitialSuggestion = ({ handleSendMessage }: any) => {
  const [isFetching, setIsFetching] = useState(true);

  const { id: slug } = useParams();
  const id = chatbotIdFromSlug(slug.toString());

  const { data, status } = useGetInitialSuggestedQuestions(
    {
      chatbot_id: id as string,
    },
    isFetching,
  );

  useEffect(() => {
    if (status === "success" && data?.data?.status === "success") {
      //console.log("🚀 ~ ChatInitialSuggestion ~ data:", data?.data);
      setIsFetching(false);
    }
  }, [status, data]);

  if (status !== "success" || data?.data?.status !== "success") {
    return;
  }

  return (
    <div className="mb-4 flex flex-col gap-x-4 gap-y-2 md:grid md:grid-cols-2">
      {data?.data?.suggested_questions.map(
        (suggestion: string, index: number) => (
          <button
            key={index}
            className="border-border bg-sidebar text-heading rounded-lg border-2 px-4 py-3 text-start text-xs font-light hover:bg-stone-600 hover:text-aqua-700 md:px-5"
            onClick={(e: any) => handleSendMessage(e, suggestion)}
          >
            {suggestion}
          </button>
        ),
      )}
    </div>
  );
};

export default ChatInitialSuggestion;
