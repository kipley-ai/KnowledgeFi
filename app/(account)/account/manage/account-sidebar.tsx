"use client";

export default function AccountSidebar() {
	return (
		<div className="flex flex-col gap-4 pa-4">
			<button className="flex items-center px-4 py-3 rounded-3xl border-2 border-slate-100 gap-2">
				{/* Icon placeholder */}
				<div className="w-5 h-5" />
				<span className="text-slate-100 text-sm font-semibold">Dashboard</span>
			</button>
			<button className="flex items-center px-4 py-3 rounded-3xl border-2 border-zinc-700 gap-2">
				{/* Icon placeholder */}
				<div className="w-5 h-5" />
				<span className="text-gray-500 text-sm font-semibold">Settings</span>
			</button>
			<button className="flex items-center px-4 py-3 rounded-3xl border-2 border-zinc-700 gap-2">
				{/* Icon placeholder */}
				<div className="w-5 h-5" />
				<span className="text-gray-500 text-sm font-semibold">Withdrawal</span>
			</button>
		</div>
	);
}
