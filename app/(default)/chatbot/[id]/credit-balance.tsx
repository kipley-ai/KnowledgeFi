import Image from "next/image";
import CreditIcon from "public/images/credit-icon.svg";
import ProgressBar from "@/components/progress-bar";
import ModalTopUp from "@/components/modal-top-up";
import { useAppProvider } from "@/providers/app-provider";

export default function CreditBalance() {
  const { modalTopUp, setModalTopUp } = useAppProvider();

  return (
    <div className="flex flex-col justify-start gap-2 w-full text-white py-6 px-8">
      <ModalTopUp isOpen={modalTopUp} setIsOpen={setModalTopUp} />
      <div className="flex gap-3 items-center">
        <Image
          src={CreditIcon}
          alt="Profile"
          className="rounded-full"
          width={21}
          height={21}
        />
        <h6>Credit Balance</h6>
      </div>
      <p>
        <span className="text-3xl font-medium">512 Credits</span>
      </p>
      {/* <ProgressBar current={79.99} total={300} /> */}
      <div className="mt-2 flex items-center border border-2 border-[#01F7FF] px-1 py-1 rounded-full">
        <button className="w-full" onClick={() => setModalTopUp(true)}>
          <span className="text-xs font-medium text-[#FCFCFD] duration-200">
            Top up credits
          </span>
        </button>
      </div>
    </div>
  );
}
