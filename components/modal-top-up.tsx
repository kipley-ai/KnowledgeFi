"use client";

import ModalBlank from "@/components/modal-blank-3";
import { recharge } from "@/smart-contract/kip-protocol-contract";
import { allowance, approve, balanceOf } from "@/smart-contract/kip-token";
import { KIP_TOKEN_DECIMAL } from "@/utils/constants";
import { useState } from "react";
import Notification from "@/components/notification";
import ModalTopUpSuccessful from "./modal-top-up-successful";
import ModalTopUpFailed from "./modal-top-up-failed";
import ModalTopUpPending from "./modal-top-up-pending";
import { useSwitchToSepolia } from "@/hooks/useSwitchNetwork";
import { useSwitchToPolygon } from "@/hooks/useSwitchNetwork";

enum Status {
  Successful = "SUCCESSFUL",
  Failed = "FAILED",
  Pending = "PENDING",
  Undefined = "UNDEFINED",
}

interface Form {
  amount?: number;
}

export default function ModalTopUp({
  isOpen,
  setIsOpen,
  setTopUpStatus,
}: {
  isOpen: boolean;
  setIsOpen: any;
  setTopUpStatus?: any;
}) {
  const [form, setForm] = useState<Form>({});
  const [continueBtn, setContinueBtn] = useState({
    disable: false,
    text: "Continue",
  });

  const [toast3ErrorOpen, setToast3ErrorOpen] = useState<boolean>(false);
  // Determine the environment and accordingly use the switch network hook
  const isDevelopment = process.env.NEXT_PUBLIC_ENV_DEV === "1";
  const { isSepolia, switchToSepolia } = useSwitchToSepolia();
  const { isPolygon, switchToPolygon } = useSwitchToPolygon();

  // Determine which network is currently active and which switch function to use
  const isTargetNetworkActive = isDevelopment ? isSepolia : isPolygon;
  const switchToTargetNetwork = isDevelopment ? switchToSepolia : switchToPolygon;
  const targetNetworkName = isDevelopment ? "Sepolia" : "Polygon";

  const handleFormChange = (name: string, value: any) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleContinue = async () => {
    if (!form.amount || form.amount == 0) {
      return;
    }

    try {
      const bal = await balanceOf();
      if (bal === 0) {
        setToast3ErrorOpen(true);
        return;
      }

      const allw = await allowance();

      if (allw < form.amount! * KIP_TOKEN_DECIMAL) {
        setContinueBtn({
          disable: true,
          text: "Topping up...",
        });
        await approve(bal);
      }

      setContinueBtn({
        disable: false,
        text: "Processing...",
      });
      await recharge(form.amount!);
      // TODO: API call to update the user's balance
      setTopUpStatus("PENDING");
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      setContinueBtn({
        disable: false,
        text: "Continue",
      });
    }
  };

  return (
    <ModalBlank isOpen={isOpen} setIsOpen={setIsOpen}>
      <Notification
        type="error"
        open={toast3ErrorOpen}
        setOpen={setToast3ErrorOpen}
        className="fixed inset-x-0 top-9 flex items-center justify-center"
        action={false}
      >
        <p className="font-semibold">
          Insufficient $KFI balance. Please get more $KFI token.
        </p>
      </Notification>
      <div className="flex flex-col items-center justify-between rounded-lg p-4 shadow-md">
        <div className="inline-flex items-center justify-between self-stretch p-5">
          <div className="w-80 text-[32px] font-black leading-10 text-gray-50">
            <span>Top up credits</span>
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
                stroke="#353945"
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
        <div className="inline-flex items-center justify-between self-stretch p-5 pt-0">
          <div className="w-full text-base font-semibold leading-10 text-gray-50">
            <span>Get Credits by Paying </span>
            <span className="text-aqua-700">$KFI </span>
            <span>token</span>
          </div>
        </div>
        <div className="inline-flex items-center justify-between self-stretch p-5">
          <div className="w-full text-lg font-bold leading-10 text-gray-50">
            <input
              className="placeholder-text-[#7C878E] w-full rounded-xl bg-transparent px-4 py-3 text-sm leading-6 text-[#DDD] placeholder-[#777E90]"
              type="number"
              name="amount"
              placeholder="Enter your credit amount here"
              onChange={(e) => {
                handleFormChange("amount", e.target.value);
              }}
              value={form?.amount}
            />
          </div>
        </div>
        <div className="inline-flex items-center justify-between self-stretch px-5 py-0">
          <div className="grid w-full grid-cols-3 gap-3 font-bold text-white">
            <button
              className={`flex h-12 flex-col items-center justify-center rounded-3xl border-2 ${form?.amount == 50 ? "border-aqua-700" : "border-[#50575F]"
                }`}
              onClick={() => {
                handleFormChange("amount", 50);
              }}
            >
              <span className="text-sm font-bold leading-6">50</span>
            </button>
            <button
              className={`flex h-12 flex-col items-center justify-center rounded-3xl border-2 ${form?.amount == 100 ? "border-aqua-700" : "border-[#50575F]"
                }`}
              onClick={() => {
                handleFormChange("amount", 100);
              }}
            >
              <span className="text-sm font-bold leading-6">100</span>
            </button>
            <button
              className={`flex h-12 flex-col items-center justify-center rounded-3xl border-2 ${form?.amount == 300 ? "border-aqua-700" : "border-[#50575F]"
                }`}
              onClick={() => {
                handleFormChange("amount", 300);
              }}
            >
              <span className="text-sm font-bold leading-6">300</span>
            </button>
            <button
              className={`flex h-12 flex-col items-center justify-center rounded-3xl border-2 ${form?.amount == 500 ? "border-aqua-700" : "border-[#50575F]"
                }`}
              onClick={() => {
                handleFormChange("amount", 500);
              }}
            >
              <span className="text-sm font-bold leading-6">500</span>
            </button>
            <button
              className={`flex h-12 flex-col items-center justify-center rounded-3xl border-2 ${form?.amount == 750 ? "border-aqua-700" : "border-[#50575F]"
                }`}
              onClick={() => {
                handleFormChange("amount", 750);
              }}
            >
              <span className="text-sm font-bold leading-6">750</span>
            </button>
            <button
              className={`flex h-12 flex-col items-center justify-center rounded-3xl border-2 ${form?.amount == 1000 ? "border-aqua-700" : "border-[#50575F]"
                }`}
              onClick={() => {
                handleFormChange("amount", 1000);
              }}
            >
              <span className="text-sm font-bold leading-6">1000</span>
            </button>
          </div>
        </div>
        <div className="inline-flex items-center justify-between self-stretch p-5 pt-2 ">
          <div className="w-80 text-sm font-semibold leading-10 text-gray-50">
            <span>You are paying </span>
            <span className="text-aqua-700">{form?.amount} $KFI</span>
          </div>
        </div>
        <div className="inline-flex items-center justify-between self-stretch p-5">
          <div className="grid w-full grid-cols-1 font-bold text-white">
            {!isTargetNetworkActive ? (
              <button
                className="flex flex-row items-center justify-center gap-2 rounded-3xl bg-aqua-700 p-2 px-5 hover:brightness-75"
                onClick={switchToTargetNetwork}
              >
                <h5 className="font-semibold text-black">Change Network to {targetNetworkName}</h5>
              </button>
            ) : (
              <button
                className="flex flex-row items-center justify-center gap-2 rounded-3xl bg-aqua-700 p-2 px-5 disabled:bg-gray-500"
                type="button"
                onClick={handleContinue}
                disabled={continueBtn.disable}
              >
                <h5 className="font-semibold text-black">{continueBtn.text}</h5>
                {continueBtn.text === "Continue" && (
                  <svg
                    width="20"
                    height="10"
                    viewBox="0 0 20 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.98 5.7901C18.8936 5.7901 19.6343 6.53075 19.6343 7.44439V7.44439C19.6343 8.35803 18.8936 9.09868 17.98 9.09868L1.65435 9.09868C0.74071 9.09868 5.90253e-05 8.35803 5.90618e-05 7.44439V7.44439C5.90983e-05 6.53075 0.740711 5.7901 1.65435 5.7901L17.98 5.7901Z"
                      fill="#151515"
                    />
                    <path
                      d="M18.932 5.9907C19.5219 6.63674 19.5219 7.68418 18.932 8.33022C18.3422 8.97626 17.3859 8.97626 16.7961 8.33022L12.3947 3.50927C11.8049 2.86322 11.8049 1.81578 12.3947 1.16974C12.9845 0.523702 13.9408 0.523702 14.5306 1.16974L18.932 5.9907Z"
                      fill="#151515"
                    />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </ModalBlank>
  );
}
