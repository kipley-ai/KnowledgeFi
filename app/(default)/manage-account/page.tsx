"use client";
import { useState } from "react";
import HeaderBg from "public/images/header-image.svg";
import PaperIcon from "public/images/paper-icon.svg";
import Image from "next/image";
import Credit from "./credit";
import Dashboard from "./dashboard";
import Deposit from "./deposit";
import Earning from "./earning";
import Withdraw from "./withdraw";
import { useEffect } from "react";
import { useAppProvider } from "@/providers/app-provider";
import CreatorOverview from "./creator";

const Icon = ({ active }: { active: boolean }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.9165 2.91699V1.66699M16.1993 3.80088L17.0832 2.91699M17.0917 7.08366H18.3417M18.292 10.8337C17.8739 15.0448 14.321 18.3337 9.99984 18.3337C5.39746 18.3337 1.6665 14.6027 1.6665 10.0003C1.6665 5.6792 4.9554 2.12624 9.1665 1.70814M9.99984 6.66699H13.3332V10.0003M13.0162 6.66699C11.0543 9.43999 7.82181 11.2503 4.1665 11.2503C3.33075 11.2503 2.5171 11.1557 1.73569 10.9765"
        stroke={active ? "#01F7FF" : "#7C878E"}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default function ManageAccount() {
  const [selectedPage, setSelectedPage] = useState("dashboard");
  const { setHeaderTitle } = useAppProvider();

  useEffect(() => {
    setHeaderTitle("Manage Account");
  }, []);

  return (
    <div className="flex flex-col bg-[#292D32]">
      <Image
        className="w-full bg-[#292D32]"
        src={HeaderBg}
        alt="Header Background"
      />
      <div className="mx-10 -mt-20 flex rounded-2xl border border-gray-700 bg-[#292D32]">
        <div className="flex w-2/6 flex-col border-r border-gray-700 px-8 py-8 pb-32 font-semibold text-[#7C878E]">
          {/* Account Information Section */}
          <div
            className={`mb-2 flex cursor-pointer px-3 py-3 ${selectedPage == "dashboard" ? "rounded-3xl border border-[#01F7FF] text-[#01F7FF]" : ""}`}
            onClick={() => setSelectedPage("dashboard")}
          >
            <svg
              width="17"
              height="20"
              viewBox="0 0 17 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.6668 8.75033V5.66699C14.6668 4.26686 14.6668 3.5668 14.3943 3.03202C14.1547 2.56161 13.7722 2.17916 13.3018 1.93948C12.767 1.66699 12.067 1.66699 10.6668 1.66699H5.3335C3.93336 1.66699 3.2333 1.66699 2.69852 1.93948C2.22811 2.17916 1.84566 2.56161 1.60598 3.03202C1.3335 3.5668 1.3335 4.26686 1.3335 5.66699V14.3337C1.3335 15.7338 1.3335 16.4339 1.60598 16.9686C1.84566 17.439 2.22811 17.8215 2.69852 18.0612C3.2333 18.3337 3.93336 18.3337 5.3335 18.3337H8.00016M9.66683 9.16699H4.66683M6.3335 12.5003H4.66683M11.3335 5.83366H4.66683M13.0002 17.5003V12.5003M10.5002 15.0003H15.5002"
                stroke={selectedPage == "dashboard" ? "#01F7FF" : "#7C878E"}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <h3 className="ml-3 text-sm">Account Information</h3>
          </div>
          {/* Creator Overview Section */}
          <div
            className={`my-2 flex cursor-pointer px-3 py-3 ${selectedPage == "creator" ? "rounded-3xl border border-[#01F7FF] text-[#01F7FF]" : ""}`}
            onClick={() => setSelectedPage("creator")}
          >
            <Icon active={selectedPage == "creator" ? true : false} />
            <h3 className="ml-3 text-sm">Creator Overview</h3>
          </div>
          {/* Earning Report */}
          {/* <div className={`flex my-2 cursor-pointer px-3 py-3 ${selectedPage == 'earning' ? 'border border-[#01F7FF] rounded-3xl text-[#01F7FF]' : ''}`} onClick={() => setSelectedPage("earning")}>
                        <Icon active={selectedPage == 'earning' ? true : false} />
                        <h3 className="ml-3 text-sm">Earning Report</h3>
                    </div> */}
          {/* Withdraw History */}
          {/* <div className={`flex my-2 cursor-pointer px-3 py-3 ${selectedPage == 'withdraw' ? 'border border-[#01F7FF] rounded-3xl text-[#01F7FF]' : ''}`} onClick={() => setSelectedPage("withdraw")}>
                        <Icon active={selectedPage == 'withdraw' ? true : false} />
                        <h3 className="ml-3 text-sm">Withdraw History</h3>
                    </div> */}
          {/* Deposit History */}
          <div
            className={`my-2 flex cursor-pointer px-3 py-3 ${selectedPage == "deposit" ? "rounded-3xl border border-[#01F7FF] text-[#01F7FF]" : ""}`}
            onClick={() => setSelectedPage("deposit")}
          >
            <Icon active={selectedPage == "deposit" ? true : false} />
            <h3 className="ml-3 text-sm">Deposit History</h3>
          </div>
          {/* Credit Usage */}
          <div
            className={`mt-2 flex cursor-pointer px-3 py-3 ${selectedPage == "credit" ? "rounded-3xl border border-[#01F7FF] text-[#01F7FF]" : ""}`}
            onClick={() => setSelectedPage("credit")}
          >
            <Icon active={selectedPage == "credit" ? true : false} />
            <h3 className="ml-3 text-sm">Credit Usage</h3>
          </div>
        </div>
        {selectedPage === "credit" ? (
          <Credit />
        ) : selectedPage === "creator" ? (
          <CreatorOverview />
        ) : selectedPage === "dashboard" ? (
          <Dashboard />
        ) : selectedPage === "deposit" ? (
          <Deposit />
        ) : selectedPage === "earning" ? (
          <Earning />
        ) : selectedPage === "withdraw" ? (
          <Withdraw />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
