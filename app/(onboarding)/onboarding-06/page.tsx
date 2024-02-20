"use client";
import { useAccount } from "wagmi";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppProvider } from "@/providers/app-provider";
import { useRouter } from "next/navigation";
// import NFTForm from "./create-nft-form"
// app\(default)\knowledge\create\create-nft-form.tsx;
import { createKB } from "@/app/api/kb/helper";
import { useCreateChatbotContext } from "./create-chatbot-context";
import ModalLoginTwitter from "@/components/modal-login-twitter";
import OnboardingProgress from "../onboarding-progress";
import ChatBotForm from "./create-chatbot-form";

export default function Onboarding06() {
  return (
    <div className="flex flex-col bg-[#292D32] py-10 pb-20 px-6 lg:px-8 xl:px-32">
          <OnboardingProgress step={3} />

          <ChatBotForm />
        </div>
  )
}
