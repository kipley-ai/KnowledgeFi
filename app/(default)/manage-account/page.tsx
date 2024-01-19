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
import { useAppProvider } from "@/app/app-provider";

const Icon = ({active}:{active: boolean}) => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.9165 2.91699V1.66699M16.1993 3.80088L17.0832 2.91699M17.0917 7.08366H18.3417M18.292 10.8337C17.8739 15.0448 14.321 18.3337 9.99984 18.3337C5.39746 18.3337 1.6665 14.6027 1.6665 10.0003C1.6665 5.6792 4.9554 2.12624 9.1665 1.70814M9.99984 6.66699H13.3332V10.0003M13.0162 6.66699C11.0543 9.43999 7.82181 11.2503 4.1665 11.2503C3.33075 11.2503 2.5171 11.1557 1.73569 10.9765" stroke={active ? "#01F7FF": "#7C878E"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}

export default function ManageAccount() {
    const [selectedPage, setSelectedPage] = useState("");
    const { setHeaderTitle } = useAppProvider();
    
    useEffect(() => {
        setHeaderTitle("Manage Account")
    }, [])

    return (
        <div className="flex flex-col bg-[#292D32]">
            <Image className="bg-[#292D32] w-full" src={HeaderBg} alt="Header Background" />
            <div className="flex bg-[#292D32] -mt-20 mx-10 rounded-2xl border border-gray-700">
                <div className="flex flex-col w-2/6 py-8 px-10 text-[#7C878E] font-semibold border-r border-gray-700 pb-32">
                    <div className={`flex mb-2 cursor-pointer px-7 py-3`} onClick={() => setSelectedPage("dashboard")}>
                        <Image src={PaperIcon} alt="Paper Icon" />
                        <h3 className="ml-3">Dashboard</h3>
                    </div>
                    <div className={`flex my-2 cursor-pointer px-7 py-3 ${selectedPage == 'earning' ? 'border border-[#01F7FF] rounded-3xl text-[#01F7FF]' : ''}`} onClick={() => setSelectedPage("earning")}>
                        <Icon active={selectedPage == 'earning' ? true : false} />
                        <h3 className="ml-3">Earning Report</h3>
                    </div>
                    <div className={`flex my-2 cursor-pointer px-7 py-3 ${selectedPage == 'withdraw' ? 'border border-[#01F7FF] rounded-3xl text-[#01F7FF]' : ''}`} onClick={() => setSelectedPage("withdraw")}>
                        <Icon active={selectedPage == 'withdraw' ? true : false} />
                        <h3 className="ml-3">Withdraw History</h3>
                    </div>
                    <div className={`flex my-2 cursor-pointer px-7 py-3 ${selectedPage == 'deposit' ? 'border border-[#01F7FF] rounded-3xl text-[#01F7FF]' : ''}`} onClick={() => setSelectedPage("deposit")}>
                        <Icon active={selectedPage == 'deposit' ? true : false} />
                        <h3 className="ml-3">Deposit History</h3>
                    </div>
                    <div className={`flex mt-2 cursor-pointer px-7 py-3 ${selectedPage == 'credit' ? 'border border-[#01F7FF] rounded-3xl text-[#01F7FF]' : ''}`} onClick={() => setSelectedPage("credit")}>
                        <Icon active={selectedPage == 'credit' ? true : false} />
                        <h3 className="ml-3">Credit Usage</h3>
                    </div>
                </div>
                {
                    selectedPage === "credit" ? <Credit /> :
                    selectedPage === "dashboard" ? <Dashboard /> :
                    selectedPage === "deposit" ? <Deposit /> :
                    selectedPage === "earning" ? <Earning /> :
                    selectedPage === "withdraw" ? <Withdraw /> :
                    <></>
                }
            </div>
        </div>
    )
}