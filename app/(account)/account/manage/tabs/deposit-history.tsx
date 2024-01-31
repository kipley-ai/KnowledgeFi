import { useSearchParams } from "next/navigation";
import { getTimeString } from "@/lib/string";
import { PaginationController } from "@/components/pagination/controller";
import Link from "next/link";
import Image from "next/image";
import InvoiceIcon from "public/images/invoice-icon.svg"

export default function DepositHistory() {
	const searchParams = useSearchParams();

	const page = searchParams.get("page") ?? "1";
	const perPage = searchParams.get("perPage") ?? "5";

	const start = (Number(page) - 1) * Number(perPage);
	const end = start + Number(perPage);

	return (
		<>
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-semibold text-slate-100">
					Deposit History
				</h1>
			</div>
			<ContentListComponent
				deposits={depositData.slice(start, end)}
				totalPages={Math.ceil(Number(depositData.length) / Number(perPage))}
				pageQuery="page"
			/>
		</>
	);
}

function* generateEarningData(n: number): Generator<DepositData> {
	for (let i = 1; i <= n; i++) {
		yield {
			description: "Credit Charge",
			amount: `$${100 + i}`,
			status: "Expired",
			date: getTimeString(new Date()),
			invoice: "#",
		};
	}
}

const depositData = Array.from(generateEarningData(20));

interface DepositData {
	description: string;
	amount: string;
	date: string;
	status: "Expired" | "Not Expired";
	invoice: string;
}

const ContentListComponent = ({
	deposits,
	totalPages,
	pageQuery,
}: {
	deposits: DepositData[];
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
								Description
							</th>
							<th
								scope="col"
								className="px-2 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
							>
								Amount
							</th>
							<th
								scope="col"
								className="px-2 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
							>
								Date
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
								Invoice
							</th>
						</tr>
					</thead>
					<tbody className="bg-transparent">
						{deposits.map((deposit, index) => {
							return (
								<tr key={index} className="hover:bg-zinc-900">
									<td className="text-white px-2 py-4 whitespace-nowrap">
										{deposit.description}
									</td>
									<td className="text-white px-2 py-4 whitespace-nowrap">
										{deposit.amount}
									</td>
									<td className="px-2 py-4 text-gray-500 whitespace-nowrap">
										{deposit.date}
									</td>
									<td
										className={`${
											deposit.status == "Expired"
												? "text-red-500"
												: "text-green-400"
										} px-2 py-4 whitespace-nowrap`}
									>
										{deposit.status}
									</td>
									<td>
										<Link href={deposit.invoice}>
											<div className="hover:cursor-pointer flex pl-5">
												<Image
													src={InvoiceIcon}
													alt="Invoice link"
													width={30}
													height={30}
												/>
											</div>
										</Link>
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
