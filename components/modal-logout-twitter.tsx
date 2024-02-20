"use client";

import ModalBlank from "@/components/modal-blank-2";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
// import fbLogo from '@/public/images/icon-facebook.svg'
import twtLogo from "@/public/images/logo-twitter.svg";
import type { Session } from "next-auth";
// import emailLogo from '@/public/images/icon-linkedin.svg'

export default function ModalLogoutTwitter({
	isOpen,
	setIsOpen,
	sessionData,
}: {
	isOpen: boolean;
	setIsOpen: any;
	sessionData: Session;
}) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [urlShare, setUrlShare] = useState("");
	const pathname = usePathname();

	const handleLogoutButton = () => {
		signOut()
	};

	useEffect(() => {
		// console.log(window.location.href);
		// urlRef.current = window.location.href;
		setUrlShare(window.location.href);
	}, []);

	return (
		<ModalBlank isOpen={isOpen} setIsOpen={setIsOpen}>
			<div className="min-h-screen bg-gray-800">
				<div className="flex justify-center items-center h-screen">
					<div className="flex flex-col justify-between items-center bg-zinc-900 p-4 rounded-lg shadow-md">
						<div className="self-stretch p-5 justify-between items-center inline-flex">
							<div className="w-80 text-gray-50 text-3xl font-bold leading-10">
								You are already logged in as {sessionData.user?.email || ""}.
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
										src={twtLogo}
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
		</ModalBlank>
	);
}
