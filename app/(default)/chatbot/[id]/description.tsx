import { useChatbotDetail } from "@/hooks/api/chatbot";
import { useNftDetail } from "@/hooks/api/nft";
import Image from "next/image";
import { useParams } from "next/navigation";
import DummyImage from "public/images/michael-unsplash-1.png";
import { tokenProfit } from "@/smart-contract/kip-protocol-contract";
import { useEffect, useState } from "react";
import {
  useSftContract,
  useTokenProfit,
  useTokenProfit_,
} from "@/hooks/smart-contract";
import { FaSpinner } from "react-icons/fa6";

export default function ChatbotDescription() {
  const tokenSymbol = "$KIP";
  const { id } = useParams();
  const { data: chatbotData } = useChatbotDetail({ chatbot_id: id as string });
  const { data: nftData } = useNftDetail({
    sft_id: chatbotData?.data.data.sft_id!,
  });
  const nftOpenSeaLink = `${process.env.NEXT_PUBLIC_OPENSEA_URL}/${nftData?.data.data.sft_address}`;
  // const {data: profit, isLoading} = useTokenProfit_(chatbotData?.data.data.sft_id, 1);
  // TODO: Change later when shit is actually working
  const { data: profit, isFetched } = useTokenProfit_(
    "0xbede37b1bec799f944c3502d5fb189300cc29543",
    1,
  );

  useEffect(() => {
    console.log("Profit :" + profit);
  }, [profit]);

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="relative">
        <a href={nftOpenSeaLink} target="_blank">
          <Image
            src={nftData?.data.data.profile_image!!}
            alt="Profile"
            className="rounded-lg"
            width={240}
            height={240}
          />
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
            <p className="text-center text-sm font-bold text-white lg:text-lg">
              View SFT on OpenSea
            </p>
          </div>
        </a>
      </div>
      <div className="w-full space-y-2 text-white">
        <p className="text-sm">{nftData?.data.data.name}</p>
        <p className="text-[11px]">
          <span className="text-[#777E90]">Stored Value</span>
          {isFetched ? profit : <FaSpinner className="animate-spin" />}{" "}
          {profit ? "" : 0} {tokenSymbol}
        </p>
      </div>
    </div>
  );
}
