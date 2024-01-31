import { useSearchParams } from "next/navigation";
import { getTimeString } from "@/lib/string";
import { PaginationController } from "@/components/pagination/controller";

export default function WithdrawHistory() {
	const searchParams = useSearchParams();

	const page = searchParams.get("page") ?? "1";
	const perPage = searchParams.get("perPage") ?? "5";

	const start = (Number(page) - 1) * Number(perPage);
	const end = start + Number(perPage);

	return (
		<>
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-semibold text-slate-100">
					Withdraw History
				</h1>
			</div>
			<ContentListComponent
				withdrawals={withdrawalData.slice(start, end)}
				totalPages={Math.ceil(Number(withdrawalData.length) / Number(perPage))}
				pageQuery="page"
			/>
		</>
	);
}

function* generateEarningData(n: number): Generator<WithdrawData> {
	for (let i = 1; i <= n; i++) {
		yield {
			transaction: `$2.${923 + i}.90`,
			payoutMethod: "Paypal",
			status: Math.random() > 0.5 ? "Paid" : "Failed",
			date: getTimeString(new Date()),
		};
	}
}

const withdrawalData = Array.from(generateEarningData(20));

interface WithdrawData {
	transaction: string;
	payoutMethod: string;
	status: "Paid" | "Failed";
	date: string;
}

const ContentListComponent = ({
	withdrawals,
	totalPages,
	pageQuery,
}: {
	withdrawals: WithdrawData[];
	totalPages: number;
	pageQuery: string;
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
						{withdrawals.map((withdrawal, index) => {
							return (
								<tr key={index} className="hover:bg-zinc-900">
									<td className="text-white px-2 py-4 whitespace-nowrap">
										{withdrawal.transaction}
									</td>
									<td className="text-white px-2 py-4 whitespace-nowrap">
										{withdrawal.payoutMethod}
									</td>
									<td
										className={`${
											withdrawal.status == "Paid"
												? "text-green-400"
												: "text-red-500"
										} px-2 py-4 whitespace-nowrap`}
									>
										{withdrawal.status}
									</td>
									<td className="px-2 py-4 text-gray-500 whitespace-nowrap">
										{withdrawal.date}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<PaginationController totalPages={totalPages} pageQuery={pageQuery} />
			</div>
		</>
	);
};
