import AccountSidebar from "@/app/(account)/account/manage/account-sidebar";
// import BgImage from "@/public/images/account-header.png";
// import Image from "next/image";

export default function DefaultLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<div className="z-0 h-24 bg-gradient-to-r from-cyan-500 to-blue-500"> </div>
			<div className="flex flex-col md:flex-row w-full h-full px-10 mt-[-3rem] rounded-xl">
				<div className="flex w-full bg-zinc-800 rounded-2xl ">
					{/* Sidebar */}
					<div className="py-20 gap-10 md:w-1/4">
						<div className="flex flex-col gap-4 px-12">
							<AccountSidebar />
						</div>
					</div>
					{/* Main content */}
					<div className="flex-grow px-12 py-20 gap-12 md:w-3/4">
						{children}
					</div>
				</div>
			</div>
		</>
	);
}
