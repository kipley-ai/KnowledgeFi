import Image from "next/image";
import CreditIcon from "public/images/credit-icon.svg";
import ProgressBar from "@/components/progress-bar";
import ModalTopUp from "@/components/modal-top-up";
import Refresh from "public/images/refresh.png";
import { useCreditBalanceContext } from "./credit-balance-context";
import { useCreditBalance } from "@/hooks/api/credit";
import { useAppProvider } from "@/providers/app-provider";
import { useEffect } from "react";

export default function CreditBalance() {
  const { modalTopUp, setModalTopUp } = useAppProvider();
  const { creditBalance } = useCreditBalanceContext();
  const { data: creditBalanceData } = useCreditBalance();
  
  useEffect(() => {
    console.log(creditBalanceData)
  }, [])

  return (
    <div className="flex flex-col justify-start gap-2 w-full text-white p-6">
      <ModalTopUp isOpen={modalTopUp} setIsOpen={setModalTopUp} />
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Image
            src={CreditIcon}
            alt="Profile"
            className="rounded-full"
            width={23}
            height={23}
          />
          <h6>Credit Balance</h6>
        </div>
        <button
          className="self-end rounded-full text-gray-400 hover:text-blue-500"
          onClick={() => console.log("Refresh Credit Balance")}
        >
          <div className="rounded-full border-2 border-gray-700 p-1 font-semibold">
            <Image width={12} height={12} src={Refresh} alt="Refresh" />
          </div>
        </button>
      </div>
      <p>
        <span className="text-2xl lg:text-3xl font-medium">{creditBalance} Credits</span>
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
