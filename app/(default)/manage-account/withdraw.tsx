export default function Withdraw() {
    return (
        <div className="flex flex-col py-8 px-10 w-5/6">
            <h1 className="text-3xl text-white font-semibold">Withdraw History</h1>
            <table className="w-full mx-3 my-4 text-left table-auto text-white font-semibold">
                <thead>
                    <tr className="border-b border-gray-700 text-[#7C878E] text-sm">
                        <th className="py-5">Transaction</th>
                        <th className="py-5">Payout Method</th>
                        <th className="py-5">Status</th>
                        <th className="py-5">Date Processed</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="py-5">$2.923.90</td>
                        <td className="py-5">Paypal</td>
                        <td className=" text-green-300 py-5">Paid</td>
                        <td className="text-gray-500 py-5">2024-02-11 08:12:09 UTC</td>
                    </tr>
                    <tr>
                        <td className="py-5">$2.923.90</td>
                        <td className="py-5">Paypal</td>
                        <td className=" text-green-300 py-5">Paid</td>
                        <td className="text-gray-500 py-5">2024-02-11 08:12:09 UTC</td>
                    </tr>
                    <tr>
                        <td className="py-5">$2.923.90</td>
                        <td className="py-5">Paypal</td>
                        <td className=" text-red-400 py-5">Failed</td>
                        <td className="text-gray-500 py-5">2024-02-11 08:12:09 UTC</td>
                    </tr>
                    <tr>
                        <td className="py-5">$2.923.90</td>
                        <td className="py-5">Paypal</td>
                        <td className=" text-green-300 py-5">Paid</td>
                        <td className="text-gray-500 py-5">2024-02-11 08:12:09 UTC</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}