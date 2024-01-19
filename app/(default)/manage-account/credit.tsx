import { DM_Sans } from "next/font/google";

const dmsans = DM_Sans({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

export default function Credit() {
    return (
        <div className="flex flex-col py-8 px-10 w-5/6">
            <h1 className="text-3xl text-white font-semibold">Credit Usage</h1>
            <table className="w-full mx-3 my-4 text-left table-auto">
                <thead>
                    <tr className="border-b border-gray-700 text-[#7C878E] text-sm">
                        <th className="py-5">Title</th>
                        <th className="py-5">Credit</th>
                        <th className="py-5">Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="text-md font-inter">
                        <td className="font-semibold text-white py-5">Buy Credit</td>
                        <td className={`font-bold text-green-300 py-5 ${dmsans.className}`}>+500</td>
                        <td className="text-gray-500 font-semibold py-5">2024-02-11 08:12:09 UTC</td>
                    </tr>
                    <tr className="font-inter">
                        <td className="font-semibold text-white py-5">Share Rewards</td>
                        <td className={`font-bold text-red-400 py-5 ${dmsans.className}`}>-300</td>
                        <td className="text-gray-500 font-semibold py-5">2024-02-11 08:12:09 UTC</td>
                    </tr>
                    <tr className="">
                        <td className="font-semibold text-white py-5">Buy Credit</td>
                        <td className={`font-bold text-green-300 py-5 ${dmsans.className}`}>+500</td>
                        <td className="text-gray-500 font-semibold py-5">2024-02-11 08:12:09 UTC</td>
                    </tr>
                    <tr className="">
                        <td className="font-semibold text-white py-5">Sign Up Bonux</td>
                        <td className={`font-bold text-red-400 py-5 ${dmsans.className}`}>-300</td>
                        <td className="text-gray-500 font-semibold py-5">2024-02-11 08:12:09 UTC</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}