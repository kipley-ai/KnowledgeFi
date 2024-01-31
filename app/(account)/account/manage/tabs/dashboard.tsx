import DashboardCard05 from "@/app/(dashboard)/dashboard/dashboard-card-05";
import Image from "next/image";
import ConvoCheckMarkIcon from "@/components/icon/convo.svg";
import PersonIcon from "@/components/icon/person.svg";
import ConvoIcon from "@/components/icon/convo.svg";
import CodeIcon from "@/components/icon/code.svg";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PaginationController } from "@/components/pagination/controller";

const DateFilterComponent = () => (
	<>
		<div className="justify-start items-start gap-3 flex">
			<div className="h-12 px-4 py-3 rounded-xl border-2 border-zinc-900 justify-between items-center flex">
				<div className="text-slate-100 text-base font-mediumleading-normal pr-4">
					Last 30 days
				</div>
				<div className="flex items-center truncate">
					<svg
						className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-100"
						viewBox="0 0 12 12"
					>
						<path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
					</svg>
				</div>
			</div>
		</div>
	</>
);

const StatsCard = ({
	title,
	number,
	icon,
}: {
	title: string;
	number: string;
	icon: any;
}): JSX.Element => (
	<>
		<div className="flex w-80 h-56 gap-4 grow">
			<div className="flex flex-col grow p-10 bg-gradient-to-r bg-gray-800 rounded-2xl gap-4">
				<Image
					className="flex items-center justify-center w-10 h-10 p-2 bg-white rounded-xl shadow"
					src={icon}
					width={32}
					height={32}
					alt={`${title} icon`}
				/>
				{/* <div className="flex items-center justify-center w-10 h-10 p-2 bg-white rounded-xl shadow"></div> */}
				<div className="flex flex-col justify-start items-start h-20">
					<div className="flex flex-row text-zinc-100 text-base font-semibold items-center justify-center gap-2">
						{title}
						<div className="pt-0.5 bg-white hover:bg-blue-700 text-black font-semibold text-xs rounded-full h-4 w-4 flex items-center justify-center">
							i
						</div>
					</div>
					<div className="text-zinc-100 text-4xl font-semibold">{number}</div>
				</div>
			</div>
		</div>
	</>
);

const ContentListComponent = ({
	activities,
	totalPages,
	pageQuery,
}: {
	activities: ActivityData[];
	totalPages: number;
	pageQuery: string;
}) => {
	return (
		<>
			<div className="flex flex-col">
				<table className="min-w-full divide-y divide-zinc-700">
					<thead className="bg-tranparent">
						<tr>
							<th
								scope="col"
								className="px-2 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
							>
								My Activity
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
								Last Updated
							</th>
						</tr>
					</thead>
					<tbody className="bg-transparent">
						{activities.map((activity, index) => {
							return (
								<tr key={index} className="hover:bg-zinc-900">
									<td className="px-2 py-4 whitespace-nowrap text-white">
										{activity.name}
									</td>
									<td className="px-2 py-4 whitespace-nowrap text-white">
										{activity.amount}
									</td>
									<td className="px-2 py-4 whitespace-nowrap text-gray-500">
										{activity.lastUpdated}
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

interface ActivityData {
	name: string;
	amount: string;
	lastUpdated: string;
}

function* generateData(n: number): Generator<ActivityData> {
	for (let i = 1; i <= n; i++) {
		yield {
			name: Math.random() > 0.5 ? "Buy Credit" : "Withdrawal",
			amount: `${100 + 100 * i}`,
			lastUpdated: `${i} minutes ago`,
		};
	}
}

const activityData = Array.from(generateData(20));

export default function Dashboard() {
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();

	const page = searchParams.get("page") ?? "1";
	const perPage = searchParams.get("perPage") ?? "5";

	const start = (Number(page) - 1) * Number(perPage);
	const end = start + Number(perPage);

	return (
		<>
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-semibold text-slate-100">Dashboard</h1>
				<DateFilterComponent />
			</div>
			<div className="flex flex-col gap-4 my-8 bg-zinc-900 rounded-2xl p-4">
				<div className="flex justify-between">
					<div className="flex items-center">
						<div className="py-4 px-2 bg-sky-200 rounded-sm"></div>
						<h1 className="text-2xl pl-2 text-zinc-100">User Overview</h1>
					</div>
					<button className="px-4 py-2 bg-sky-200 rounded-3xl text-sm text-black">
						Reload Deposit
					</button>
				</div>
				<div className="flex flex-row flex-grow justify-between gap-4 pb-5 ">
					<StatsCard
						title="Conversations"
						number="3.8M"
						icon={ConvoCheckMarkIcon}
					/>
					<StatsCard title="Users" number="18,000" icon={PersonIcon} />
				</div>
			</div>
			<div className="py-3">
				<ContentListComponent
					activities={activityData.slice(start, end)}
					totalPages={Math.ceil(Number(activityData.length) / Number(perPage))}
					pageQuery="page"
				/>
			</div>
		</>
	);
}
