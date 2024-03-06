"use client";

import React from "react";
import ModalBlank from "@/components/modal-blank-3";
import Image from "next/image";
import CheckIcon from 'public/images/check-icon.svg';
import CrossIcon from "public/images/cross-icon.svg";

export default function ModalTopUpSuccessful({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: any;
}) {
  return (
    <ModalBlank isOpen={isOpen} setIsOpen={setIsOpen}>
      <div
        className={`flex w-[360px] flex-col items-center justify-center rounded-2xl bg-[#181B1F] px-7 py-10 text-white font-semibold`}
      >
        <div className="flex w-full flex-row items-center justify-between">
          <h2 className="text-xl">TOP UP SUCCESSFUL</h2>
          <Image
            className="h-[30px] w-[30px] cursor-pointer"
            src={CrossIcon}
            alt="cross icon"
            onClick={() => setIsOpen(false)}
          />
        </div>
        <div
          className={`flex flex-row my-7 items-center justify-center text-sm`}
        >
          <Image
            className="mr-4 h-[30px] w-[30px]"
            src={CheckIcon}
            alt="check icon"
          />
          <span>Your wallet has been successfully topped up</span>
        </div>
        <div className="flex w-full">
          <button className="mr-4 w-full rounded-3xl bg-[#353945] py-2 text-sm text-[#01F7FF]" onClick={() => setIsOpen(false)}>
              Close
          </button>
          {/* <button
            onClick={() =>
              router.push("/nft/" + "/create-chatbot")
            }
            className="w-full rounded-3xl bg-[#353945] py-2 text-sm text-[#01F7FF]"
          >
            Create Chatbot
          </button> */}
        </div>
      </div>
    </ModalBlank>
  );
}
