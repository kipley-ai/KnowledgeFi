"use client";
import { useAccount } from "wagmi";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppProvider } from "@/providers/app-provider";
import { useRouter } from "next/navigation";
// import NFTForm from "./create-nft-form"
// app\(default)\knowledge\create\create-nft-form.tsx;
import { createKB } from "@/app/api/kb/helper";
import ModalLoginTwitter from "@/components/modal-login-twitter";
// import OnboardingProgress from "../onboarding-progress";
import SuccessIcon from "public/images/check-icon.svg";
import Image from "next/image";
import Onboarding04 from "../onboarding-04";
import { useCreateChatbotContext } from "../create-knowledge-context";
import Onboarding05 from "../onboarding-05";
import Onboarding06 from "../onboarding-06";

export default function Onboarding() {
  const [showModal, setShowModal] = useState(true);
  const [nftIdCreated, setNftIdCreated] = useState("");
  
  const { isComingSoon, step, setStep } = useCreateChatbotContext();

  console.log(step)
  return (
    // <div className="flex flex-col py-10 pb-20 px-6 lg:px-8 xl:px-32">
    <>
      {step == "data_source" || step == "upload_files" || step == "notion" ? (
          <Onboarding04 />
        ) : step == "mint_nft" ? (
          <Onboarding05 />
        ) : <Onboarding06 />
      }
    </>
    // </div>
  )
}
