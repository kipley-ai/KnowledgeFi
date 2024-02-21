"use client";

import ModalBlank from "@/components/modal-blank-2";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
// import fbLogo from '@/public/images/icon-facebook.svg'
import twtLogo from "@/public/images/logo-twitter.svg";
import { ReactSetter } from "@/lib/aliases";
// import emailLogo from '@/public/images/icon-linkedin.svg'

export default function ModalLoginTwitter({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: ReactSetter<boolean>;
}) {
  const handleLoginButton = () => {
    signIn("twitter");
  };

  return (
    <ModalBlank isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex flex-col items-center justify-between rounded-lg p-4 shadow-md">
        <div className="inline-flex items-center justify-between self-stretch p-5">
          <div className="w-80 text-3xl font-bold leading-10 text-gray-50">
            Upload your profile image
          </div>
          <button
            className="text-[#FCFCFD] hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
            <div className="sr-only">Close</div>
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1"
                y="1"
                width="38"
                height="38"
                rx="19"
                stroke="#E6E8EC"
                stroke-width="2"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
                fill="#FCFCFD"
              />
            </svg>
          </button>
        </div>
        <div className="flex max-w-full flex-col justify-center gap-5 py-5 md:w-96">
          <div className="flex flex-grow items-center justify-center rounded-3xl">
            <button
              onClick={handleLoginButton}
              className="flex h-11 flex-shrink-0 flex-grow items-center justify-center gap-2 rounded-3xl bg-white px-2 py-4"
            >
              <Image
                priority={true}
                className="mx-1.5 my-1.5 flex h-5 w-5 items-center justify-center rounded-3xl bg-neutral-800"
                src={twtLogo}
                width={40}
                height={40}
                alt="Twitter-X Icon"
              />
              <div className="text-center text-xs font-extrabold uppercase leading-tight tracking-wide text-zinc-950 md:text-sm">
                Connect X
              </div>
            </button>
          </div>
        </div>
      </div>
    </ModalBlank>
  );
}
