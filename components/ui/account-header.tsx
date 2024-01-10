"use client";

import { useState } from "react";
import { useAppProvider } from "@/app/app-provider";

import SearchModal from "@/components/search-modal";
import Notifications from "@/components/dropdown-notifications";
import DropdownHelp from "@/components/dropdown-help";
import ThemeToggle from "@/components/theme-toggle";
import DropdownAccount from "@/components/dropdown-account";
import SearchForm from "../search-form";

export default function AccountHeader() {
	const { sidebarOpen, setSidebarOpen } = useAppProvider();
	const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);

	// const checkMetamask = () => {
	// 	return window.ethereum ? true : false;
	// };

	// const metamask = checkMetamask();

	return (
		<header
			className=" bg-stone-800 border-b border-gray-700 z-30"
			style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1);" }}
		>
			<div className="px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16 -mb-px">
					{/* Header: Left side */}
					<div className="flex">
						{/* Hamburger button */}
						<button
							className="text-slate-500 hover:text-slate-600 lg:hidden"
							aria-controls="sidebar"
							aria-expanded={sidebarOpen}
							onClick={() => {
								setSidebarOpen(!sidebarOpen);
							}}
						>
							<span className="sr-only">Open sidebar</span>
							<svg
								className="w-6 h-6 fill-current"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<rect x="4" y="5" width="16" height="2" />
								<rect x="4" y="11" width="16" height="2" />
								<rect x="4" y="17" width="16" height="2" />
							</svg>
						</button>

						<div className="flex items-center">
							<svg
								width="18"
								height="18"
								viewBox="0 0 18 18"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M13.8653 0.666665H4.13439C3.69511 0.666651 3.31612 0.666638 3.00398 0.692141C2.67453 0.719058 2.34685 0.778488 2.03153 0.93915C1.56112 1.17883 1.17867 1.56128 0.93899 2.03169C0.778328 2.34701 0.718898 2.67469 0.691981 3.00414C0.666478 3.31628 0.66649 3.69524 0.666505 4.13451V8.90931C0.666505 9.27031 0.666505 9.45081 0.740942 9.61489C0.801213 9.74775 0.922929 9.88942 1.04519 9.96901C1.1962 10.0673 1.35199 10.091 1.66358 10.1385C2.16063 10.2142 2.66403 10.25 3.16647 10.25C5.9212 10.25 8.41594 9.13662 10.2253 7.33333H8.99984C8.5396 7.33333 8.1665 6.96024 8.1665 6.5C8.1665 6.03976 8.5396 5.66666 8.99984 5.66666H12.3332C12.7934 5.66666 13.1665 6.03976 13.1665 6.5V9.83333C13.1665 10.2936 12.7934 10.6667 12.3332 10.6667C11.8729 10.6667 11.4998 10.2936 11.4998 9.83333V8.41482C9.38305 10.5749 6.43147 11.9166 3.16647 11.9166C2.87648 11.9166 2.58885 11.906 2.30397 11.8852C1.66896 11.8387 1.35145 11.8155 1.15994 11.9011C0.976823 11.9829 0.860743 12.0908 0.765798 12.2674C0.666505 12.4522 0.666505 12.7361 0.666505 13.3039V13.8655C0.66649 14.3047 0.666478 14.6837 0.691981 14.9959C0.718898 15.3253 0.778328 15.653 0.93899 15.9683C1.17867 16.4387 1.56112 16.8212 2.03153 17.0608C2.34685 17.2215 2.67453 17.2809 3.00398 17.3079C3.31612 17.3334 3.69508 17.3333 4.13437 17.3333H13.8653C14.3046 17.3333 14.6836 17.3334 14.9957 17.3079C15.3251 17.2809 15.6528 17.2215 15.9681 17.0608C16.4386 16.8212 16.821 16.4387 17.0607 15.9683C17.2213 15.653 17.2808 15.3253 17.3077 14.9959C17.3332 14.6837 17.3332 14.3048 17.3332 13.8655V4.13453C17.3332 3.69524 17.3332 3.31628 17.3077 3.00414C17.2808 2.67469 17.2213 2.34701 17.0607 2.03169C16.821 1.56128 16.4386 1.17883 15.9681 0.93915C15.6528 0.778488 15.3251 0.719058 14.9957 0.692141C14.6836 0.666638 14.3046 0.666651 13.8653 0.666665Z"
									fill="#01F7FF"
								/>
							</svg>

							<span
								className="text-sm font-medium text-white ml-3 duration-200"
								//style={{ fontSize: '14px', fontWeight: 600, color: '#FFFFFF' }}
							>
								Manage Account
							</span>
						</div>
					</div>

					{/* Header: Right side */}
					<div className="flex items-center space-x-3">
						<SearchForm />
						<DropdownAccount align="right" />
						{/* <div> 
              {metamask?'anjay':'anjuy'}
            </div> */}
						{/* <DropdownProfile align="right" /> */}
					</div>
				</div>
			</div>
		</header>
	);
}
