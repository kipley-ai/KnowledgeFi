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
          width={300}
          height={300}
        />
      </div>
      <div>
        <h1 className="text-center text-3xl font-bold md:text-left md:text-4xl">
          {nftDetail.name}
        </h1>
        <p className="my-4 text-center text-sm md:text-left">
          {nftDetail.description}
        </p>
        <div className="flex divide-x divide-[#474D54] md:flex-col md:divide-none">
          <div className="flex w-1/2 gap-3 md:mb-4">
            <div>
              <Image
                width={40}
                height={40}
                className=""
                src={defaultAvatar}
                alt="creator image"
              />
            </div>
            <div>
              <h2 className="text-sm text-[#93989A]">Creator</h2>
              <h1 className="text-sm font-semibold">
                {nftDetail.wallet_addr!.substring(0, 6) +
                  "..." +
                  nftDetail.wallet_addr!.substring(
                    nftDetail.wallet_addr!.length - 6,
                  )}
              </h1>
            </div>
          </div>
          <div className="px-4 md:px-0">
            <h4 className="text-sm text-[#93989A]">Withdrawable Amount</h4>
            <h1 className="text-md font-semibold md:text-lg">0 $KFI</h1>
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
            width={60}
            height={60}
            src={chatbotDetail.profile_image}
            alt="chatbot image"
          />
          <h1 className="text-2xl font-semibold md:text-3xl">
            {chatbotDetail.name}
          </h1>
        </div>
        <div>
          <Link href={"/chatbot/" + chatbotDetail.chatbot_id + "/edit"}>
            <button className="flex items-center rounded-full border border-[#01F7FF] px-5 py-1 text-sm font-semibold text-[#01F7FF]">
              <svg
                className="mr-1"
                width="12"
                height="11"
                viewBox="0 0 15 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.4274 0.513214L9.10264 1.83799L12.6609 5.39627L13.9857 4.07149C14.67 3.38721 14.67 2.27867 13.9857 1.59438L12.9073 0.513214C12.223 -0.171071 11.1144 -0.171071 10.4302 0.513214H10.4274ZM8.48405 2.45658L2.10377 8.83959C1.81911 9.12425 1.61109 9.47735 1.49613 9.86328L0.527182 13.1561C0.458753 13.3887 0.521707 13.6378 0.69141 13.8075C0.861113 13.9772 1.11019 14.0402 1.34011 13.9745L4.63289 13.0055C5.01883 12.8906 5.37192 12.6825 5.65658 12.3979L12.0423 6.01486L8.48405 2.45658Z"
                  fill="#01F7FF"
                />
              </svg>
              Edit
            </button>
          </Link>
        </div>
      </div>
      <div className="col-span-1 text-sm text-[#FCFCFC]">
        <p className="mb-4">{chatbotDetail.description}</p>
        <div className="mb-2 grid grid-cols-1 gap-2 text-[#FCFCFC]">
          <div className="flex justify-between border-b border-[#393E44] pb-2">
            <p className="font-semibold text-[#7C878E]">Date Created</p>
            <p className="font-semibold">
              {chatbotDetail.created_at?.substring(0, 10)}
            </p>
          </div>
          <div className="flex justify-between border-b border-[#393E44] pb-2">
            <p className="font-semibold  text-[#7C878E]">Category</p>
            <p className="font-semibold">{chatbotDetail.category_name}</p>
          </div>
          <div className="flex justify-between border-b border-[#393E44] pb-2">
            <p className="font-semibold  text-[#7C878E]">Creator</p>
            <p className="font-semibold">
              {chatbotDetail.wallet_addr!.substring(0, 6) +
                "..." +
                chatbotDetail.wallet_addr!.substring(
                  chatbotDetail.wallet_addr!.length - 6,
                )}
            </p>
          </div>
        </div>
        <p className="mb-2 mt-2 font-semibold text-[#7C878E]">Instructions</p>
        <p className="text-sm font-medium">{chatbotDetail.instruction}</p>
      </div>
      <div className="col-span-1 rounded-xl bg-[#1A1D1F] p-6 text-sm font-semibold ">
        <h1 className="mb-4 text-xl font-semibold">Knowledge Asset Info</h1>
        <div className="grid grid-cols-1 gap-2 text-[#FCFCFC]">
          <div className="flex justify-between border-b border-[#2e2e2e] pb-2">
            <p className="font-semibold text-[#6F767E]">Name</p>
            <p className="font-medium">{kbDetail?.name}</p>
          </div>
          <div className="flex justify-between border-b border-[#2e2e2e] pb-2">
            <p className="font-semibold text-[#6F767E]">Description</p>
            <p className="font-medium">{kbDetail?.description}</p>
          </div>
          <div className="flex justify-between border-b border-[#2e2e2e] pb-2">
            <p className="text-[#6F767E]">Date Created</p>
            <p className="font-medium">
              {kbDetail?.created_at?.substring(0, 10)}
            </p>
          </div>
          <div className="flex justify-between pb-2">
            <p className="text-[#6F767E]">Price</p>
            <p className="font-medium">{kbDetail?.price}</p>
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
    <div className="flex h-full flex-col divide-y-2 divide-[#474D54] bg-[#292D32] p-5 lg:p-12">
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
