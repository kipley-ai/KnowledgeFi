"use client";

import { useEffect, useState, useRef } from "react";
import { useAppProvider } from "@/providers/app-provider";
import { useAccount } from "wagmi";
import Link from "next/link";

import DropdownTwitter from "@/components/dropdown-twitter";
import SearchForm from "../search-form";
import GetInvolvedButton from "../GetInvolvedButton/get-involved-button";
import ModalLoginTwitter from "@/components/modal-login-twitter";
import UserAvatar from "@/public/images/user-avatar-32.png";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { dataLength } from "ethers";
import AvatarWithStatus from "./avatar-with-status";
import defaultAvatar from "public/images/user-32-03.jpg";
import { StaticImageData } from "next/image";

// const GetInvolvedButton = dynamic(
// 	() => import("../GetInvolvedButton/get-involved-button"),
// 	{
// 		ssr: false,
// 	}
// );

export default function Header() {
	const { sidebarOpen, setSidebarOpen } = useAppProvider();

	// const [showTwitterLogin, setShowTwitterLogin] = useState<boolean>(false);
	// const [showAccountButton, setShowAccountButton] = useState<boolean>(false);
	const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
	const { data: twitterSession, status: twitterStatus } = useSession();
	const [profileImage, setProfileImage] = useState<StaticImageData | string>(
		""
	);

	const { modalLogin, setModalLogin } = useAppProvider();
	const { isConnected } = useAccount();
	const [isConnected_, setIsConnected_] = useState<boolean>(false);

	const { headerTitle } = useAppProvider();

	useEffect(() => {
		setIsConnected_(isConnected);
		// setShowTwitterLogin(walletConnected && twitterStatus !== "authenticated");
		// setShowAccountButton(walletConnected && twitterStatus === "authenticated");
		setProfileImage(twitterSession?.user?.image || "");

		console.log(twitterSession);
	}, [isConnected, twitterStatus]);

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

							<span className="text-sm font-medium text-white ml-3 duration-200">
								{headerTitle}
							</span>
						</div>
					</div>

					{/* Header: Right side */}
					<div className="flex items-center">
						{/* Create Chatbot Button */}
						<Link href="/knowledge/create">
							<button className="pr-3">
								<div className="flex items-center border border-[#01F7FF] px-1 py-1 rounded-full">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="28"
										height="28"
										fill="none"
										viewBox="0 0 36 36"
									>
										<path
											fill="#F1F5F9"
											fillRule="evenodd"
											d="M18 7C11.925 7 7 11.925 7 18s4.925 11 11 11 11-4.925 11-11S24.075 7 18 7zm0 6a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3h-3a1 1 0 110-2h3v-3a1 1 0 011-1z"
											clipRule="evenodd"
										>
											{" "}
										</path>
									</svg>
									<span className="text-sm font-medium ml-1 mr-2 text-neutral-300 duration-200">
										Create chat bot
									</span>
								</div>
							</button>
						</Link>
						{/* My Bot Button */}
						<Link href="/nft">
						<button className="pr-3">
							<div className="flex items-center border border-[#01F7FF] px-2 py-1.5 rounded-full">
								<span className="text-sm font-medium mx-1 text-neutral-300 duration-200">
									My Bots
								</span>
							</div>
						</button>
						</Link>
						{/* Connect Wallet Button */}
						{!isConnected_ && (
							<GetInvolvedButton
								buttonStyle="flex items-center border border-gray-700 rounded-full py-3 px-4 text-sm font-medium ml-3 text-neutral-300 duration-200 mr-3"
								wrapStyle="flex items-center text-sm font-medium ml-3 text-neutral-300 duration-200"
								chainStyle="flex items-center text-sm font-medium ml-3 text-neutral-300 duration-200"
								content={
									<>
										<svg
											width="20"
											height="20"
											viewBox="0 0 20 20"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M-0.000976562 14.2241C0.333594 12.758 1.14413 11.444 2.30378 10.4875C3.15538 9.66561 3.96528 8.80065 4.83078 7.92185L6.54913 9.72624L8.48479 7.68661L9.68383 8.91589L7.77469 10.7657L9.21001 12.1314L11.0295 10.256L12.2702 11.5204L10.3119 13.3844L12.1527 15.1243C11.8836 15.3557 11.6752 15.5164 11.4895 15.6997C10.7516 16.4268 10.0036 17.1463 9.29222 17.8986C8.36961 18.9927 7.09825 19.7348 5.6925 20H4.80796C4.0883 19.766 3.39032 19.4699 2.72191 19.115C2.02335 18.6865 1.42152 18.1173 0.954517 17.4436C0.487513 16.7699 0.165573 16.0064 0.00920303 15.2015L-0.000976562 14.2241ZM4.94954 10.4952C4.11058 11.2729 3.20841 11.9871 2.45662 12.8355C1.96917 13.3084 1.68754 13.9545 1.67264 14.6338C1.65774 15.313 1.91079 15.9709 2.37704 16.4647C2.75949 16.9525 3.20807 17.3844 3.70995 17.748C4.14545 18.1181 4.69732 18.3231 5.26866 18.3268C5.84 18.3305 6.39436 18.1328 6.83462 17.7684C7.83531 16.9793 8.7172 16.0424 9.63324 15.1863L4.94954 10.4952Z"
												fill="white"
											/>
											<path
												d="M19.9964 5.77497C19.6682 7.22751 18.8684 8.53024 17.722 9.47976C16.8552 10.3067 16.034 11.1818 15.2317 11.9948L8.01465 4.78742C8.26735 4.53452 8.59075 4.23345 8.89904 3.92365C9.68579 3.14053 10.4709 2.35525 11.2542 1.56791C12.0623 0.756151 13.0979 0.209354 14.2236 -1.52588e-05H15.2015C15.9081 0.227784 16.5933 0.517295 17.2494 0.864982C17.9553 1.29505 18.5645 1.86687 19.038 2.54466C19.5114 3.22244 19.8389 3.99144 20.0001 4.80254L19.9964 5.77497ZM15.079 9.49489C15.8914 8.73621 16.7719 8.02306 17.5224 7.18977C18.0115 6.71859 18.297 6.07461 18.318 5.39557C18.339 4.71653 18.094 4.05624 17.635 3.55567C17.2661 3.07516 16.8309 2.64943 16.3425 2.29121C15.878 1.88388 15.2792 1.66262 14.6616 1.67009C14.0441 1.67756 13.451 1.91321 12.9965 2.33165C12.0615 3.09033 11.2278 3.98427 10.3813 4.79606L15.079 9.49489Z"
												fill="white"
											/>
										</svg>
										<span className="text-sm font-medium ml-3 text-neutral-300 duration-200">
											Connect Wallet
										</span>
									</>
								}
							/>
						)}
						{/* Profile Picture */}
						<AvatarWithStatus image={profileImage} status="away" />
						{/* {showTwitterLogin && (
							<>
								<ModalLoginTwitter
									isOpen={modalLogin}
									setIsOpen={setModalLogin}
								/>
								<button
									onClick={() => setModalLogin(true)}
									className="text-sm font-medium ml-3  text-neutral-300 border border-gray-700 rounded-full py-3 px-4 duration-200"
								>
									Connect Twitter
								</button>
							</>
						)}
						{(showAccountButton && twitterStatus == "authenticated") && (
							<>
								<DropdownTwitter twitterSession={twitterSession} align="right" />
							</>
						)} */}
					</div>
				</div>
			</div>
		</header>
	);
}
