import { useSearchParams } from "next/navigation";
import { getTimeString } from "@/lib/string";
import { PaginationController } from "@/components/pagination-2/controller";
import { useWithdrawHistory } from "@/hooks/api/user";
import { FaSpinner } from "react-icons/fa6";
import { useState } from "react";
import { keepPreviousData } from "@tanstack/react-query";

export default function WithdrawHistory() {
	const searchParams = useSearchParams();

	const [currentPage, setCurrentPage] = useState<number>(1);
  	const [pageSize, setPageSize] = useState<number>(5);
	
	const { isPending, isError, error, data, isFetching } = useWithdrawHistory(
		{
			page: currentPage,
			page_size: pageSize,
			sort_by: "created_at",
		},
    	keepPreviousData,
	);
	
	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	if (isPending) {
		return (
		  <div className="flex h-32 w-full items-center justify-center gap-4">
			<FaSpinner size={20} className="animate-spin" />
			<p className="text-md text-gray-300">Loading</p>
		  </div>
		);
	  }

	if (isError) {
		return <div>Error: {error.message}</div>;
	}

	const { withdraw_history_data: withdrawal, withdraw_history_count: withdrawalCount } = data?.data?.data;

	return (
		<>
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-semibold text-slate-100">
					Withdraw History
				</h1>
			</div>
			<ContentListComponent
				withdrawals={withdrawal}
				totalPages={Math.ceil(Number(withdrawalCount) / pageSize)}
				currentPage={currentPage}
				handlePageChange={handlePageChange}
			/>
		</>
	);
}

// function* generateEarningData(n: number): Generator<WithdrawData> {
// 	for (let i = 1; i <= n; i++) {
// 		yield {
// 			transaction: `$2.${923 + i}.90`,
// 			payoutMethod: "Paypal",
// 			status: Math.random() > 0.5 ? "Paid" : "Failed",
// 			date: getTimeString(new Date()),
// 		};
// 	}
// }

// const withdrawalData = Array.from(generateEarningData(20));

// interface WithdrawData {
// 	transaction: string;
// 	payoutMethod: string;
// 	status: "Paid" | "Failed";
// 	date: string;
// }

const ContentListComponent = ({
	withdrawals,
	totalPages,
	currentPage,
	handlePageChange,
}: {
	withdrawals: any;
	totalPages: number;
	currentPage: number;
	handlePageChange: any;
}) => {
	return (
		<>
			<div className="flex flex-col">
				<table className="min-w-full divide-y divide-zinc-700 rounded-xl">
					<thead className="bg-transparent">
						<tr>
							<th
								scope="col"
								className="px-2 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
							>
								Transaction
							</th>
							<th
								scope="col"
								className="px-2 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
							>
								Payout Method
							</th>
							<th
								scope="col"
								className="px-2 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
							>
								Status
							</th>
							<th
								scope="col"
								className="px-2 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
							>
								Date Processed
							</th>
						</tr>
					</thead>
					<tbody className="bg-transparent">
						{withdrawals?.map((withdrawal: any, index: number) => {
							return (
								<tr key={index} className="hover:bg-zinc-900">
									<td className="text-white px-2 py-4 whitespace-nowrap">
										{`${withdrawal.pay_amount} ${withdrawal.pay_currency}`}
									</td>
									<td className="text-white px-2 py-4 whitespace-nowrap">
										{/* {withdrawal.pay_currency} */}
									</td>
									<td
										className={`${
											withdrawal.pay_status
												? "text-green-400"
												: "text-red-500"
										} px-2 py-4 whitespace-nowrap`}
									>
										{withdrawal.pay_status ? "Paid" : "Failed"}
									</td>
									<td className="px-2 py-4 text-gray-500 whitespace-nowrap">
										{getTimeString(new Date(withdrawal.created_at))}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<PaginationController 
					currentPage={currentPage}
            		onPageChange={handlePageChange}
            		totalPages={totalPages} 
				/>
			</div>
		</>
	);
};
