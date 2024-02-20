import { ImExit } from "react-icons/im";
import TwitterLogo from "@/public/images/logo-twitter.svg";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { FaSpinner } from "react-icons/fa";
import { useState } from "react";
import ModalLoginTwitter from "@/components/modal-login-twitter";
import ModalLogoutTwitter from "@/components/modal-logout-twitter-2";

const TwitterAuthed = ({ twitterSession }: { twitterSession: Session }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleDisconnect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsOpen(true);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="justify-left flex items-center gap-5">
          <div className="relative h-10 w-10 rounded-full">
            <Image
              src={TwitterLogo}
              alt="Twitter logo"
              layout="fill" // required
              objectFit="cover" // change to suit your needs
              className="rounded-full" // just an example
            />
          </div>
          <span className="text-slate-100">
            X (formerly Twitter){" "}
            <span className="text-zinc-600">
              (@{twitterSession.user?.username})
            </span>
          </span>
          <ModalLogoutTwitter
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            username={twitterSession.user?.username!}
          />
        </div>
        <button
          onClick={handleDisconnect}
          className="flex items-center justify-between gap-2 rounded-full border-2 border-gray-700 px-4 py-2 text-xs text-slate-200"
        >
          Disconnect
          <ImExit />
        </button>
      </div>
    </>
  );
};

const TwitterUnauthed = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="justify-left flex items-center gap-5">
          <div className="relative h-10 w-10 rounded-full">
            <Image
              src={TwitterLogo}
              alt="Twitter logo"
              layout="fill" // required
              objectFit="cover" // change to suit your needs
              className="rounded-full" // just an example
            />
          </div>
          <button className="text-cyan-400" onClick={handleOnClick}>
            Connect X Account
          </button>
          <ModalLoginTwitter isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </>
  );
};

const TwitterLoading = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="justify-left flex items-center gap-5">
          <div className="relative h-10 w-10 rounded-full">
            <Image
              src={TwitterLogo}
              alt="Twitter logo"
              layout="fill" // required
              objectFit="cover" // change to suit your needs
              className="rounded-full" // just an example
            />
          </div>
          <FaSpinner className="animate-spin" />
        </div>
      </div>
    </>
  );
};

export default function TwitterConnection() {
  const { data: twitterSession, status: twitterStatus } = useSession();

  if (twitterStatus === "loading") {
    return <TwitterLoading />;
  } else if (twitterStatus === "unauthenticated") {
    return <TwitterUnauthed />;
  } else if (twitterStatus === "authenticated") {
    return <TwitterAuthed twitterSession={twitterSession} />;
  }
}
