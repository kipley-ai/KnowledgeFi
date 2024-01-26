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

type BotCardProps = {
    id: string | number;
    name: string;
    category: string;
};

const BotCard = ({ id, name, category }: BotCardProps) => {
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
                    href={`/bot/${id}`}
                >
                    <p className="text-sm font-semibold text-center">
                        View More
                    </p>
                </Link>
                <Link
                    className="hover:bg-[#01F7FF] hover:text-black flex-1 flex justify-center items-center rounded-br-xl"
                    href={`/bot/${id}/mint`}
                >
                    <p className="text-sm font-semibold text-center">
                        Mint NFT
                    </p>
                </Link>
            </div>
        </div>
    );
};

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
                <div className="flex gap-2 items-center">
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

export default function NFT() {
    const title = "My NFT";
    const { setHeaderTitle } = useAppProvider();

    const fetchNFTs = async () => {
        try {
            const response = await axios.post("/api/nft/list", {
                page: 1,
                page_size: 8,
                sort_by: "created",
            });
            // console.log("response.data NFT:>> ", response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchBots = async () => {
        try {
            const response = await axios.post("/api/chatbot/list", {
                page: 1,
                page_size: 8,
                sort_by: "created_at",
            });
            // console.log("response.data bot:>> ", response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const results = useQueries({
        queries: [
            { queryKey: ["nfts"], queryFn: fetchNFTs },
            { queryKey: ["bots"], queryFn: fetchBots },
        ],
    });

    const nftsResult = results[0];
    const botsResult = results[1];

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
                        My NFT
                    </h1>
                    <hr className="my-4 border border-gray-700" />
                </div>
                <div className="grid grid-cols-4 gap-x-6 gap-y-12">
                    {nftsResult.isLoading ? (
                        <div>Loading NFTs...</div>
                    ) : nftsResult.error ? (
                        <div>Error: {nftsResult.error.message}</div>
                    ) : nftsResult.data.data.length > 0 ? (
                        nftsResult.data.data.map((nft: any) => (
                            <NFTCard
                                key={nft.sft_id}
                                id={nft.sft_id}
                                name={nft.name}
                                price={nft.price_per_query}
                                tokenSymbol={nft.token_symbol}
                                category={nft.category}
                            />
                        ))
                    ) : (
                        <NoData item="NFT" url="/nft/create" />
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-semibold text-white">
                        My Bots
                    </h1>
                    <hr className="my-4 border border-gray-700" />
                </div>

                <div className="grid grid-cols-4 gap-x-6 gap-y-12">
                    {botsResult.isLoading ? (
                        <div>Loading Bots...</div>
                    ) : botsResult.error ? (
                        <div>Error: {botsResult.error.message}</div>
                    ) : botsResult.data.data.length > 0 ? (
                        botsResult.data.data.map((bot: any) => (
                            <BotCard
                                key={bot.chatbot_id}
                                id={bot.chatbot_id}
                                name={bot.name}
                                category={bot.category_id}
                            />
                        ))
                    ) : (
                        <NoData item="Bot" url="/chatbot/create" />
                    )}
                </div>
            </div>
        </div>
    );
}
