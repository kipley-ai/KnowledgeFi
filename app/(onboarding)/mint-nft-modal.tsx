import Image from "next/image";
import CheckIcon from "public/images/check-icon.svg";
// import CrossIcon from "public/images/cross-icon.svg";
import CrossIcon from "public/images/cross-icon-2.png";
import ModalBlank from "@/components/modal-blank-3";
import { useEffect, useState } from "react";
import { useCreateChatbotContext } from "./create-knowledge-context";
import { useMintNFTStatus } from "@/hooks/api/kb";
import { useRouter } from "next/navigation";
import { useNftDetail } from "@/hooks/api/nft";

interface ToastProps {
  children: React.ReactNode;
  type?: "warning" | "error" | "success" | "";
  open: boolean;
  setOpen: (open: boolean) => void;
  kbIdCreated: string;
  nftIdCreated: string;
}

export default function SuccessFailModal({
  children,
  type = "",
  open,
  setOpen,
  kbIdCreated,
  nftIdCreated,
}: ToastProps) {
  const [isNftMinted, setIsNftMinted] = useState(false);

  const { setStep } = useCreateChatbotContext();

  const router = useRouter();

  const {
    data: nftData,
    isPending: nftIsPending,
    refetch,
  } = useNftDetail({
    sft_id: nftIdCreated as string,
  });
  const { data: statusData } = useMintNFTStatus(kbIdCreated, isNftMinted);

  let nftOpenSeaLink: any;
  if (nftData) {
    nftOpenSeaLink = `${process.env.NEXT_PUBLIC_OPENSEA_URL}/${nftData?.data?.data?.sft_address}`;
  }

  useEffect(() => {
    if (statusData) {
      const { status } = statusData?.data?.data || {};
      if (status === "success") {
        setIsNftMinted(true);
        refetch();
      }
    }
  }, [statusData]);

  return (
    <ModalBlank isOpen={open} setIsOpen={setOpen}>
      <div
        className={`flex w-[360px] flex-col items-center justify-center rounded-2xl bg-[#181B1F] px-7 py-10 font-semibold text-white`}
      >
        <div className="flex w-full flex-row items-center justify-between">
          <h2 className="text-3xl">Success</h2>
          <Image
            className="h-[12px] w-[12px] cursor-pointer"
            src={CrossIcon}
            alt="cross icon"
            onClick={() => setStep("create_chatbot")}
          />
        </div>
        <div
          className={`my-7 flex flex-row items-center justify-center text-sm`}
        >
          <Image
            className="mr-4 h-[30px] w-[30px]"
            src={CheckIcon}
            alt="check icon"
          />
          {children}
        </div>
        <div className="flex w-full">
          <button
            className="mr-4 w-full rounded-3xl bg-[#353945] py-2 text-sm text-[#01F7FF]  disabled:brightness-50"
            disabled={!isNftMinted || nftIsPending}
            onClick={() => {
              window.open(nftOpenSeaLink, "_blank");
            }}
          >
            {isNftMinted && !nftIsPending
              ? "View on OpenSea"
              : "Adding to OpenSea..."}
          </button>
          <button
            onClick={() => setStep("create_chatbot")}
            className="w-full rounded-3xl bg-[#353945] py-2 text-sm text-[#01F7FF]"
          >
            Create Chatbot
          </button>
        </div>
      </div>
    </ModalBlank>
  );
}
