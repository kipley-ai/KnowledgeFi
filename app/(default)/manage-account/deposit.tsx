import Image from "next/image";
import InvoiceIcon from "public/images/invoice-icon.svg";

export default function Deposit() {
    return (
        <div className="flex flex-col py-8 px-10 w-5/6">
            <h1 className="text-3xl text-white font-semibold">Deposit History</h1>
            <table className="w-full mx-3 my-4 text-left table-auto text-white font-semibold">
                <thead>
                    <tr className="border-b border-gray-700 text-[#7C878E] text-sm">
                        <th className="py-5">Description</th>
                        <th className="py-5">Amount</th>
                        <th className="py-5">Date</th>
                        <th className="py-5">Status</th>
                        <th className="text-center py-5">Invoice</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="py-5">Buy Credit</td>
                        <td className="py-5">$100</td>
                        <td className="text-gray-500 py-5">2024-02-11 08:12:09 UTC</td>
                        <td className="text-red-400 py-5">Expired</td>
                        <td className="flex justify-center py-5">
                            <Image className="cursor-pointer" width={21} height={21} src={InvoiceIcon} alt="Invoice Icon"/>
                        </td>
                    </tr>
                    <tr>
                        <td className="py-5">Buy Credit</td>
                        <td className="py-5">$100</td>
                        <td className="text-gray-500 py-5">2024-02-11 08:12:09 UTC</td>
                        <td className="text-red-400 py-5">Expired</td>
                        <td className="flex justify-center py-5">
                            <Image className="cursor-pointer" width={21} height={21} src={InvoiceIcon} alt="Invoice Icon"/>
                        </td>
                    </tr>
                    <tr>
                        <td className="py-5">Buy Credit</td>
                        <td className="py-5">$100</td>
                        <td className="text-gray-500 py-5">2024-02-11 08:12:09 UTC</td>
                        <td className="text-red-400 py-5">Expired</td>
                        <td className="flex justify-center py-5">
                            <Image className="cursor-pointer" width={21} height={21} src={InvoiceIcon} alt="Invoice Icon"/>
                        </td>
                    </tr>
                    <tr>
                        <td className="py-5">Buy Credit</td>
                        <td className="py-5">$100</td>
                        <td className="text-gray-500 py-5">2024-02-11 08:12:09 UTC</td>
                        <td className="text-red-400 py-5">Expired</td>
                        <td className="flex justify-center py-5">
                            <Image className="cursor-pointer" width={21} height={21} src={InvoiceIcon} alt="Invoice Icon"/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}