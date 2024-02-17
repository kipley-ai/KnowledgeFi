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
import { PossibleOption } from "./page";

const ButtonItem = ({
  onClick,
  isSelected,
  optionIcon,
  optionText,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isSelected: boolean;
  optionIcon: ImageSrc;
  optionText: string;
}) => {
  return (
    <button
      className={`flex flex-col items-center border-2 py-5 md:pt-10 ${isSelected ? "border-[#01F7FF] bg-[#181B1F]" : "border-transparent"} justify-end rounded-2xl`}
      onClick={onClick}
    >
      <Image
        width={48}
        height={48}
        src={optionIcon}
        alt={`${optionText} Icon`}
      />
      <h3 className="pt-6">{optionText}</h3>
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
    text: "Upload files",
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
  const { handleChangeKb, setIsComingSoon } = useCreateChatbotContext();

  return (
    <div className="md:mt-10 grid grid-cols-2 md:grid-cols-4 gap-4  font-bold text-white">
      {buttons.map((button) => (
        <ButtonItem
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            handleChangeKb("type", button.type);
            setSelectedButton(button.type);
            setIsComingSoon(button.comingSoon);
          }}
          isSelected={selectedButton == button.type}
          optionIcon={button.icon}
          optionText={button.text}
        />
      ))}
    </div>
  );
}
