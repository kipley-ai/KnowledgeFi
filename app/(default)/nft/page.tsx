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
  nft: any;
  id: string | number;
  name: string;
  price: number;
  tokenSymbol: string;
  category: string;
};

const NFTCard = ({
  nft,
  id,
  name,
  price,
  tokenSymbol,
  category,
}: NFTCardProps) => {
  return (
    <div className="group relative flex flex-col rounded-3xl bg-[#222325]">
      <Image
        src={nft.profile_image}
        className="rounded-t-2xl p-2"
        width={300}
        height={300}
        alt={"NFT Card"}
        priority
      />
      <div className="flex flex-col gap-1 px-4 pb-5">
        <p className="text-sm text-white">{name}</p>
        <p className="text-sm text-white">
          {price} {tokenSymbol}
        </p>
        <p className="text-xs text-gray-400">{category}</p>
      </div>
      <Link href={`/nft/${id}`}>
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
  const [pageSize, setPageSize] = useState(8);
  const nftsQuery = useNFTList(
    {
      page: 1,
      page_size: pageSize,
      sort_by: "created",
    },
    keepPreviousData,
  );

  const handleLoadMore = (e: React.MouseEvent) => {
    setPageSize((prevSize) => prevSize + incrementAmount);
  };

  if (nftsQuery.data) {
    const nftsData = nftsQuery.data?.data.data;

    if (nftsData !== undefined && nftsData.length > 0) {
      return (
        <>
          <div className="grid grid-cols-4 gap-x-6 gap-y-12">
            {nftsData.map((nft: NftData, index: number) => (
              <NFTCard
                nft={nft}
                key={index}
                id={nft.sft_id}
                name={nft.name}
                price={nft.price_per_query}
                tokenSymbol={nft.token_symbol}
                category={nft.category}
              />
            ))}
          </div>
          {nftsQuery.isFetching ? (
            <LoadMoreSpinner />
          ) : (
            <LoadMore handleLoadMore={handleLoadMore} />
          )}
        </>
      );
    }
    return <NoData item="NFT" url="/nft/create" />;
  }

  if (nftsQuery.isError) {
    return <div>Error: {nftsQuery.error.message}</div>;
  }

  return <div>Loading NFTs...</div>;
};

type BotCardProps = {
  bot: any;
  id: string | number;
  name: string;
  category: string;
  sftId: string;
};

const BotCard = ({ bot, id, name, category, sftId }: BotCardProps) => {
  return (
    <div className="group relative flex flex-col gap-3 rounded-3xl bg-[#222325]">
      <Image
        src={bot.profile_image}
        className="rounded-t-2xl p-1"
        width={300}
        height={200}
        alt={"Bot Card"}
      />
      <div className="flex flex-col gap-2 px-4 pb-8">
        <p className="text-md text-white">{name}</p>
        <p className="text-xs text-gray-400">{category}</p>
      </div>
      <div className="absolute bottom-0 hidden h-12 w-full divide-x-2 divide-[#01F7FF] rounded-b-2xl border border-2 border-[#01F7FF] bg-[#222325] text-[#01F7FF] group-hover:flex">
        <Link
          className="flex flex-1 items-center justify-center rounded-bl-xl hover:bg-[#01F7FF] hover:text-black"
          href={`/nft/${sftId}`}
        >
          <p className="text-center text-sm font-semibold">View Details</p>
        </Link>
        <Link
          className="flex flex-1 items-center justify-center rounded-br-xl hover:bg-[#01F7FF] hover:text-black"
          href={`/chatbot/` + id}
        >
          <p className="text-center text-sm font-semibold">Chat</p>
        </Link>
      </div>
    </div>
  );
};

const BotList = () => {
  const incrementAmount = 8;
  const [pageSize, setPageSize] = useState(8);

  const botsQuery = useChatbotList(
    {
      page: 1,
      page_size: pageSize, // AL: Set this so that we can get the total bots count for proper client side pagination for now
      sort_by: "created_at",
    },
    keepPreviousData,
  );

  const handleLoadMore = (e: React.MouseEvent) => {
    setPageSize((prevSize) => prevSize + incrementAmount);
  };

  if (botsQuery.data) {
    const botsData = botsQuery.data?.data.data;

    if (botsData !== undefined && botsData.length > 0) {
      return (
        <>
          <div className="grid grid-cols-4 gap-x-6 gap-y-12">
            {botsData.map((bot: ChatbotData, index: number) => (
              <BotCard
                bot={bot}
                key={index}
                id={bot.chatbot_id}
                name={bot.name}
                category={bot.category_name ?? ""}
                sftId={bot.sft_id}
              />
            ))}
          </div>
          {botsQuery.isFetching ? (
            <LoadMoreSpinner />
          ) : (
            <LoadMore handleLoadMore={handleLoadMore} />
          )}
        </>
      );
    }
    return <NoData item="Bot" url="/chatbot/create" />;
  }

  if (botsQuery.isError) {
    return <div>Error: {botsQuery.error.message}</div>;
  }

  return <div>Loading Bots...</div>;
};

export default function NFT() {
  const title = "My NFTs";
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
    <div className="flex flex-col gap-24 bg-[#292D32] py-8 pb-32 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold text-white">My NFTs</h1>
          <hr className="my-4 border border-gray-700" />
        </div>
        <NFTList />
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold text-white">My Bots</h1>
          <hr className="my-4 border border-gray-700" />
        </div>
        <BotList />
      </div>
    </div>
  );
}
