import Image from "next/image";
import CreditIcon from "public/images/credit-icon.svg";
import ProgressBar from "@/components/progress-bar";
import ModalTopUp from "@/components/modal-top-up";
import { useAppProvider } from "@/providers/app-provider";

export default function CreditBalance() {
  const { modalTopUp, setModalTopUp } = useAppProvider();

  return (
    <div className="flex flex-col w-full text-white py-10 px-8 space-y-5">
      <ModalTopUp isOpen={modalTopUp} setIsOpen={setModalTopUp} />
      <div className="flex items-center">
        <Image
          src={CreditIcon}
          alt="Profile"
          className="w-8 h-8 rounded-full mr-4"
          width={50}
          height={50}
        />
        <h6>Credit Balance</h6>
      </div>
      <p>
        <span className="text-3xl">79.99</span> / 300
      </p>
      <ProgressBar current={79.99} total={300} />
      <div className="mt-2 flex items-center border border-[#01F7FF] px-1 py-1 rounded-full">
        <button className="w-full" onClick={() => setModalTopUp(true)}>
          <span className="text-sm font-bold text-[#FCFCFD] duration-200">
            Top up credits
          </span>
        </button>
      </div>
    </div>
  );
}
