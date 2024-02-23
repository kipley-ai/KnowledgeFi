"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useCreateChatbotContext } from "../create-knowledge-context";
import Welcome from "./welcome";
import InviteCode from "./invite-code";
import SelectDataElements from "../select-data-elements";
import MintNFT from "../mint-nft";
import CreateChatbot from "../create-chatbot";
import OnboardingSuccess from "../onboarding-success";
import { useAppProvider } from "@/providers/app-provider";
import { useUserDetail } from "@/hooks/api/user";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const { isConnected, address, status } = useAccount();
  const { verifStatus } = useAppProvider();

  const { isComingSoon, step, setStep } = useCreateChatbotContext();

  const router = useRouter();

  const { data: userDetail } = useUserDetail();

  const onboarding = userDetail?.data.data.onboarding;
  if (onboarding && isConnected) {
    router.push("/dashboard");
  }

  if (isConnected && verifStatus === "authenticated") {
    return (
      // <div className="flex flex-col py-10 pb-20 px-6 lg:px-8 xl:px-32">
      <>
        {step == "data_source" || step == "upload_files" || step == "notion" ? (
          <SelectDataElements />
        ) : step == "mint_nft" ? (
          <MintNFT />
        ) : step == "create_chatbot" ? (
          <CreateChatbot />
        ) : step == "onboarding_success" ? (
          <OnboardingSuccess />
        ) : (
          <InviteCode address={address} />
        )}
      </>
      // </div>
    );
  }

  return (
    <>
      <Welcome />
    </>
  );
}
