"use client";

import { useQueries } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { useCreateChatbotContext } from "../create-knowledge-context";
import OnboardingHeader from "./header";
import Welcome from "./welcome";
import JetWelcome from "./(jet)/main";
import InviteCode from "./invite-code";
import SelectDataElements from "../select-data-elements";
import MintNFT from "../mint-nft";
import CreateChatbot from "../create-chatbot";
import OnboardingSuccess from "../onboarding-success";
import { useAppProvider } from "@/providers/app-provider";
import { useUserDetail } from "@/hooks/api/user";
import { redirect, useRouter } from "next/navigation";
import KipProtocolVideo from "../kip-protocol-video";
import { useState } from "react";
import FreeKFI from "../free-kfi-token";

import { useSwitchToPolygon, useSwitchToSepolia } from "@/hooks/useSwitchNetwork";

export default function Onboarding() {
  const sign = localStorage.getItem("kip-protocol-signature");
  const { address, status } = useAccount();
  const { verifStatus } = useAppProvider();

  const { step, welcomePage } = useCreateChatbotContext();

  const { data: userDetail, isLoading } = useUserDetail();

  const isDevelopment = process.env.NEXT_PUBLIC_ENV_DEV === "1";
  const { isSepolia, switchToSepolia } = useSwitchToSepolia();
  const { isPolygon, switchToPolygon } = useSwitchToPolygon();

  const isTargetNetworkActive = isDevelopment ? isSepolia : isPolygon;
  const switchToTargetNetwork = isDevelopment ? switchToSepolia : switchToPolygon;
  const targetNetworkName = isDevelopment ? "Sepolia" : "Polygon";

  if (isLoading) return null;

  if (status === "connected" && (sign || verifStatus === "authenticated")) {
    if (!isTargetNetworkActive) {
      switchToTargetNetwork();
    }

    if (
      userDetail?.data?.status !== "error" &&
      userDetail?.data?.data.onboarding
      // && (process.env.NEXT_PUBLIC_ENV_DEV == "1" ? false : true) // Dont skip onboarding in dev
    ) {
      return redirect("/dashboard");
    }

    return (
      // <div className="flex flex-col py-10 pb-20 px-6 lg:px-8 xl:px-32">
      <div className="flex flex-col gap-8">
        <OnboardingHeader />
        {step == "data_source" || step == "upload_files" || step == "notion" ? (
          <SelectDataElements />
        ) : step == "mint_nft" ? (
          <MintNFT />
        ) : step == "create_chatbot" ? (
          <CreateChatbot />
        ) : step == "free_kfi" ? (
          <FreeKFI />
        ) : step == "onboarding_success" ? (
          <OnboardingSuccess />
        ) : (
          <InviteCode address={address} />
        )}
      </div>
      // </div>
    );
  }

  if (welcomePage === "kip-video") {
    return <KipProtocolVideo />;
  }

  if (status === "disconnected") {
    return <JetWelcome />;
  }

}
