import Image from "next/image";
import CreditIcon from "public/images/credit-icon.svg";
import ProgressBar from "@/components/progress-bar";

export default function CreditBalance() {
    return (
        <div className="flex flex-col w-full text-white py-10 px-8 space-y-5">
            <div className="flex items-center">
                <Image src={CreditIcon} alt="Profile" className="w-8 h-8 rounded-full mr-4" />
                <h6>Credit Balance</h6>
            </div>
            <p><span className="text-3xl">79.99</span> / 300</p>
            <ProgressBar current={79.99} total={300}/>
        </div>
    )
}