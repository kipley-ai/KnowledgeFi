"use client";

import CloseIcon from "@/components/icon/close.svg";
import TwitterXIcon from "@/components/icon/twitter-x.png";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

const LogInModal = () => {
	const handleLoginButton = () => {
		signIn("twitter").then((response) => {
			if (response?.error) {
				console.log(response.error);
				redirect("/auth/twitter");
			}
		});
	};

	return (
		<>
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
		</>
	);
};

interface SessionData {
	user?: string;
	email?: string;
	name?: string;
}

const LogOutModal = ({ sessionData }: { sessionData: SessionData }) => {
	const handleLogoutButton = () => signOut();

	return (
		<>
			<div className="min-h-screen bg-gray-800">
				<div className="flex justify-center items-center h-screen">
					<div className="flex flex-col justify-between items-center  bg-zinc-900 p-4 rounded-lg shadow-md">
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

export default function LoginToTwitter() {
	const { data: session } = useSession();

	if (session) {
		return <LogOutModal sessionData={session.user as SessionData} />;
	}

	return <LogInModal />;
}
