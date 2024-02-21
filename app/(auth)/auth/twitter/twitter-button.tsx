"use client";
import LoginModal from "@/components/modal-login-twitter";
import LogoutModal from "@/components/modal-logout-twitter";
import { useAppProvider } from "@/providers/app-provider";
import type { Session } from "next-auth";

export default function TwitterButton({
	sessionData,
}: {
	sessionData: Session | null;
}) {
	const { modalLogin, setModalLogin } = useAppProvider();

	return (
		<>
			<h2 className="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-6">
				Login/Logout Twitter
			</h2>
			<div className="flex flex-wrap items-center -m-1.5">
				{/* Basic Modal */}
				<div className="m-1.5">
					{/* Start */}
					<button
						className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
						onClick={() => {
							setModalLogin(true);
						}}
					>
						Basic Modal
					</button>
					{sessionData ? (
						<LogoutModal
							isOpen={modalLogin}
							setIsOpen={setModalLogin}
							sessionData={sessionData}
						/>
					) : (
						<LoginModal isOpen={modalLogin} setIsOpen={setModalLogin} />
					)}
				</div>
			</div>
		</>
	);
}
