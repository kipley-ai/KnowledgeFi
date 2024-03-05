"use client";
import { useAccount } from "wagmi";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Step1 from "./step-1";
import Step2 from "./step-2";
import { useSession } from "next-auth/react";
import { useAppProvider } from "@/providers/app-provider";
import { useRouter, useSearchParams } from "next/navigation";
// import NFTForm from "./create-nft-form";
import { createKB } from "@/app/api/kb/helper";
import { useCreateChatbotContext } from "./create-knowledge-context";
import Local from "./local";
import Notion from "./notion";
import ModalLoginTwitter from "@/components/modal-login-twitter";
import OnboardingProgress from "./onboarding-progress";
import { KF_TITLE } from "@/utils/constants";

export type PossibleOption =
  | "files"
  | "twitter"
  | "notion"
  | "substack"
  | "medium"
  | "mirror"
  | "api"
  | "";

export interface UIFile {
  filename: string;
  size: number;
  status: "uploading" | "failed" | "success";
  bucketPath: string;
  link: string;
  aborter: AbortController | null;
}

export default function SelectDataElements() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextStep = searchParams.get("nextStep");
  const nextType = searchParams.get("nextType");

  const title = KF_TITLE + "Create Knowledge Assets";
  const { setHeaderTitle } = useAppProvider();

  useEffect(() => {
    document.title = title;
    setHeaderTitle("");

    return () => setHeaderTitle("Default Title");
  }, []);

  const [selectedButton, setSelectedButton] = useState<PossibleOption>("");
  const [localFiles, setLocalFiles] = useState<UIFile[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { status: twitterStatus } = useSession();
  const { modalLogin: showTwitterLogin, setModalLogin: setShowTwitterLogin } =
    useAppProvider();

  const { isComingSoon, step, setStep, handleChangeKb } =
    useCreateChatbotContext();

  const comingSoon: PossibleOption[] = ["notion"];

  const handleContinue = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (comingSoon.includes(selectedButton)) return;

    if (selectedButton == "twitter") {
      if (twitterStatus != "authenticated") {
        setShowTwitterLogin(true);
        // sessionStorage.setItem("mintNFTRedirect", "true");
      } else {
        setStep("mint_nft");
      }
    } else if (selectedButton == "notion") {
      setStep("notion");
    } else if (selectedButton == "files") {
      setStep("upload_files");
    }
  };

  // const mintNFTRedirect = sessionStorage.getItem("mintNFTRedirect");

  // if (mintNFTRedirect === "true" && twitterStatus == "authenticated") {
  // setStep("mint_nft"); // sessionStorage.removeItem("mintNFTRedirect");
  // }
  if (nextStep && nextStep !== "" && nextType && nextType !== "") {
    handleChangeKb("type", nextType);
    setStep(nextStep);
    router.push("/onboarding");
  }

  return (
    <>
      <ModalLoginTwitter
        isOpen={showTwitterLogin}
        setIsOpen={setShowTwitterLogin}
        redirectUrl="/onboarding?nextStep=mint_nft&nextType=twitter"
      />
      {step == "data_source" ? (
        <div className="flex flex-col px-6 pb-20 lg:px-8 xl:px-32">
          <OnboardingProgress step={1} />

          <div className="mt-3 flex items-center gap-6">
            {/* <div className="h-full">
              <Image src={"/images/corner-up-left.png"} alt="icon" width={24} height={24} />
            </div> */}
            <h1 className="text-2xl font-semibold text-white">
              SELECT DATA ELEMENTS
            </h1>
          </div>
          <hr className="my-4 border border-gray-600" />
          <Step1
            selectedButton={selectedButton}
            setSelectedButton={setSelectedButton}
          />
          <div className="flex justify-end">
            {isComingSoon && (
              <button
                className="mt-8 flex flex-row items-center justify-between gap-2 rounded-sm bg-[#01F7FF] px-5 py-3 hover:brightness-75"
                type="submit"
                onClick={handleContinue}
              >
                <h5 className="text-sm text-black">
                  {isComingSoon ? "COMING SOON" : "CONTINUE"}
                </h5>
                {!isComingSoon ? (
                  <Image
                    src={"/images/arrow-right.svg"}
                    alt="icon"
                    width={24}
                    height={24}
                  />
                ) : null}
              </button>
            )}
          </div>
        </div>
      ) : step == "upload_files" ? (
        <>
          <OnboardingProgress step={1} />
          <Local files={localFiles} setFiles={setLocalFiles} />
        </>
      ) : step == "notion" ? (
        <>
          <OnboardingProgress step={1} />
          <Notion closeModal={closeModal} />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
