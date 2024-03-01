"use client";
import React, { useState } from "react";
import OnboardingProgress from "./onboarding-progress";
import Image from "next/image";
import CheckIcon from "public/images/double-check.svg";
import OnboardingSuccessImage from "public/images/onboarding-success.gif";
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
    <div className="flex flex-col justify-center px-6 pb-20 pt-6 lg:px-8 xl:px-32">
      <OnboardingProgress step={4} />
      <div
        className={`flex w-[610px] flex-col items-center justify-center self-center rounded-2xl px-7 py-12 text-white ${dmsans.className} font-semibold`}
      >
        <div
          style={{
            backgroundImage: `url(${OnboardingSuccessImage.src})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "223px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p className="font-mono text-5xl font-semibold text-white">
            Well done!
          </p>
        </div>
        <div
          className={`flex flex-row ${poppins.className} my-8 items-center justify-center text-sm`}
        >
          <Image
            height={12}
            width={22}
            src={CheckIcon}
            alt="check icon"
            className="mr-4"
          />
          <h1 className="font-mono text-base font-semibold">
            Your Knowledge Asset is created successfully!
          </h1>
        </div>
        <div className="flex w-full justify-center">
          <button
            onClick={() => router.push("/dashboard")}
            className="font-mono rounded-full bg-[#353945] px-12 py-4 text-base font-bold text-[#01F7FF]"
          >
            Enter KnowledgeFi Homepage
          </button>
        </div>
      </div>
    </div>
  );
}
