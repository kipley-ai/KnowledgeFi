"use client";
import { useAppProvider } from "@/providers/app-provider";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import { IconContext } from "react-icons";
import { keepPreviousData } from "@tanstack/react-query";
import { useNFTList } from "@/hooks/api/nft";
import { useChatbotList } from "@/hooks/api/chatbot";
import { ChatbotData, NftData } from "@/lib/types";
import { LoadMore, LoadMoreSpinner } from "@/components/load-more";

type NoDataProps = {
  item: string;
  url: string;
};

const NoData = ({ item, url }: NoDataProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Image
        src="/images/no-data.png"
        width={167}
        height={115}
        alt={"No Data"}
      />
      <p className="text-lg font-semibold text-white">No data yet</p>
      <Link href={url}>
        <div className="flex items-center gap-2 hover:brightness-75">
          <IconContext.Provider value={{ color: "#01F7FF" }}>
            <div>
              <FaPlus />
            </div>
          </IconContext.Provider>
          <p className="text-sm text-[#01F7FF]">Create new {item}</p>
        </div>
      </Link>
    </div>
  );
};

type NFTCardProps = {
  nft: NftData;
};

const NFTCard = ({ nft }: NFTCardProps) => {
  return (
    <div className="group relative flex flex-col rounded-3xl bg-[#222325]">
      <Image
        src={nft.profile_image || "/images/nft-default-thumb.png"}
        className="mx-auto h-full rounded-t-3xl object-cover p-1 pb-0"
        width={300}
        height={300}
        alt={"NFT Card"}
      />
      <div className="flex flex-col gap-1 px-4 py-4">
        <p className="line-clamp-1 text-sm text-white">{nft.name}</p>
        <p className="line-clamp-1 text-sm text-white">
          {nft.price_per_query} {nft.token_symbol}
        </p>
        <p className="line-clamp-1 text-[12px] text-gray-400">
          {nft.category || "Uncategorised"}
        </p>
      </div>
      <Link href={`/nft/${nft.sft_id}`}>
        <div className="absolute bottom-0 hidden h-12 w-full items-center justify-center rounded-b-2xl bg-[#01F7FF] group-hover:flex">
          <p className="text-center text-sm font-semibold text-black">
            View More
          </p>
        </div>
      </Link>
    </div>
  );
};

const NFTList = () => {
  const incrementAmount = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const { data, isFetching, isError, error } = useNFTList(
    {
      page: currentPage,
      page_size: pageSize,
      sort_by: "created",
    },
    keepPreviousData,
  );

  const handleLoadMore = (e: React.MouseEvent) => {
    setPageSize((prevSize) => prevSize + incrementAmount);
  };

  if (data) {
    const { nft_data: nftsData, nft_count: nftCount } = data.data.data;

    if (nftCount > 0) {
      return (
        <>
          <div className="grid grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-4 md:gap-x-6 md:gap-y-8 lg:gap-y-12">
            {nftsData.map((nft: NftData, index: number) => (
              <NFTCard nft={nft} key={nft.sft_id} />
            ))}
          </div>
          {isFetching ? (
            <LoadMoreSpinner />
          ) : (
            <LoadMore handleLoadMore={handleLoadMore} />
          )}
        </>
      );
    }
    return <NoData item="NFT" url="/nft/create" />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return <div>Loading NFTs...</div>;
};

type BotCardProps = {
  bot: ChatbotData;
};

const BotCard = ({ bot }: BotCardProps) => {
  return (
    <div className="group relative flex flex-col rounded-3xl bg-[#222325]">
      <Image
        src={bot.profile_image || "/images/bot-default-thumb.png"}
        className="mx-auto h-4/5 rounded-t-3xl object-cover p-1 pb-0"
        width={300}
        height={300}
        alt={"Bot Card"}
      />
      <div className="flex flex-col gap-1 px-4 py-4 pb-6">
        <p className="text-md line-clamp-1 text-white">{bot.name}</p>
        <p className="line-clamp-1 text-xs text-gray-400">
          {bot.category_name || "Uncategorised"}
        </p>
      </div>
      <div className="absolute bottom-0 hidden h-12 w-full divide-x-2 divide-[#01F7FF] rounded-b-2xl border border-2 border-[#01F7FF] bg-[#222325] text-[#01F7FF] group-hover:flex">
        <Link
          className="flex flex-1 items-center justify-center rounded-bl-xl px-1 hover:bg-[#01F7FF] hover:text-black"
          href={`/nft/${bot.sft_id}`}
        >
          <p className="text-center text-sm font-semibold">View Details</p>
        </Link>
        <Link
          className="flex flex-1 items-center justify-center rounded-br-xl hover:bg-[#01F7FF] hover:text-black"
          href={`/chatbot/` + bot.chatbot_id}
        >
          <p className="text-center text-sm font-semibold">Chat</p>
        </Link>
      </div>
    </div>
  );
};

const BotList = () => {
  const incrementAmount = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const { data, isFetching, isError, error } = useChatbotList(
    {
      page: currentPage,
      page_size: pageSize,
      sort_by: "created_at",
    },
    keepPreviousData,
  );

  const handleLoadMore = (e: React.MouseEvent) => {
    setPageSize((prevSize) => prevSize + incrementAmount);
  };

  if (data) {
    const { chatbot_data: botsData, chatbot_count: botCount } = data.data.data;

    if (botCount > 0) {
      return (
        <>
          <div className="grid grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-4 md:gap-x-6 md:gap-y-8 lg:gap-y-12">
            {botsData.map((bot: ChatbotData, index: number) => (
              <BotCard bot={bot} key={bot.chatbot_id} />
            ))}
          </div>
          {isFetching ? (
            <LoadMoreSpinner />
          ) : (
            <LoadMore handleLoadMore={handleLoadMore} />
          )}
        </>
      );
    }
    return <NoData item="Bot" url="/chatbot/create" />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return <div>Loading Bots...</div>;
};

export default function NFT() {
  const title = "My Assets";
  const { setHeaderTitle } = useAppProvider();

  const handleLoadMore = () => {
    console.log("Load More");
  };

  useEffect(() => {
    document.title = title;
    setHeaderTitle(title);

    return () => setHeaderTitle("Default Title");
  }, []);

  return (
    <div className="flex flex-col gap-12 bg-[#292D32] px-4 pb-32 pt-8 md:px-6 lg:px-8">
      <div className="flex flex-col gap-2 lg:gap-8">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold text-white">My NFTs</h1>
          <hr className="my-4 border border-gray-700" />
        </div>
        <NFTList />
      </div>
      <div className="flex flex-col gap-2 lg:gap-8">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold text-white">My Chatbots</h1>
          <hr className="my-4 border border-gray-700" />
        </div>
        <BotList />
      </div>
    </div>
  );
}
