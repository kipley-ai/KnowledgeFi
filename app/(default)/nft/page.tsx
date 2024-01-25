"use client";
import { useAppProvider } from "@/providers/app-provider";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LoadMoreButton from "@/components/load-more-button";

type NFTCardProps = {
    id: string | number;
};

const NFTCard = ({ id }: NFTCardProps) => {
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
                <p className="text-sm text-white">Lil Pudgy #9946</p>
                <p className="text-sm text-white">1.819 ETH</p>
                <p className="text-xs text-gray-400">Category</p>
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
};

const BotCard = ({ id }: BotCardProps) => {
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
                <p className="text-md text-white">Immaterial Adana</p>
                <p className="text-xs text-gray-400">Category</p>
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

export default function NFT() {
    const title = "My NFT";
    const { setHeaderTitle } = useAppProvider();

    const NFTCards = Array.from({ length: 8 }, (_, index) => (
        <NFTCard key={index} id={index} />
    ));

    const BotCards = Array.from({ length: 8 }, (_, index) => (
        <BotCard key={index} id={index} />
    ));

    const handleLoadMore = () => {
        console.log("Load More");
    };

    useEffect(() => {
        document.title = title;
        setHeaderTitle(title);

        return () => setHeaderTitle("Default Title");
    }, []);

    return (
        <div className="flex flex-col gap-24 sm:px-6 lg:px-8 py-8 pb-32 bg-[#292D32]">
            <div className="flex flex-col gap-8">
                <h1 className="text-2xl font-semibold text-white">My NFT</h1>
                <div className="grid grid-cols-4 gap-x-6 gap-y-12">
                    {NFTCards}
                </div>
                <div className="flex justify-center">
                    <LoadMoreButton onClick={() => handleLoadMore()}>
                        Load more
                    </LoadMoreButton>
                </div>
            </div>
            <div className="flex flex-col gap-8">
                <h1 className="text-2xl font-semibold text-white">My Bots</h1>
                <div className="grid grid-cols-4 gap-x-6 gap-y-12">
                    {BotCards}
                </div>
                <div className="flex justify-center">
                    <LoadMoreButton onClick={() => handleLoadMore()}>
                        Load more
                    </LoadMoreButton>
                </div>
            </div>
        </div>
    );
}
