"use client";

import { useQueries } from "@tanstack/react-query";
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
import { redirect, useRouter } from "next/navigation";

export default function Onboarding() {
  const sign = localStorage.getItem("kip-protocol-signature");
  const { address, status } = useAccount();
  const { verifStatus } = useAppProvider();

  const { step } = useCreateChatbotContext();

  const { data: userDetail, isLoading } = useUserDetail();

  if (isLoading) return null;

  if (status === "connected" && userDetail?.data.data.onboarding) {
    return redirect("/dashboard");
  }

  if (verifStatus === "authenticated" || sign) {
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
