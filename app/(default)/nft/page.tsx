"use client";
import { useAppProvider } from "@/app/app-provider";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type NFTCardProps = {
    id: string | number;
};

const NFTCard = ({ id }: NFTCardProps) => {
    return (
        <div className="group relative flex flex-col bg-[#222325] rounded-2xl">
            <Image
                src="/images/nft-default-thumb.png"
                className="rounded-t-2xl p-2"
                width={300}
                height={300}
            />
            <div className="flex flex-col gap-1 px-4 pb-5">
                <p className="text-xs text-white">Lil Pudgy #9946</p>
                <p className="text-xs text-white">1.819 ETH</p>
                <p className="text-[11px] text-gray-400">Category</p>
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

export default function NFT() {
    const title = "My NFT";
    const { setHeaderTitle } = useAppProvider();

    const NFTCards = Array.from({ length: 8 }, (_, index) => (
        <NFTCard key={index} id={index} />
    ));

    useEffect(() => {
        document.title = title;
        setHeaderTitle(title);

        return () => setHeaderTitle("Default Title");
    }, []);

    return (
        <div className="flex flex-col gap-8 sm:px-6 lg:px-8 py-8 bg-[#292D32]">
            <h1 className="text-2xl font-semibold text-white">My NFT</h1>
            <div className="grid grid-cols-4 gap-x-6 gap-y-12">{NFTCards}</div>
        </div>
    );
}
