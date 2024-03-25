import Image from "next/image";
import { FaSpinner } from "react-icons/fa";
import CreditIcon from "public/images/credit-icon.svg";
import ProgressBar from "@/components/progress-bar";
import ModalTopUp from "@/components/modal-top-up";
import ModalTopUpSuccessful from "@/components/modal-top-up-successful";
import ModalTopUpFailed from "@/components/modal-top-up-failed";
import Refresh from "public/images/refresh.png";
import { useCreditBalanceContext } from "./credit-balance-context";
import { useCreditBalance } from "@/hooks/api/credit";
import { useRechargeStatus } from "@/hooks/api/user";
import { useAppProvider } from "@/providers/app-provider";
import { useState, useEffect } from "react";

export default function CreditBalance() {
  const [topUpStatus, setTopUpStatus] = useState<string>("");
  const [willRefetch, setWillRefetch] = useState<boolean>(true);
  const [modalTopUpSuccessful, setModalTopUpSuccessful] =
    useState<boolean>(false);
  const [modalTopUpFailed, setModalTopUpFailed] = useState<boolean>(false);

  const { modalTopUp, setModalTopUp } = useAppProvider();
  const { creditBalance, setRefetch } = useCreditBalanceContext();

  const { data } = useRechargeStatus({ willRefetch });

  useEffect(() => {
    if (data) {
      if (topUpStatus === "processing") {
        switch (data.data.data[0]?.status) {
          case "success":
            setModalTopUpSuccessful(true);
            setWillRefetch(false);
            setTopUpStatus("");
            break;
          case "failed":
            setModalTopUpFailed(true);
            setWillRefetch(false);
            setTopUpStatus("");
            break;
          default:
            setWillRefetch(true);
        }
      } else if (topUpStatus === "") {
        switch (data.data.data[0]?.status) {
          case "processing":
            setTopUpStatus("processing");
            setWillRefetch(true);
            break;
          default:
            setWillRefetch(false);
        }
      }
    }
  }, [data, topUpStatus]);

  return (
    <div className="flex w-full flex-col justify-start gap-2 px-5 py-6 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg
            width="19"
            height="19"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.19875 0H12.8013V1.60042H3.205V3.19979H1.60458V1.59937H3.19875V0ZM7.19979 2.40167H8.80021V4.00104H11.205V5.60146H8.80021V5.6025H7.19979V5.60146H6.40375V7.19979H9.60667H11.205H11.2071V12.001H11.205V12.0042H8.80021V13.6046H7.19979V12.0042H4.80333V10.4038H7.19979H8.80021H9.60667V8.80021H6.40375V8.80229H4.80333V8.80021V7.19979V5.60146V4.00104H6.40375H7.19979V2.40167ZM1.60042 3.19875H0V12.8012H1.60042V3.19875ZM14.4058 3.19875H16V12.8012H14.3996V3.19979H12.8054V1.59937H14.4058V3.19875ZM12.8013 16.0042H3.19875V14.4048H1.60458V12.8044H3.205V14.4038H12.8013V16.0042ZM12.8054 14.4048H14.4058V12.8044H12.8054V14.4048Z"
              fill="#00FFFF"
            />
          </svg>

          <h6 className="text-lg tracking-tight">Credit Balance</h6>
        </div>
        <button
          className="self-end rounded-full text-gray-400 hover:text-blue-500"
          onClick={() => setRefetch(true)}
        >
          <div className="rounded-full border-gray-700 p-1 font-semibold">
            <svg
              width="12"
              height="12"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14 0H12V2H14V4H2V6H0V11H2V6H14V8H12V10H14V8H16V6H18V4H16V2H14V0ZM4 18H6V20H8V18H6V16H18V14H20V9H18V14H6V12H8V10H6V12H4V14H2V16H4V18Z"
                fill="#6B7280"
              />
            </svg>
          </div>
        </button>
      </div>
      <p>
        <span className="lg:text-md text-sm font-medium">
          {creditBalance} Credits
        </span>
      </p>
      {topUpStatus === "processing" && (
        <div className="flex items-center">
          <FaSpinner className="animate-spin" />
          <span className="ml-2 text-xs font-medium">Processing Top-Up...</span>
        </div>
      )}
      <button
        className="mt-2 flex w-full justify-center rounded-md border-2 border-[#01F7FF] px-2 py-2 disabled:brightness-50"
        onClick={() => setModalTopUp(true)}
        disabled={topUpStatus === "processing"}
      >
        <span className="text-xs font-medium text-[#FCFCFD] duration-200">
          Top Up Credits
        </span>
      </button>
      <ModalTopUpSuccessful
        isOpen={modalTopUpSuccessful}
        setIsOpen={setModalTopUpSuccessful}
      />
      <ModalTopUpFailed
        isOpen={modalTopUpFailed}
        setIsOpen={setModalTopUpFailed}
      />
      <ModalTopUp
        isOpen={modalTopUp}
        setIsOpen={setModalTopUp}
        setTopUpStatus={setTopUpStatus}
      />
    </div>
  );
}
