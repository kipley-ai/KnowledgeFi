"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useCreateChatbotContext } from "../create-knowledge-context";
import Welcome from "./welcome";
import InviteCode from "./invite-code";
import Onboarding04 from "../onboarding-04";
import Onboarding05 from "../onboarding-05";
import Onboarding06 from "../onboarding-06";
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
          <Onboarding04 />
        ) : step == "mint_nft" ? (
          <Onboarding05 />
        ) : step == "create_chatbot" ? (
          <Onboarding06 />
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
