import Image from "next/image";
import Link from "next/link";
import CheckIcon from "public/images/check-icon.svg";
import CrossIcon from "public/images/cross-icon.svg";
import ModalBlank from "@/components/modal-blank-3";
import { DM_Sans, Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import { useNftDetail } from "@/hooks/api/nft";
import { useScrapeTwitter, useScrapeTwitterStatus } from "@/hooks/api/kb";
import { useSession } from "next-auth/react";
import { delay } from "@/utils/utils";

interface ToastProps {
  children: React.ReactNode;
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

export default function FailModal({ children, open, setOpen }: ToastProps) {
  const scrapeTwitter = useScrapeTwitter();
  const { data: twitterData } = useSession();
  const { refetch: refetchScrapeStatus } = useScrapeTwitterStatus({
    username: twitterData?.user?.username!,
  });

  const handleTryAgain = () => {
    scrapeTwitter.mutate({ username: twitterData?.user?.username! });
    refetchScrapeStatus().then(async () => {
			await delay(100)
      setOpen(false);
    });
  };

  return (
    <ModalBlank isOpen={open} setIsOpen={setOpen}>
      <div
        className={`flex w-[360px] flex-col items-center justify-center rounded-2xl bg-[#181B1F] px-7 py-10 font-semibold text-[#7C878E]`}
      >
        <div className="flex w-full flex-row items-center justify-between">
          <h2 className="text-3xl">Error</h2>
          <button>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setOpen(false)}
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5 5H7V7H5V5ZM9 9H7V7H9V9ZM11 11H9V9H11V11ZM13 11H11V13H9V15H7V17H5V19H7V17H9V15H11V13H13V15H15V17H17V19H19V17H17V15H15V13H13V11ZM15 9V11H13V9H15ZM17 7V9H15V7H17ZM17 7V5H19V7H17Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        <div
          className={`my-7 flex  flex-row items-center justify-center gap-2 text-sm text-red-500`}
        >
          <svg
            width="25%"
            height="25%"
            viewBox="0 0 48 48"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.00049 6H10H10.0005H38V10H10.0005V38H38V42L10.0005 42L10 42L6.00049 42V6ZM42.0005 6H38.0005V42H42.0005V6ZM22.0005 30.0001H26.0005V34.0001H22.0005V30.0001ZM26.0005 14H22.0005V26H26.0005V14Z"
              fill="currentColor"
            />
          </svg>
          {children}
        </div>
        <button
          className="w-full bg-[#353945] px-16 py-3 text-sm font-bold text-[#01F7FF] disabled:opacity-50"
          onClick={() => handleTryAgain()}
          disabled={twitterData?.user?.username === undefined}
        >
          TRY AGAIN
        </button>
      </div>
    </ModalBlank>
  );
}
