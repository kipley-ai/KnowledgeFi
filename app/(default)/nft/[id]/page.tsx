"use client";
import nft1 from "@/public/images/nft-1.png";
import Image from "next/image";
import user_avatar from "@/public/images/user-28-01.jpg";
import keyboard from "@/public/images/applications-image-23.jpg";
import { useAppProvider } from "@/providers/app-provider";
import { useEffect } from "react";
import link_nft_chatbot from "@/public/images/link-nft-chatbot.png";
import { useCallback, useState } from "react";
import { useNftDetail } from "@/hooks/api/nft";
import { useChatbotDetail } from "@/hooks/api/chatbot";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useKBDetail } from "@/hooks/api/kb";
import { useCreditBalance } from "@/hooks/api/credit";
import defaultAvatar from "@/public/images/avatar-default-02.svg";
import { FaSpinner } from "react-icons/fa6";

const NFTSection = ({ nftDetail }: { nftDetail: any }) => {
  return (
    <div className="grid grid-cols-1 gap-4 pb-4 text-white md:grid-cols-2 md:pb-12">
      <div className="mx-auto w-2/5 md:w-full">
        <Image
          className="rounded-xl"
          src={nftDetail.profile_image}
          alt="nft image"
          width={600}
          height={600}
        />
      </div>
      <div className="">
        <h1 className="text-center text-3xl font-bold md:text-left md:text-4xl">
          {nftDetail.name}
        </h1>
        <div className="border-t border-gray-300 my-4"></div>
        <div className="flex flex-row">
          <p className="text-center text-[#7C878E] text-sm md:text-left mr-2">
            SFT Owner
          </p>
          <p className="text-center text-[#00EBFF] text-sm md:text-left">
            {nftDetail.wallet_addr!.substring(0, 6) +
              "..." +
              nftDetail.wallet_addr!.substring(
                nftDetail.wallet_addr!.length - 6,
              )}
          </p>
        </div>
        <div className="flex flex-row">
          <p className="text-center text-[#7C878E] text-sm md:text-left mr-2">
            Created time
          </p>
          <p className="text-center text-white text-sm md:text-left">
            {nftDetail.created}
            {console.log(nftDetail)}
          </p>
        </div>
        <div className="mt-3">
          <a href="" className="flex flex-row">
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M21.5 11V5V3H19.5H13.5V5H17.5V7H15.5V9H13.5V11H11.5V13H9.5V15H11.5V13H13.5V11H15.5V9H17.5V7H19.5V11H21.5ZM11.5 5H5.5H3.5V7V19V21H5.5H17.5H19.5V19V13H17.5V19H5.5V7H11.5V5Z" fill="#7C878E" />
            </svg>
            <p className="ml-2 text-center text-[#00EBFF] text-sm md:text-left">
              View on OpenSea
            </p>
          </a>
        </div>
        <div className="border-t border-gray-300 my-4"></div>
        <div className="flex flex-grow justify-between mb-4">
          <h3 className="text-center text-xl font-bold md:text-left md:text-4xl">
            Data Info
          </h3>
          <button className="border border-[#00EBFF] text-white font-bold py-2 px-4 rounded inline-flex items-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M14.8 2H13.2L13.2 3.6H11.6V5.2H10V6.8H8.4V8.4H6.8V10H5.2V11.6H3.6V13.2L2 13.2V16.4V18H3.6H6.8V16.4L8.4 16.4V14.8H10V13.2L11.6 13.2V11.6H13.2V10H14.8V8.4H16.4V6.8H18V5.2H16.4L16.4 3.6H14.8V2ZM14.8 8.4H13.2L13.2 10H11.6V11.6H10V13.2H8.4V14.8H6.8V13.2L5.2 13.2V11.6H6.8V10H8.4V8.4H10V6.8H11.6V5.2H13.2L13.2 6.8H14.8V8.4ZM5.2 13.2H3.6V16.4H6.8V14.8H5.2V13.2Z" fill="#00EBFF" />
            </svg>
            <span>Manage Data</span>
          </button>
        </div>
        <div className="bg-[#1D1D1D] p-4 rounded mt-2">
          <div className="flex flex-grow justify-between">
            <span className="block text-[#7C878E] text-sm font-bold">Data Type</span>
            <span className="block text-white text-sm">{nftDetail.type}</span>
          </div>
        </div>
        <div className="bg-[#1D1D1D] p-4 rounded mt-2">
          <div className="flex flex-grow justify-between">
            <span className="block text-[#7C878E] text-sm font-bold">Data Files Count</span>
            <span className="block text-white text-sm"></span>
          </div>
        </div>
        <div className="bg-[#1D1D1D] p-4 rounded mt-2">
          <div className="flex flex-grow justify-between">
            <span className="block text-[#7C878E] text-sm font-bold">Last Updated</span>
            <span className="block text-sm">{nftDetail.created_at}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatbotSection = ({
  chatbotDetail,
  kbDetail,
}: {
  chatbotDetail: any;
  kbDetail: any;
}) => {
  return (
    <div className="grid grid-cols-1 gap-x-12 gap-y-8 pt-4 text-white md:grid-cols-2 md:gap-y-4 md:pt-12 xl:gap-x-20">
      <div className="flex items-center justify-between gap-4 md:col-span-2">
        <div className="flex items-center">
          <Image
            className="mr-3 rounded-lg object-cover"
            width={120}
            height={120}
            src={chatbotDetail.profile_image}
            alt="chatbot image"
          />
          <h1 className="text-6xl font-semibold md:text-3xl">
            {chatbotDetail.name}
            {console.log(chatbotDetail)}
          </h1>
        </div>
        <div>
          <Link href={"/chatbot/" + chatbotDetail.chatbot_id + "/edit"}>
            <button className="border border-[#00EBFF] text-white font-bold py-2 px-4 rounded inline-flex items-start">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.8 2H13.2L13.2 3.6H11.6V5.2H10V6.8H8.4V8.4H6.8V10H5.2V11.6H3.6V13.2L2 13.2V16.4V18H3.6H6.8V16.4L8.4 16.4V14.8H10V13.2L11.6 13.2V11.6H13.2V10H14.8V8.4H16.4V6.8H18V5.2H16.4L16.4 3.6H14.8V2ZM14.8 8.4H13.2L13.2 10H11.6V11.6H10V13.2H8.4V14.8H6.8V13.2L5.2 13.2V11.6H6.8V10H8.4V8.4H10V6.8H11.6V5.2H13.2L13.2 6.8H14.8V8.4ZM5.2 13.2H3.6V16.4H6.8V14.8H5.2V13.2Z" fill="#00EBFF" />
              </svg>
              <span>Manage Chatbot</span>
            </button>
          </Link>
        </div>
      </div>
      <div className="col-span-1 text-sm text-[#FCFCFC]">
        <p className="mb-4">{chatbotDetail.description}</p>
      </div>
      <div className="text-sm font-semibold">
        <div className="bg-[#1D1D1D] p-4 rounded mt-2">
          <div className="flex flex-grow justify-between">
            <span className="block text-[#7C878E] text-sm font-bold">Chatbot Owner</span>
            <span className="block text-white text-sm">
              {chatbotDetail.wallet_addr!.substring(0, 6) +
                "..." +
                chatbotDetail.wallet_addr!.substring(
                  chatbotDetail.wallet_addr!.length - 6,
                )}</span>
          </div>
        </div>
        <div className="bg-[#1D1D1D] p-4 rounded mt-2">
          <div className="flex flex-grow justify-between">
            <span className="block text-[#7C878E] text-sm font-bold">Created Time</span>
            <span className="block text-white text-sm">{chatbotDetail.created_at}</span>
          </div>
        </div>
        <div className="bg-[#1D1D1D] p-4 rounded mt-2">
          <div className="flex flex-grow justify-between">
            <span className="block text-[#7C878E] text-sm font-bold">Last Updated</span>
            <span className="block text-sm">{chatbotDetail.last_updated}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const NoNFT = () => {
  return (
    <div className="h-full pb-4 md:pb-10">
      <div className="relative  w-full rounded-3xl bg-[#151515]">
        <Image
          className=" w-full rounded-3xl"
          src={link_nft_chatbot}
          alt={"background"}
        />
        <div
          className="flex w-4/5 flex-col items-center"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <h1 className="mb-[2px] text-center text-xl font-semibold text-white md:text-4xl xl:text-[48px]">
            Unlock the power of Web3
          </h1>
          <h1 className="font-regular text-center text-sm text-white md:mb-[30px] md:text-[18px]">
            Meet our AI chat app revolutionizing conversations
          </h1>
          <h1 className="w-fit rounded-full bg-[#01F7FF] px-8 py-1 text-xs font-semibold text-[#292D32] md:py-3 md:text-base">
            Mint your SFT
          </h1>
        </div>
      </div>
    </div>
  );
};

const NoChatbot = () => {
  // const [imageRef, { width:imageWidth, height:imageHeight }] = useElementSize()
  // const [containerRef, { width:containerWidth, height:containerHeight }] = useElementSize()
  const { id } = useParams();
  return (
    <div className="h-full pt-4 md:pt-10">
      <div className="relative w-full rounded-3xl bg-[#151515]">
        <Image
          className=" w-full rounded-3xl"
          src={link_nft_chatbot}
          alt={"background"}
        />
        <div
          className="flex w-full flex-col items-center gap-4"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* <h1 className="text-center text-xl font-extrabold text-white md:text-4xl xl:mb-[30px] xl:text-[48px]">
            Connect with AI Chat Bot
          </h1> */}
          <Link href={"/nft/" + id + "/create-chatbot"}>
            {/* <h1 className="w-fit rounded-full bg-[#01F7FF] px-8 py-1 text-xs font-semibold text-[#292D32] md:py-3 md:text-base"> */}
            <h1 className="w-fit rounded-full bg-[#01F7FF] px-8 py-1 text-xs font-semibold text-[#292D32] md:py-3 md:text-2xl">
              Link Your SFT to Chatbot
            </h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

const NFTDetail = ({ params }: { params: any }) => {
  const { setHeaderTitle } = useAppProvider();
  useEffect(() => {
    setHeaderTitle("My SFT");
  }, []);
  const { id } = params;

  const nftQuery = useNftDetail({ sft_id: id });

  const chatbotQuery = useChatbotDetail({
    chatbot_id: nftQuery.data?.data.data.chatbot_id as string,
  });

  const { data: kbDetail } = useKBDetail({
    kb_id: nftQuery.data?.data.data.kb_id as string,
  });

  return (
    <div className="flex h-full flex-col divide-y-2 divide-[#474D54] bg-[#151515] p-5 lg:p-12">
      {nftQuery.isPending ? (
        <div className="flex h-[45vh] w-full items-center justify-center gap-4">
          <FaSpinner size={20} className="animate-spin" />
          <p className="text-md text-gray-300">Loading</p>
        </div>
      ) : nftQuery.isError ? (
        <div>Error: {nftQuery.error.message}</div>
      ) : nftQuery.data ? (
        <NFTSection nftDetail={nftQuery.data?.data.data} />
      ) : (
        <NoNFT />
      )}

      {chatbotQuery.isLoading ? (
        <div className="flex h-[50vh] w-full items-center justify-center gap-4">
          <FaSpinner size={20} className="animate-spin" />
          <p className="text-md text-gray-300">Loading</p>
        </div>
      ) : chatbotQuery.isError ? (
        <div>Error: {chatbotQuery.error.message}</div>
      ) : chatbotQuery.data?.data?.data ? (
        <ChatbotSection
          chatbotDetail={chatbotQuery.data?.data.data}
          kbDetail={kbDetail?.data.data}
        />
      ) : (
        <NoChatbot />
      )}
    </div>
  );
};
export default NFTDetail;
