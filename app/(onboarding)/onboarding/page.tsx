"use client";
import React, { useState, useEffect } from "react";
import Onboarding04 from "../onboarding-04";
import { useCreateChatbotContext } from "../create-knowledge-context";
import Onboarding05 from "../onboarding-05";
import Onboarding06 from "../onboarding-06";

export default function Onboarding() {  
  const { isComingSoon, step, setStep } = useCreateChatbotContext();

  return (
    // <div className="flex flex-col py-10 pb-20 px-6 lg:px-8 xl:px-32">
    <>
      {step == "data_source" || step == "upload_files" || step == "notion" ? (
          <Onboarding04 />
        ) : step == "mint_nft" ? (
          <Onboarding05 />
        ) :  step == "create_chatbot" ? (
          <Onboarding06 />
        ) : <></>
      }
    </>
    // </div>
  )
}