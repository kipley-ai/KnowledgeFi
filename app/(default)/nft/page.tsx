"use client";
import { useAppProvider } from "@/providers/app-provider";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LoadMoreButton from "@/components/load-more-button";
import { FaPlus } from "react-icons/fa6";
import { IconContext } from "react-icons";
import axios from "axios";
import { axiosAPI, constructHeader } from "../../api/utils";
import { useQueries } from "@tanstack/react-query";
import { useNFTList } from "@/hooks/api/nft";
import { useChatbotList } from "@/hooks/api/chatbot";

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
                <div className="flex gap-2 items-center hover:brightness-75">
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
    id: string | number;
    name: string;
    price: number;
    tokenSymbol: string;
    category: string;
};

const NFTCard = ({ id, name, price, tokenSymbol, category }: NFTCardProps) => {
    return (
        <div className="group relative flex flex-col bg-[#222325] rounded-3xl">
            <Image
                src="/images/nft-default-thumb.png"
                className="rounded-t-2xl p-2"
                width={300}
                height={300}
                alt={"NFT Card"}
            />
            <div className="flex flex-col gap-1 px-4 pb-5">
                <p className="text-sm text-white">{name}</p>
                <p className="text-sm text-white">
                    {price} {tokenSymbol}
                </p>
                <p className="text-xs text-gray-400">{category}</p>
            </div>
            <Link href={`/nft/${id}`}>
                <div className="hidden group-hover:flex absolute justify-center items-center bottom-0 bg-[#01F7FF] w-full h-12 rounded-b-2xl">
                    <p className="text-sm font-semibold text-center text-black">
                        View More
                    </p>
                </div>
            </Link>
        </div>
    );
};

const NFTList = () => {
    const nftsQuery = useNFTList({
        page: 1,
        page_size: 8,
        sort_by: "created",
    });

    if (nftsQuery.data) {
        const nftsData = nftsQuery.data?.data.data;

        if (nftsData !== undefined && nftsData.length > 0) {
            return (
                <div className="grid grid-cols-4 gap-x-6 gap-y-12">
                    {nftsData.map((nft: any) => (
                        <NFTCard
                            key={nft.sft_id}
                            id={nft.sft_id}
                            name={nft.name}
                            price={nft.price_per_query}
                            tokenSymbol={nft.token_symbol}
                            category={nft.category_name}
                        />
                    ))}
                </div>
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
    id: string | number;
    name: string;
    category: string;
    sftId: string;
};

const BotCard = ({ id, name, category, sftId }: BotCardProps) => {
    return (
        <div className="group relative flex flex-col gap-3 bg-[#222325] rounded-3xl">
            <Image
                src="/images/bot-default-thumb.png"
                className="rounded-t-2xl p-1"
                width={300}
                height={200}
                alt={"Bot Card"}
            />
            <div className="flex flex-col gap-2 px-4 pb-8">
                <p className="text-md text-white">{name}</p>
                <p className="text-xs text-gray-400">{category}</p>
            </div>
            <div className="hidden group-hover:flex divide-x-2 divide-[#01F7FF] absolute bottom-0 bg-[#222325] border border-[#01F7FF] border-2 text-[#01F7FF] w-full h-12 rounded-b-2xl">
                <Link
                    className="hover:bg-[#01F7FF] hover:text-black flex-1 flex justify-center items-center rounded-bl-xl"
                    href={`/nft/${sftId}`}
                >
                    <p className="text-sm font-semibold text-center">
                        View More
                    </p>
                </Link>
                <Link
                    className="hover:bg-[#01F7FF] hover:text-black flex-1 flex justify-center items-center rounded-br-xl"
                    href={`/nft`}   // TODO: change to mint nft page
                >
                    <p className="text-sm font-semibold text-center">
                        Mint NFT
                    </p>
                </Link>
            </div>
        </div>
    );
};

const BotList = () => {
    const botsQuery = useChatbotList({
        page: 1,
        page_size: 8,
        sort_by: "created_at",
    });

    if (botsQuery.data) {
        const botsData = botsQuery.data?.data.data;

        if (botsData !== undefined && botsData.length > 0) {
            return (
                <div className="grid grid-cols-4 gap-x-6 gap-y-12">
                    {botsData.map((bot: any) => (
                        <BotCard
                            key={bot.chatbot_id}
                            id={bot.chatbot_id}
                            name={bot.name}
                            category={bot.category_name}
                            sftId={bot.sft_id}
                        />
                    ))}
                </div>
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

    useEffect(() => {
        document.title = title;
        setHeaderTitle(title);

        return () => setHeaderTitle("Default Title");
    }, []);

    return (
        <div className="flex flex-col gap-24 sm:px-6 lg:px-8 py-8 pb-32 bg-[#292D32]">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-semibold text-white">
                        My NFTs
                    </h1>
                    <hr className="my-4 border border-gray-700" />
                </div>
                <NFTList />
            </div>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-semibold text-white">
                        My Bots
                    </h1>
                    <hr className="my-4 border border-gray-700" />
                </div>
                <BotList />
            </div>
        </div>
    );
}
