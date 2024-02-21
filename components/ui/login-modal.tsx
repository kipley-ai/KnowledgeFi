"use client";

import CloseIcon from "@/components/icon/close.svg";
import TwitterXIcon from "@/components/icon/twitter-x.png";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { Dialog, Transition } from "@headlessui/react";
import { useAppProvider } from "@/providers/app-provider";

interface SessionData {
	user: string;
	email: string;
	name: string;
}

interface LoginModalProps {
	children: React.ReactNode;
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
}

const LogInModal = ({ children, isOpen, setIsOpen }: LoginModalProps) => {
	const handleLoginButton = () => {
		signIn("twitter");
	};

	return (
		<>
			<Transition appear show={isOpen}>
				<Dialog as="div" onClose={() => setIsOpen(false)}>
					<Transition.Child
						className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
						enter="transition ease-out duration-200"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition ease-out duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
						aria-hidden="true"
					/>
					<Transition.Child
						className="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center px-4 sm:px-6"
						enter="transition ease-in-out duration-200"
						enterFrom="opacity-0 translate-y-4"
						enterTo="opacity-100 translate-y-0"
						leave="transition ease-in-out duration-200"
						leaveFrom="opacity-100 translate-y-0"
						leaveTo="opacity-0 translate-y-4"
					>
						<div className="min-h-screen bg-gray-800">
							<div className="flex justify-center items-center h-screen">
								<div className="flex flex-col justify-between items-center  bg-zinc-900 p-4 rounded-lg shadow-md">
									<div className="self-stretch p-5 justify-between items-center inline-flex">
										<div className="w-80 text-gray-50 text-3xl font-bold leading-10">
											Sign to continue
										</div>
										<button className="p-2 rounded-3xl border-2 border-gray-200 justify-center items-center gap-2.5 flex">
											<Image
												priority={true}
												className="w-6 h-6 p-1 justify-center items-center flex"
												src={CloseIcon}
												width={24}
												height={24}
												alt="Close"
											/>
										</button>
									</div>
									<div className="max-w-full justify-center py-5 md:w-96 flex flex-col gap-5">
										<div className="flex-grow flex justify-center items-center rounded-3xl">
											<button
												onClick={handleLoginButton}
												className="flex-grow flex-shrink-0 h-11 px-2 py-4 bg-white rounded-3xl flex justify-center items-center gap-2"
											>
												<Image
													priority={true}
													className="w-5 h-5 bg-neutral-800 rounded-3xl flex justify-center items-center mx-1.5 my-1.5"
													src={TwitterXIcon}
													width={20}
													height={20}
													alt="Twitter-X Icon"
												/>
												<div className="text-center text-xs md:text-sm text-zinc-950 font-extrabold uppercase leading-tight tracking-wide">
													Connect X
												</div>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Transition.Child>
				</Dialog>
			</Transition>
		</>
	);
};

const LogOutModal = ({ sessionData }: { sessionData: SessionData }) => {
	const handleLogoutButton = () => signOut();

	return (
		<>
			<div className="min-h-screen bg-gray-800">
				<div className="flex justify-center items-center h-screen">
					<div className="flex flex-col justify-between items-center bg-zinc-900 p-4 rounded-lg shadow-md">
						<div className="self-stretch p-5 justify-between items-center inline-flex">
							<div className="w-80 text-gray-50 text-3xl font-bold leading-10">
								You are already logged in as {sessionData.email || ""}.
							</div>
						</div>
						<div className="max-w-full justify-center py-5 md:w-96 flex flex-col gap-5">
							<div className="flex-grow flex justify-center items-center rounded-3xl">
								<button
									onClick={handleLogoutButton}
									className="flex-grow flex-shrink-0 h-11 px-2 py-4 bg-white rounded-3xl flex justify-center items-center gap-2"
								>
									<Image
										priority={true}
										className="w-5 h-5 bg-neutral-800 rounded-3xl flex justify-center items-center mx-1.5 my-1.5"
										src={TwitterXIcon}
										width={20}
										height={20}
										alt="Twitter-X Icon"
									/>
									<div className="text-center text-xs md:text-sm text-zinc-950 font-extrabold uppercase leading-tight tracking-wide">
										Logout X
									</div>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			;
		</>
	);
};