import DashboardCard05 from "@/app/(dashboard)/dashboard/dashboard-card-05";
import Image from "next/image";
import ConvoCheckMarkIcon from "@/components/icon/convo.svg";
import PersonIcon from "@/components/icon/person.svg";
import WaveIcon from "public/images/wave.svg";
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
		<div className="flex w-80 h-56 gap-4 flex-gap">
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
				<h1 className="text-3xl font-semibold text-slate-100">
					Creator Overview
				</h1>
				<DateFilterComponent />
			</div>
			<div className="flex flex-col gap-4 my-8 bg-zinc-900 rounded-2xl p-4">
				<div className="flex justify-between">
					<div className="flex items-center">
						<div className="py-4 px-2 bg-sky-200 rounded-sm"></div>
						<h1 className="text-2xl pl-2 text-zinc-100">Creator Overview</h1>
					</div>
					<button className="px-4 py-2 bg-sky-200 rounded-3xl text-sm text-black">
						Withdraw your earnings
					</button>
				</div>
				<div className="flex flex-row justify-between gap-4 pb-5">
					<StatsCard title="Earnings" number="388" icon={WaveIcon} />
					<StatsCard title="Users" number="512" icon={PersonIcon} />
					<StatsCard
						title="Conversation"
						number="64M"
						icon={ConvoCheckMarkIcon}
					/>
				</div>
			</div>
			<div className="dark py-3 rounded-xl">
				<DashboardCard05 />
			</div>
		</>
	);
}
