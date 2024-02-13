"use client";
import { useAppProvider } from "@/providers/app-provider";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaPlus, FaSpinner } from "react-icons/fa6";
import { IconContext } from "react-icons";
import { keepPreviousData } from "@tanstack/react-query";
import { useNFTList } from "@/hooks/api/nft";
import { useChatbotList } from "@/hooks/api/chatbot";
import { ChatbotData, NftData } from "@/lib/types";
import { LoadMore, LoadMoreSpinner } from "@/components/load-more";
import { PaginationController } from "@/components/pagination-2/controller";

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(8);

  const { isPending, isError, error, data, isFetching } = useNFTList(
    {
      page: currentPage,
      page_size: pageSize,
      sort_by: "created",
    },
    keepPreviousData,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isPending) {
    return (
      <div className="flex h-32 w-full items-center justify-center gap-4">
        <FaSpinner size={20} className="animate-spin" />
        <p className="text-md text-gray-300">Loading</p>
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const { nft_data: nftsData, nft_count: nftCount } = data.data.data;

  if (nftCount > 0) {
    const totalPages = Math.ceil(nftCount / pageSize);

    return (
      <>
        <div className="grid grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-4 md:gap-x-6 md:gap-y-8 lg:gap-y-12">
          {nftsData.map((nft: NftData) => (
            <NFTCard nft={nft} key={nft.sft_id} />
          ))}
        </div>
        <div className="flex flex-col items-center">
          <div
            className={`${!isFetching && "invisible"} flex w-full items-center justify-center gap-4`}
          >
            <FaSpinner size={20} className="animate-spin" />
            <p className="text-md text-gray-300">Loading</p>
          </div>
          <PaginationController
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
        </div>
      </>
    );
  }

  return <NoData item="SFT" url="/nft/create" />;
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(8);

  const { isPending, isError, error, data, isFetching } = useChatbotList(
    {
      page: currentPage,
      page_size: pageSize,
      sort_by: "created_at",
    },
    keepPreviousData,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isPending) {
    return (
      <div className="flex h-32 w-full items-center justify-center gap-4">
        <FaSpinner size={20} className="animate-spin" />
        <p className="text-md text-gray-300">Loading</p>
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const { chatbot_data: botsData, chatbot_count: botCount } = data.data.data;

  if (botCount > 0) {
    const totalPages = Math.ceil(botCount / pageSize);

    return (
      <>
        <div className="grid grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-4 md:gap-x-6 md:gap-y-8 lg:gap-y-12">
          {botsData.map((bot: ChatbotData) => (
            <BotCard bot={bot} key={bot.chatbot_id} />
          ))}
        </div>
        <div className="flex flex-col items-center">
          <div
            className={`${!isFetching && "invisible"} flex w-full items-center justify-center gap-4`}
          >
            <FaSpinner size={20} className="animate-spin" />
            <p className="text-md text-gray-300">Loading</p>
          </div>
          <PaginationController
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
        </div>
      </>
    );
  }

  return <NoData item="Chatbot" url="/chatbot/create" />;
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
          <h1 className="text-2xl font-semibold text-white">My SFTs</h1>
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
