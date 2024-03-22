"use client";

import React from "react";
import ModalBlank from "@/components/modal-blank-3";
import Image from "next/image";
import { useSwitchToSepolia, useSwitchToPolygon, useSwitchToEthereum } from "@/hooks/useSwitchNetwork";

export default function ModalMintConfirmation({
  isOpen,
  setIsOpen,
  nftImage,
  handleMintNFT,
  isMinting,
}: {
  isOpen: boolean;
  setIsOpen: any;
  nftImage: string;
  handleMintNFT: () => void;
  isMinting?: boolean;
}) {

  // Determine the environment and accordingly use the switch network hook
  const isDevelopment = process.env.NEXT_PUBLIC_ENV_DEV === "1";
  const { isSepolia, switchToSepolia } = useSwitchToSepolia();
  const { isEthereum, switchToEthereum } = useSwitchToEthereum();

  // Determine which network is currently active and which switch function to use
  const isTargetNetworkActive = isDevelopment ? isSepolia : isEthereum;
  const switchToTargetNetwork = isDevelopment ? switchToSepolia : switchToEthereum;
  const targetNetworkName = isDevelopment ? "Sepolia" : "Ethereum";

  return (
    <ModalBlank isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex flex-col items-center justify-between rounded-lg p-4 shadow-md">
        <div className="inline-flex items-center justify-between self-stretch p-5">
          <div className="w-80 text-[32px] font-semibold leading-10 text-gray-50">
            <span>Mint your SFT</span>
          </div>
          <button
            className="text-[#FCFCFD] hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
            <div className="sr-only">Close</div>
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1"
                y="1"
                width="38"
                height="38"
                rx="19"
                stroke="#353945"
                stroke-width="2"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
                fill="#FCFCFD"
              />
            </svg>
          </button>
        </div>
        <div className="my-4">
          <Image
            src={nftImage}
            alt="NFT Image"
            width={150}
            height={150}
            className="rounded-lg"
          />
        </div>
        <div className="text-md inline-flex items-end justify-between self-stretch p-5 pt-2 text-white">
          <div className="">
            <span>Price:</span>
          </div>
          <div className="inline-flex w-1/2 items-end justify-end gap-2">
            <span className="text-2xl font-extrabold leading-tight text-aqua-700">
              FREE
            </span>
            <span className="line-through">50$KFI</span>
          </div>
        </div>
        <span className="text-lg italic text-aqua-700">
          🔥 Limited-Time Promotion: Zero Platform Fee
        </span>
        <div className="inline-flex items-center justify-between self-stretch p-5">
          <div className="grid w-full grid-cols-1 font-bold text-white">
            {/* Start the conditional rendering here */}
            {!isTargetNetworkActive ? (
              <button
                className="flex flex-row items-center justify-center gap-2 rounded-3xl bg-aqua-700 p-2 px-5 hover:brightness-75"
                onClick={switchToTargetNetwork}
              >
                <span className="text-black font-semibold">Change Network to {targetNetworkName}</span>
                <svg
                  width="20"
                  height="10"
                  viewBox="0 0 20 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.98 5.7901C18.8936 5.7901 19.6343 6.53075 19.6343 7.44439V7.44439C19.6343 8.35803 18.8936 9.09868 17.98 9.09868L1.65435 9.09868C0.74071 9.09868 5.90253e-05 8.35803 5.90618e-05 7.44439V7.44439C5.90983e-05 6.53075 0.740711 5.7901 1.65435 5.7901L17.98 5.7901Z"
                    fill="#151515"
                  />
                  <path
                    d="M18.932 5.9907C19.5219 6.63674 19.5219 7.68418 18.932 8.33022C18.3422 8.97626 17.3859 8.97626 16.7961 8.33022L12.3947 3.50927C11.8049 2.86322 11.8049 1.81578 12.3947 1.16974C12.9845 0.523702 13.9408 0.523702 14.5306 1.16974L18.932 5.9907Z"
                    fill="#151515"
                  />
                </svg>
              </button>
            ) : (
              <button
                className={`flex flex-row items-center justify-center gap-2 rounded-3xl text-black font-semibold ${isMinting ? 'bg-gray-500' : 'bg-aqua-700'} p-2 px-5 hover:brightness-75`}
                onClick={handleMintNFT}
                disabled={isMinting}
              >
                {isMinting ? "Minting..." : "Mint Now"}
              </button>
            )}
          </div>
        </div>
      </div>
    </ModalBlank>
  );
}
