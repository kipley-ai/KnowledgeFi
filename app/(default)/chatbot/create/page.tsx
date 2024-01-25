"use client";
import { useAccount } from "wagmi";
import React, { useState, useEffect } from "react";
import Step1 from "./step-1";
import Step2 from "./step-2";
import { useSession } from "next-auth/react";
import { useAppProvider } from "@/app/app-provider";
import { useRouter } from "next/navigation";
import ChatBotForm from "./create-chatbot-form";
import NFTForm from "./create-nft-form";
import { createKB } from "@/app/api/kb/helper";
import Toast from "@/components/toast";

type PossibleOptions = "files" | "twitter" | "notion" | "";

export interface UIFile {
	filename: string;
	size: number;
	status: "uploading" | "failed" | "success";
	bucketPath: string;
	link: string;
	aborter: AbortController | null;
}

export function Main() {
	return (
		<div className="flex flex-col sm:px-6 lg:px-8 py-8 bg-[#292D32]">
			
		</div>
	)
}

export function DataSource() {
	const { setHeaderTitle } = useAppProvider();
	const title = "Data Sources";
	const [kbId, setKbId] = useState("");
	const [showToast, setShowToast] = useState(false);

    const { address: walletAddress } = useAccount();

	useEffect(() => {
		setHeaderTitle(title);
		document.title = title;
		return () => setHeaderTitle("Default Title");
	}, []);

	const [step, setStep] = useState(1);
	const [selectedButton, setSelectedButton] = useState<PossibleOptions>("");
	const [localFiles, setLocalFiles] = useState<UIFile[]>([]);

	// For future, can remove if unneeded
	const [showLoadingModal, setShowLoadingModal] = useState(false);
	const { status: twitterStatus } = useSession();
    const { modalLogin: showTwitterLogin, setModalLogin: setShowTwitterLogin } =
		useAppProvider();

	const handleContinue = async (e: React.MouseEvent<HTMLButtonElement>) => {
		if (localFiles) {
			const stillHasLoading =
				localFiles.filter((localFile) => {
					// Keep the still loading files
					return localFile.status === "uploading";
				}).length !== 0;

			setShowLoadingModal(stillHasLoading);
			if (stillHasLoading) {
				e.preventDefault();
				return;
			}
		}

		// TODO: Do something with localFiles
		if(localFiles){
			const createKbParams = localFiles.map((file: UIFile) => {
				return {
					"name": file.filename,
					"type": "file",
					"file": file.bucketPath,
				}
			});
			const response = await createKB("files", createKbParams, walletAddress || "");
			if (response.status === "success") {
				setShowToast(true)
			} 
		}
	};

	return (
		<div className="flex flex-col sm:px-6 lg:px-8 py-8 bg-[#292D32]">
			<Toast children={"KB creation successful"} open={showToast} setOpen={setShowToast} className="mx-auto" />
			<div className="mx-56">
				<h1 className="text-2xl font-semibold text-white">Data Sources</h1>
				<h5 className="text-md text-[#7C878E]">
					Give some general information about your NFT.
				</h5>
				<hr className="my-4 border border-gray-600" />
			</div>
			{step === 1? (
				<Step1
					selectedButton={selectedButton}
					setSelectedButton={setSelectedButton}
				/>
			) : step === 2 ? (
				<Step2
					files={localFiles}
					setFiles={setLocalFiles}
					selectedButton={selectedButton}
				/>
			) : (
				<NFTForm/>
			)}
			<div className="flex justify-between mx-56">
				<button
					className="flex flex-row items-center justify-between  rounded-3xl p-2 px-5 mt-8 border-2 border-[#50575F]"
					type="submit"
					onClick={() => {
						if (step > 0) setStep(step - 1);
					}}
				>
					<h5 className="text-sm text-white font-semibold">Back</h5>
				</button>
				<button
					className="flex flex-row items-center justify-between bg-[#01F7FF] rounded-3xl w-36 p-2 px-5 mt-8"
					type="submit"
					onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
						if (selectedButton == "twitter") {
							if (twitterStatus != "authenticated") {
								setShowTwitterLogin(true);
							} else {
								setStep(3)
							}
						}
						else {
							if (step < 2) setStep(step + 1);
							if (step == 2) handleContinue(e);
						}
					}}
				>
					<h5 className="text-sm text-black font-semibold">Continue</h5>
					<svg
						width="20"
						height="10"
						viewBox="0 0 20 10"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M17.98 5.7901C18.8936 5.7901 19.6343 6.53075 19.6343 7.44439V7.44439C19.6343 8.35803 18.8936 9.09868 17.98 9.09868L1.65435 9.09868C0.74071 9.09868 5.90253e-05 8.35803 5.90618e-05 7.44439V7.44439C5.90983e-05 6.53075 0.740711 5.7901 1.65435 5.7901L17.98 5.7901Z"
							fill="#151515"
						/>
						<path
							d="M18.932 5.9907C19.5219 6.63674 19.5219 7.68418 18.932 8.33022C18.3422 8.97626 17.3859 8.97626 16.7961 8.33022L12.3947 3.50927C11.8049 2.86322 11.8049 1.81578 12.3947 1.16974C12.9845 0.523702 13.9408 0.523702 14.5306 1.16974L18.932 5.9907Z"
							fill="#151515"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}

export default DataSource;