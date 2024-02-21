"use client";

import Image from "next/image";
import { TabIdentifier, useManageAccountContext } from "./account-context";
import React from "react";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import DashboardIcon from "public/images/file.svg";
import ArrowTopRightIcon from "public/images/arrow-top-right.svg";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface Tab {
	name: string;
	id: TabIdentifier;
	iconPath: string | StaticImport;
}

const tabs: Tab[] = [
	{ name: "Dashboard", id: "dashboard", iconPath: DashboardIcon },
	{ name: "Earnings Reports", id: "earning", iconPath: ArrowTopRightIcon },
	{ name: "Creator Overview", id: "creator", iconPath: ArrowTopRightIcon },
	{ name: "Withdraw History", id: "withdraw", iconPath: ArrowTopRightIcon },
	{ name: "Deposit History", id: "deposit", iconPath: ArrowTopRightIcon },
	{ name: "Credit Usage", id: "credit", iconPath: ArrowTopRightIcon },
];

const validTabs = tabs.map((tab) => tab["id"]);

export default function AccountSidebar() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter();

	useEffect(() => {
		let currentTab_ = searchParams.get("tab") || "";

		if (!validTabs.includes(currentTab_ as TabIdentifier)) {
			router.replace(`${pathname}?tab=dashboard`);
		}
	}, [searchParams]);

	return (
		<>
			<div className="flex flex-col gap-4 pa-4">
				{tabs.map((tab) => {
					const isActive = searchParams.get("tab") == tab.id;

					return (
						<Link
							key={tab.id}
							href={`${pathname}?tab=${tab.id}`}
							className={`flex items-center px-4 py-3 rounded-3xl border-2 gap-2 ${
								isActive
									? "border-cyan-400 text-cyan-400"
									: "border-transparent hover:border-cyan-400 text-gray-600"
							}`}
						>
							<Image
								className="w-5 h-5"
								src={tab.iconPath}
								height={20}
								width={20}
								alt={tab.name}
							/>
							<span className="text-sm font-semibold">{tab.name}</span>
						</Link>
					);
				})}
			</div>
		</>
	);
}

// export default function AccountSidebar() {
// 	return (
// 		<div className="flex flex-col gap-4 pa-4">
// 			<button className="flex items-center px-4 py-3 rounded-3xl border-2 border-slate-100 gap-2">
// 				{/* Icon placeholder */}
// 				<div className="w-5 h-5" />
// 				<span className="text-slate-100 text-sm font-semibold">Dashboard</span>
// 			</button>
// 			<button className="flex items-center px-4 py-3 rounded-3xl border-2 border-zinc-700 gap-2">
// 				{/* Icon placeholder */}
// 				<div className="w-5 h-5" />
// 				<span className="text-gray-500 text-sm font-semibold">Settings</span>
// 			</button>
// 			<button className="flex items-center px-4 py-3 rounded-3xl border-2 border-zinc-700 gap-2">
// 				{/* Icon placeholder */}
// 				<div className="w-5 h-5" />
// 				<span className="text-gray-500 text-sm font-semibold">Withdrawal</span>
// 			</button>
// 		</div>
// 	);
// }
