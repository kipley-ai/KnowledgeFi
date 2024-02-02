import { useChatbotDetail } from "@/hooks/api/chatbot";
import { useNftDetail } from "@/hooks/api/nft";
import Image from "next/image";
import { useParams } from "next/navigation";
import DummyImage from "public/images/michael-unsplash-1.png";

export default function ChatbotDescription() {
  const { id } = useParams();
  const { data: chatbotData } = useChatbotDetail({ chatbot_id: id as string });
  const { data: nftData } = useNftDetail({
    sft_id: chatbotData?.data.data.sft_id,
  });
  return (
    <div className="flex flex-col gap-4 p-6">
      <Image
        src={nftData?.data.data.profile_image}
        alt="Profile"
        className="rounded-lg"
        width={240}
        height={240}
      />
      <div className="w-full space-y-2 text-white">
        <p className="text-sm">{nftData?.data.data.name}</p>
        <p className="text-[11px]">
          <span className="text-[#777E90]">Stored Value</span>{" "}
          {nftData?.data.data.token_amount} {nftData?.data.data.token_symbol}
        </p>
      </div>
    </div>
  );
}
