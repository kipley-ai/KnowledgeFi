import DashboardCard05 from "@/app/(dashboard)/dashboard/dashboard-card-05";
import Image from "next/image";
import ConvoCheckMarkIcon from "@/components/icon/convo.svg";
import PersonIcon from "@/components/icon/person.svg";
import ConvoIcon from "@/components/icon/convo.svg";
import CodeIcon from "@/components/icon/code.svg";
import { chartColors } from "@/components/charts/chartjs-config";

export const DateFilterComponent = () => (
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

const MyActivityTable = () => {
	return <div className="flex flex-col  w-full">
			<table className="w-full mx-3 my-4 text-left table-auto font-semibold text-white">
				<thead>
					<tr className="border-b border-gray-700 text-[#7C878E] text-sm">
						<th className="py-5 pl-8">My Activity</th>
						<th className="py-5 ">Amount</th>
						<th className="py-5 ">Last Updated</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="py-5 pl-8">Buy Credit</td>
						<td className="py-5 ">500</td>
						<td className="text-gray-500 py-5">10 mins ago</td>
					</tr>
					<tr>
						<td className="py-5 pl-8">Withdrawal</td>
						<td className="py-5">1000</td>
						<td className="text-gray-500 py-5">8 mins ago</td>
					</tr>
					<tr>
						<td className="py-5 pl-8">Buy Credit</td>
						<td className="py-5">200</td>
						<td className="text-gray-500 py-5">5 mins ago</td>
					</tr>
				</tbody>
			</table>
		</div>
}

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
		<div className="flex flex-col py-8 px-10 w-5/6">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-semibold text-slate-100">Dashboard</h1>
				<DateFilterComponent />
			</div>
			<div className="flex flex-col gap-4 my-8 bg-[#1A1D1F] rounded-xl p-6 ">
				<div className="flex items-center justify-between mb-8">
					{/* <div className="content-none rounded-xl bg-[#B1E5FC]">a</div> */}
					<div className="flex">
						<svg width="16" height="33" viewBox="0 0 16 33" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect y="0.5" width="16" height="32" rx="4" fill="#B1E5FC"/>
						</svg>
						<h4 className="ml-4 text-2xl font-semibold text-white">User Overview</h4>
					</div>
					<button className="text-[#1A1D1F] text-base rounded-full bg-[#B1E5FC] px-4 py-3 font-semibold">
						Reload Deposit
					</button>
				</div>
				<div className="flex">
					<div className="bg-[#293135] rounded-xl p-8 w-1/2 mr-3">
						<div className="rounded-full p-3 bg-white w-fit mb-4">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M3 2C2.44772 2 2 2.44772 2 3C2 3.55228 2.44772 4 3 4H4V18C4 20.2091 5.79086 22 8 22H16C18.2091 22 20 20.2091 20 18V4H21C21.5523 4 22 3.55228 22 3C22 2.44772 21.5523 2 21 2H3ZM18 4H6V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V4Z" fill="#181B1F"/>
								<path d="M12.7071 7.29289C12.3166 6.90237 11.6834 6.90237 11.2929 7.29289L8.29289 10.2929C7.90237 10.6834 7.90237 11.3166 8.29289 11.7071C8.68342 12.0976 9.31658 12.0976 9.70711 11.7071L11 10.4142V16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16V10.4142L14.2929 11.7071C14.6834 12.0976 15.3166 12.0976 15.7071 11.7071C16.0976 11.3166 16.0976 10.6834 15.7071 10.2929L12.7071 7.29289Z" fill="#181B1F"/>
							</svg>
						</div>
						<div className="flex items-center">
							<h4 className="text-white text-[16px] font-semibold mr-1">Token Deposits</h4>
							<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M13.6668 6.99967C13.6668 10.6816 10.6821 13.6663 7.00016 13.6663C3.31826 13.6663 0.333496 10.6816 0.333496 6.99967C0.333496 3.31778 3.31826 0.333008 7.00016 0.333008C10.6821 0.333008 13.6668 3.31778 13.6668 6.99967ZM7.00016 6.33301C7.36835 6.33301 7.66683 6.63148 7.66683 6.99967V10.3336C7.66683 10.7018 7.36835 11.0003 7.00016 11.0003C6.63197 11.0003 6.3335 10.7018 6.3335 10.3336V6.99967C6.3335 6.63148 6.63197 6.33301 7.00016 6.33301ZM7.00016 4.99967C7.36835 4.99967 7.66683 4.7012 7.66683 4.33301C7.66683 3.96482 7.36835 3.66634 7.00016 3.66634C6.63197 3.66634 6.3335 3.96482 6.3335 4.33301C6.3335 4.7012 6.63197 4.99967 7.00016 4.99967Z" fill="#EFEFEF"/>
							</svg>
						</div>
						<h4 className="text-white text-4xl font-semibold">500</h4>
					</div>
					<div className="bg-[#2b2d35] rounded-xl p-8 w-1/2">
						<div className="rounded-full p-3 bg-white w-fit mb-4">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M2 7C2 5.34315 3.34315 4 5 4H19C20.6569 4 22 5.34315 22 7V17C22 18.6569 20.6569 20 19 20H5C3.34315 20 2 18.6569 2 17V7ZM5 6H19C19.5523 6 20 6.44771 20 7V8H4V7C4 6.44772 4.44772 6 5 6ZM4 10V17C4 17.5523 4.44772 18 5 18H19C19.5523 18 20 17.5523 20 17V10H4Z" fill="#1A1D1F"/>
								<path fill-rule="evenodd" clip-rule="evenodd" d="M6 15C6 14.4477 6.44772 14 7 14H13C13.5523 14 14 14.4477 14 15C14 15.5523 13.5523 16 13 16H7C6.44772 16 6 15.5523 6 15Z" fill="#1A1D1F"/>
							</svg>
						</div>
						<div className="flex items-center">
							<h4 className="text-white text-[16px] font-semibold mr-1">Credit Balance</h4>
							<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M13.6668 6.99967C13.6668 10.6816 10.6821 13.6663 7.00016 13.6663C3.31826 13.6663 0.333496 10.6816 0.333496 6.99967C0.333496 3.31778 3.31826 0.333008 7.00016 0.333008C10.6821 0.333008 13.6668 3.31778 13.6668 6.99967ZM7.00016 6.33301C7.36835 6.33301 7.66683 6.63148 7.66683 6.99967V10.3336C7.66683 10.7018 7.36835 11.0003 7.00016 11.0003C6.63197 11.0003 6.3335 10.7018 6.3335 10.3336V6.99967C6.3335 6.63148 6.63197 6.33301 7.00016 6.33301ZM7.00016 4.99967C7.36835 4.99967 7.66683 4.7012 7.66683 4.33301C7.66683 3.96482 7.36835 3.66634 7.00016 3.66634C6.63197 3.66634 6.3335 3.96482 6.3335 4.33301C6.3335 4.7012 6.63197 4.99967 7.00016 4.99967Z" fill="#EFEFEF"/>
							</svg>
						</div>
						<h4 className="text-white text-4xl font-semibold">1000</h4>
					</div>
				</div>
				{/* <StatsCard
					title="Conversations"
					number="3.8M"
					icon={ConvoCheckMarkIcon}
				/>
				<StatsCard title="Users" number="18,000" icon={PersonIcon} /> */}
			</div>
			<MyActivityTable/>
			{/* <div className="py-3">
				<ContentListComponent chats={chatData} />
			</div>
			<div className="dark py-3 rounded-xl">
				<DashboardCard05 />
			</div> */}
		</div>
	);
}
