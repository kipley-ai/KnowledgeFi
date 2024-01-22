import DashboardCard05 from "@/app/(default)/dashboard/dashboard-card-05";
import Image from "next/image";
import ConvoCheckMarkIcon from "@/components/icon/convo.svg";
import PersonIcon from "@/components/icon/person.svg";
import ConvoIcon from "@/components/icon/convo.svg";
import CodeIcon from "@/components/icon/code.svg";
import { chartColors } from "@/components/charts/chartjs-config";

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
		<div className="flex w-80 h-56 gap-4 ">
			<div className="flex flex-col grow p-10 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-2xl gap-4">
				<Image
					className="flex items-center justify-center w-10 h-10 p-2 bg-white rounded-xl shadow"
					src={icon}
					width={32}
					height={32}
					alt={`${title} icon`}
				/>
				{/* <div className="flex items-center justify-center w-10 h-10 p-2 bg-white rounded-xl shadow"></div> */}
				<div className="flex flex-col justify-start items-start h-20">
					<div className="text-zinc-900 text-base font-semibold">{title}</div>
					<div className="text-zinc-900 text-4xl font-semibold">{number}</div>
				</div>
			</div>
		</div>
	</>
);

interface ChatData {
	title: string;
	value: string;
	type: string;
}

const ContentListComponent = ({ chats }: { chats: ChatData[] }) => {
	return (
		<>
			<div className="flex flex-col rounded-xl border border-zinc-700">
				<div className="px-8 py-5 bg-zinc-800 border-b border-zinc-700 backdrop-blur-xl flex justify-between items-center">
					<span className="text-gray-500 text-sm font-semibold">Title</span>
					<span className="text-gray-500 text-sm font-medium">Value</span>
					<span className="text-gray-500 text-sm font-semibold">Action</span>
				</div>
				<div className="flex flex-col space-y-4 p-4">
					{chats.map((chat, index) => {
						const chatIcon = chat.type == "code" ? CodeIcon : ConvoIcon;
						const bgColor =
							chat.type == "code" ? "bg-orange-400" : "bg-purple-400";

						return (
							<div
								key={index}
								className="flex justify-between items-center rounded-xl hover:bg-zinc-900 p-4"
							>
								<div className="flex items-center gap-5 ">
									<Image
										className={`flex items-center justify-center w-10 h-10 p-2 ${bgColor} rounded-xl shadow`}
										src={chatIcon}
										width={32}
										height={32}
										alt={`${chat.title} icon`}
									/>
									<span className="text-white text-base font-semibold">
										{chat.title}
									</span>
								</div>
								<span className="text-gray-500 text-base font-bold">
									{chat.value}
								</span>
								<button className="h-8 px-2.5 py-1 rounded-3xl border-2 border-cyan-400 text-cyan-400 text-xs font-semibold">
									Withdraw
								</button>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

const chatData = [
	{ title: "Chat 101", value: "2.5 ETH", type: "convo" },
	{ title: "Chat 202", value: "2.5 ETH", type: "code" },
	{ title: "Chat 303", value: "2.5 ETH", type: "convo" },
	{ title: "Chat 404", value: "2.5 ETH", type: "code" },
	{ title: "Chat 505", value: "2.5 ETH", type: "code" },
	{ title: "Chat 606", value: "2.5 ETH", type: "code" },
];

export default function AccountSettings() {
	return (
		<>
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-semibold text-slate-100">Dashboard</h1>
				<DateFilterComponent />
			</div>
			<div className="flex flex-wrap gap-4 my-8">
				<StatsCard
					title="Conversations"
					number="3.8M"
					icon={ConvoCheckMarkIcon}
				/>
				<StatsCard title="Users" number="18,000" icon={PersonIcon} />
			</div>
			<div className="py-3">
				<ContentListComponent chats={chatData} />
			</div>
			<div className="dark py-3 rounded-xl">
				<DashboardCard05 />
			</div>
		</>
	);
}
