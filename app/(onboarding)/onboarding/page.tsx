"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useCreateChatbotContext } from "../create-knowledge-context";
import Welcome from "./welcome";
import InviteCode from "./invite-code";
import Onboarding04 from "../onboarding-04";
import Onboarding05 from "../onboarding-05";
import Onboarding06 from "../onboarding-06";

export default function Onboarding() {
  const { isConnected } = useAccount();
  // const isConnected = true;

  const { isComingSoon, step, setStep } = useCreateChatbotContext();

  if (!isConnected) {
    return (
      <>
        <Welcome />
      </>
    );
  }

  return (
    // <div className="flex flex-col py-10 pb-20 px-6 lg:px-8 xl:px-32">
    <>
      {step == "data_source" || step == "upload_files" || step == "notion" ? (
          <Onboarding04 />
        ) : step == "mint_nft" ? (
          <Onboarding05 />
        ) :  step == "create_chatbot" ? (
          <Onboarding06 />
        ) : <InviteCode />
      }
    </>
    // </div>
  )
}
