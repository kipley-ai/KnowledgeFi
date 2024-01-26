"use client";

import Image from "next/image";
import { TabIdentifier, useManageAccountContext } from "./account-context";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Tab {
	name: string;
	id: TabIdentifier;
	symbolPath: string;
}

const tabs: Tab[] = [
	{ name: "Dashboard", id: "db", symbolPath: "" },
	{ name: "Creator Overview", id: "co", symbolPath: "" },
	{ name: "Withdraw History", id: "wh", symbolPath: "" },
	{ name: "Deposit History", id: "dh", symbolPath: "" },
	{ name: "Credit Usage", id: "cu", symbolPath: "" },
];

export default function AccountSidebar() {
	const { currentTab, setCurrentTab } = useManageAccountContext();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter();

	const validTabIds = ["db", "co", "wh", "dh", "cu"];

	useEffect(() => {
		const params = new URLSearchParams(searchParams.toString());

		if (
			!searchParams.get("tab") ||
			!validTabIds.includes(searchParams.get("tab") || "")
		) {
			params.set("tab", "db");
		}

		setCurrentTab(searchParams.get("tab") as TabIdentifier);
		router.replace(`${pathname}?${params.toString()}`);
	}, [searchParams]);

	const handleButtonClick = (tabId: TabIdentifier) => (e: React.MouseEvent) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("tab", tabId);
		router.replace(`${pathname}?${params.toString()}`);
		setCurrentTab(tabId);
	};

	return (
		<>
			<div className="flex flex-col gap-4 pa-4">
				{tabs.map((tab) => {
					const isActive = currentTab == tab.id;

					return (
						<button
							// className="flex items-center px-4 py-3 rounded-3xl border-2 border-slate-100 gap-2"
							key={tab.id}
							className={`flex items-center px-4 py-3 rounded-3xl border-2 border-slate-100 hover:bg-slate-400 gap-2 ${
								isActive && "bg-zinc-900"
							}`}
							onClick={handleButtonClick(tab.id)}
						>
							<Image
								className="w-5 h-5"
								src={tab.symbolPath}
								height={20}
								width={20}
								alt={tab.name}
							/>
							<span className="text-slate-100 text-sm font-semibold">
								{tab.name}
							</span>
						</button>
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
