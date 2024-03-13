import Image from "next/image";
import CheckIcon from "public/images/check-icon.svg";
import CrossIcon from "public/images/cross-icon-2.png";
import ModalBlank from "./modal-blank-3";
import { DM_Sans, Poppins } from "next/font/google";
import { useRouter } from "next/navigation";

interface ToastProps {
  children: React.ReactNode;
  type?: "warning" | "error" | "success" | "";
  open: boolean;
  setOpen: (open: boolean) => void;
  onDone?: any;
  onClose?: any;
}

export default function SuccessFailModal({
  children,
  type = "",
  open,
  setOpen,
  onDone,
  onClose,
}: ToastProps) {
  const router = useRouter();
  // TODO: add fail type
  return (
    <ModalBlank isOpen={open} setIsOpen={setOpen}>
      <div
        className={`flex w-[360px] flex-col items-center justify-center rounded-2xl bg-[#181B1F] px-7 py-10 text-white font-semibold`}
      >
        <div className="flex w-full flex-row items-center justify-between">
          <h2 className="text-3xl">Success</h2>
          <Image
            className="h-[12px] w-[12px] cursor-pointer"
            src={CrossIcon}
            alt="cross icon"
            onClick={onClose || (() => router.push("/nft"))}
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
          {children}
        </div>
        <button
          onClick={onDone || (() => router.push("/nft"))}
          className="w-full rounded-3xl bg-[#353945] py-2 text-sm text-[#01F7FF]"
        >
          Done
        </button>
      </div>
    </ModalBlank>
  );
}
