import { useSearchParams } from "next/navigation";
import { getTimeString } from "@/lib/string";
import { PaginationController } from "@/components/pagination/controller";
import Link from "next/link";
import Image from "next/image";
import InvoiceIcon from "public/images/invoice-icon.svg";

export default function CreditUsage() {
	const searchParams = useSearchParams();

	const page = searchParams.get("page") ?? "1";
	const perPage = searchParams.get("perPage") ?? "5";

	const start = (Number(page) - 1) * Number(perPage);
	const end = start + Number(perPage);

	return (
		<>
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-semibold text-slate-100">
					Credit Usage
				</h1>
			</div>
			<ContentListComponent
				credits={creditData.slice(start, end)}
				totalPages={Math.ceil(Number(creditData.length) / Number(perPage))}
				pageQuery="page"
			/>
		</>
	);
}

function* generateData(n: number): Generator<CreditData> {
	for (let i = 1; i <= n; i++) {
		yield {
			title: Math.random() > 0.5 ? "Buy Credit" : "Share Rewards",
			credit: (100 + i) * (Math.random() > 0.5 ? 1 : -1),
			date: getTimeString(new Date()),
		};
	}
}

const creditData = Array.from(generateData(20));

interface CreditData {
	title: string;
	credit: number;
	date: string;
}

const ContentListComponent = ({
	credits,
	totalPages,
	pageQuery,
}: {
	credits: CreditData[];
	totalPages: number;
	pageQuery: string;
}) => {
	return (
		<>
			<div className="flex flex-col">
				<table className="table-auto min-w-full divide-y divide-zinc-700 rounded-xl">
					<thead className="bg-transparent">
						<tr>
							<th
								scope="col"
								className="px-2 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
							>
								Title
							</th>
							<th
								scope="col"
								className="px-2 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
							>
								Credit
							</th>
							<th
								scope="col"
								className="px-2 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
							>
								Date
							</th>
						</tr>
					</thead>
					<tbody className="bg-transparent">
						{credits.map((credit, index) => {
							const positive = credit.credit > 0;
							return (
								<tr key={index} className="hover:bg-zinc-900">
									<td className="text-white px-2 py-4 whitespace-nowrap">
										{credit.title}
									</td>
									<td
										className={`text-white ${
											positive ? "!text-green-500" : "!text-red-500"
										} white px-2 py-4 whitespace-nowrap`}
									>
										{(positive ? "+" : "") + credit.credit}
									</td>
									<td className="px-2 py-4 text-gray-500 whitespace-nowrap">
										{credit.date}
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
