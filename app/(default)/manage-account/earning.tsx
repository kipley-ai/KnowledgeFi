export default function Earning() {
    return (
        <div className="flex flex-col py-8 px-10 w-5/6">
            <h1 className="text-3xl text-white font-semibold">Earning Report</h1>
            <table className="w-full mx-3 my-4 text-left table-auto font-semibold text-white">
                <thead>
                    <tr className="border-b border-gray-700 text-[#7C878E] text-sm">
                        <th className="py-5">Item</th>
                        <th className="py-5">Price</th>
                        <th className="py-5">Date</th>
                        <th className="py-5">Buyer ID</th>
                        <th className="py-5">Earnings</th>
                        <th className="py-5">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="py-5">Chatbot 101</td>
                        <td className="py-5">100</td>
                        <td className="text-gray-500 py-5">2024-02-11 08:12:09 UTC</td>
                        <td className="py-5">#cheyn_2391</td>
                        <td className="py-5">80</td>
                        <td className="text-green-300 py-5">Success</td>
                    </tr>
                    <tr>
                        <td className="py-5">Chatbot 101</td>
                        <td className="py-5">100</td>
                        <td className="text-gray-500 py-5">2024-02-11 08:12:09 UTC</td>
                        <td className="py-5">#cheyn_2391</td>
                        <td className="py-5">80</td>
                        <td className="text-red-400 py-5">Failed</td>
                    </tr>
                    <tr>
                        <td className="py-5">Chatbot 101</td>
                        <td className="py-5">100</td>
                        <td className="text-gray-500 py-5">2024-02-11 08:12:09 UTC</td>
                        <td className="py-5">#cheyn_2391</td>
                        <td className="py-5">80</td>
                        <td className="text-green-300 py-5">Success</td>
                    </tr>
                    <tr>
                        <td className="py-5">Chatbot 101</td>
                        <td className="py-5">100</td>
                        <td className="text-gray-500 py-5">2024-02-11 08:12:09 UTC</td>
                        <td className="py-5">#cheyn_2391</td>
                        <td className="py-5">80</td>
                        <td className="text-green-300 py-5">Success</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}