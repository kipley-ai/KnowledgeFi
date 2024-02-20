"use client";
import React, { useState } from "react";
import OnboardingProgress from "./onboarding-progress";
import Image from "next/image";
import CheckIcon from "public/images/check-icon.svg";
import { DM_Sans, Poppins } from "next/font/google";
import { useRouter } from "next/navigation";

interface ToastProps {
  children: React.ReactNode;
  type?: "warning" | "error" | "success" | "";
  open: boolean;
  setOpen: (open: boolean) => void;
}

const dmsans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400"],
  subsets: ["latin"],
});

export default function OnboardingSuccess() {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center bg-[#292D32] px-6 pb-20 pt-6 lg:px-8 xl:px-32">
      <OnboardingProgress step={4} />
      <div
        className={`flex w-[410px] flex-col items-center justify-center self-center rounded-2xl px-7 py-12 text-white ${dmsans.className} font-semibold`}
      >
        <div className="flex w-full flex-row items-center justify-center">
          {/* <h2 className="text-3xl">Success</h2> */}
          <h1 className="text-5xl font-bold text-white">Yay! 🎉</h1>
        </div>
        <div
          className={`flex flex-row ${poppins.className} my-8 items-center justify-center text-sm`}
        >
          <Image
            className="mr-4 h-[30px] w-[30px]"
            src={CheckIcon}
            alt="check icon"
          />
          Your Knowledge Asset is created successfully
        </div>
        <div className="flex w-full">
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full rounded-3xl bg-[#353945] py-2 text-sm text-[#01F7FF]"
          >
            Enter KnowledgeFi Homepage
          </button>
        </div>
      </div>
    </div>
  );
}
