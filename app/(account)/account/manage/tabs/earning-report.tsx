import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PaginationController } from "@/components/pagination/controller";
import { getTimeString } from "@/lib/string";

export default function EarningReport() {
	const searchParams = useSearchParams();

	const page = searchParams.get("page") ?? "1";
	const perPage = searchParams.get("perPage") ?? "5";

	const start = (Number(page) - 1) * Number(perPage);
	const end = start + Number(perPage);

	return (
		<>
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-semibold text-slate-100">
					Earning Reports
				</h1>
			</div>
			<ContentListComponent
				earnings={earningData.slice(start, end)}
				totalPages={Math.ceil(Number(earningData.length) / Number(perPage))}
				pageQuery="page"
			/>
		</>
	);
}

interface EarningData {
	item: string;
	price: number;
	date: string;
	buyerId: string;
	earnings: number;
	status: "Success" | "Failed";
}

function* generateEarningData(n: number): Generator<EarningData> {
	for (let i = 1; i <= n; i++) {
		yield {
			item: `Chatbot ${101 + i}`,
			price: Math.floor(Math.random() * 100) + 100, // Random price between 100 and 600
			date: getTimeString(new Date()),
			buyerId: `#cheyn_${2391 + i}`, // Buyer ID like B001, B002, ...
			earnings: Math.floor(Math.random() * 100) + 50, // Random earnings between 50 and 350
			status: Math.random() > 0.5 ? "Success" : "Failed", // Random status
		};
	}
}

const earningData = Array.from(generateEarningData(20));

const ContentListComponent = ({
	earnings,
	totalPages,
	pageQuery,
}: {
	earnings: EarningData[];
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
								Item
							</th>
							<th
								scope="col"
								className="px-2 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
							>
								Price
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
								Buyer ID
							</th>
							<th
								scope="col"
								className="px-2 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
							>
								Earnings
							</th>
							<th
								scope="col"
								className="px-2 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
							>
								Status
							</th>
						</tr>
					</thead>
					<tbody className="bg-transparent">
						{earnings.map((earning, index) => {
							return (
								<tr key={index} className="hover:bg-zinc-900">
									<td className="text-white px-2 py-4 whitespace-nowrap">
										{earning.item}
									</td>
									<td className="text-white px-2 py-4 whitespace-nowrap">
										{earning.price}
									</td>
									<td className="px-2 py-4 whitespace-nowrap">
										{earning.date}
									</td>
									<td className="text-white px-2 py-4 whitespace-nowrap">
										{earning.buyerId}
									</td>
									<td className="text-white px-2 py-4 whitespace-nowrap">
										{earning.earnings}
									</td>
									<td
										className={`${
											earning.status == "Success"
												? "text-green-400"
												: "text-red-500"
										} px-2 py-4 whitespace-nowrap`}
									>
										{earning.status}
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
