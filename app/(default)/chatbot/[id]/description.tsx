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
    <>
      <Image
        src={nftData?.data.data.profile_image}
        alt="Profile"
        className="rounded-2xl w-64 h-80"
        width={50}
        height={50}
      />
      <div className="space-y-5 py-5 text-white text-lg">
        <h6>{nftData?.data.data.name}</h6>
        <h6 className="font-semibold">Stored value: xxx KIP</h6>
        {/* <p className="text-sm"><span className="text-[#777E90]">Last Sale</span> <span className="font-semibold">0.001 ETH</span></p> */}
      </div>
    </>
  );
}
