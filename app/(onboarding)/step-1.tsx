"use client";
import XIcon from "public/images/X-icon.svg";
import NotionIcon from "public/images/notion.svg";
import FolderAddIcon from "public/images/knowledge-source/folder-add.png";
import MirrorIcon from "public/images/knowledge-source/mirror-icon.png";
import SubstackIcon from "public/images/knowledge-source/substack-icon.svg";
import MediumIcon from "public/images/knowledge-source/medium-icon.png";
import ApiIcon from "public/images/knowledge-source/api-icon.svg";
import Image from "next/image";
import { useCreateChatbotContext } from "./create-knowledge-context";
import React, { useState } from "react";
import { ImageSrc, ReactSetter } from "@/lib/aliases";
import { PossibleOption } from "./select-data-elements";
import { useSession } from "next-auth/react";
import { useAppProvider } from "@/providers/app-provider";

const ButtonItem = ({
  onClick,
  isSelected,
  optionIcon,
  optionText,
  isComingSoon,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isSelected: boolean;
  optionIcon: ImageSrc;
  optionText: string;
  isComingSoon: boolean;
}) => {
  return (
    <button
      className={`relative flex flex-col items-center border-2 py-5 md:mt-4 ${isSelected ? "border-[#01F7FF]" : "border-transparent"} justify-end rounded-md`}
      onClick={onClick}
    >
      <Image
        width={36}
        height={36}
        src={optionIcon}
        className={isComingSoon ? "brightness-50" : ""}
        alt={`${optionText} Icon`}
      />
      <h3 className="pt-6">{optionText}</h3>
      {isComingSoon && isSelected && (
        <span className="absolute right-1 top-1 rounded-sm border border-aqua-700 bg-aqua-700 px-2 text-xs text-black">
          COMING SOON
        </span>
      )}
    </button>
  );
};

const buttons = [
  {
    type: "twitter",
    icon: XIcon,
    text: "Twitter",
    comingSoon: false,
  },
  {
    type: "notion",
    icon: NotionIcon,
    text: "Notion",
    comingSoon: true,
  },
  {
    type: "substack",
    icon: SubstackIcon,
    text: "Substack",
    comingSoon: true,
  },
  {
    type: "medium",
    icon: MediumIcon,
    text: "Medium",
    comingSoon: true,
  },
  {
    type: "mirror",
    icon: MirrorIcon,
    text: "Mirror",
    comingSoon: true,
  },
  {
    type: "files",
    icon: FolderAddIcon,
    text: "Upload Files",
    comingSoon: false,
  },
  {
    type: "api",
    icon: ApiIcon,
    text: "Customized API",
    comingSoon: true,
  },
  // Add more buttons here...
];

export default function Step1({
  selectedButton,
  setSelectedButton,
}: {
  selectedButton: string;
  setSelectedButton: Function;
}) {
  const { status: twitterStatus } = useSession();
  const { modalLogin: showTwitterLogin, setModalLogin: setShowTwitterLogin } =
    useAppProvider();

  const { handleChangeKb, setIsComingSoon, setStep } =
    useCreateChatbotContext();

  return (
    <div className="grid grid-cols-2 gap-4 font-bold text-white  md:mt-4 md:grid-cols-4">
      {buttons.map((button) => (
        <ButtonItem
          key={button.type}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            handleChangeKb("type", button.type);
            setSelectedButton(button.type);
            setIsComingSoon(button.comingSoon);

            if (button.type == "twitter") {
              if (twitterStatus != "authenticated") {
                setShowTwitterLogin(true);
                sessionStorage.setItem("mintNFTRedirect", "true");
              } else {
                setStep("mint_nft");
              }
            } else if (button.type == "files") {
              setStep("upload_files");
            }
          }}
          isSelected={selectedButton == button.type}
          optionIcon={button.icon}
          optionText={button.text}
          isComingSoon={button.comingSoon}
        />
      ))}
    </div>
  );
}
