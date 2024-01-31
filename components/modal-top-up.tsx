"use client";

import ModalBlank from "@/components/modal-blank-2";
import { useState } from "react";

interface Form {
	amount?: number;
}

export default function ModalTopUp({
	isOpen,
	setIsOpen,
}: {
	isOpen: boolean;
	setIsOpen: any;
}) {
	const [form, setForm] = useState<Form>({ amount: 0 });

	const handleFormChange = (name: string, value: any) => {
		setForm({
		  ...form,
		  [name]: value,
		});
	}

	return (
		<ModalBlank isOpen={isOpen} setIsOpen={setIsOpen}>
			<div className="flex flex-col justify-between items-center p-4 rounded-lg shadow-md">
				<div className="self-stretch p-5 justify-between items-center inline-flex">
					<div className="w-80 text-gray-50 text-[32px] font-black leading-10">
						<span>Top up credits</span>
					</div>
					<button
                        className="text-[#FCFCFD] dark:text-slate-500 hover:text-slate-500 dark:hover:text-slate-400"
						onClick={(e) => {
							e.stopPropagation();
							setIsOpen(false);
						}}
					>
						<div className="sr-only">Close</div>
						<svg
							width="40"
							height="40"
							viewBox="0 0 40 40"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<rect
								x="1"
								y="1"
								width="38"
								height="38"
								rx="19"
								stroke="#353945"
								stroke-width="2"
							/>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
								fill="#FCFCFD"
							/>
						</svg>
					</button>
				</div>
				<div className="self-stretch p-5 pt-0 justify-between items-center inline-flex">
					<div className="w-80 text-gray-50 text-base font-semibold leading-10">
						<span>Get Credits by Paying </span><span className="text-aqua-700">$KIP </span><span>token</span>
					</div>
				</div>
				<div className="self-stretch p-5 justify-between items-center inline-flex">
					<div className="text-gray-50 text-lg font-bold leading-10 w-full">
						<input
							className="rounded-xl bg-transparent w-full text-[#DDD] placeholder-text-[#7C878E] text-sm placeholder-[#777E90] leading-6 px-4 py-3"
							type="number"
							name="amount"
							placeholder="Enter your credit amount here"
							onChange={(e) => {
								handleFormChange("amount", e.target.value);
							}}
							value={form?.amount}
						/>
					</div>
				</div>
				<div className="self-stretch px-5 py-0 justify-between items-center inline-flex">
					<div className="grid grid-cols-3 gap-3 text-white font-bold w-full">
						<button className={`flex flex-col justify-center items-center border-2 rounded-3xl h-12 ${form?.amount == 50 ? 'border-aqua-700' : 'border-[#50575F]'}`} 
							onClick={() => { handleFormChange("amount", 50) }}>
							<span className="text-sm font-bold leading-6">50</span>
						</button>
						<button className={`flex flex-col justify-center items-center border-2 rounded-3xl h-12 ${form?.amount == 100 ? 'border-aqua-700' : 'border-[#50575F]'}`} 
							onClick={() => { handleFormChange("amount", 100) }}>
							<span className="text-sm font-bold leading-6">100</span>
						</button>
						<button className={`flex flex-col justify-center items-center border-2 rounded-3xl h-12 ${form?.amount == 300 ? 'border-aqua-700' : 'border-[#50575F]'}`} 
							onClick={() => { handleFormChange("amount", 300) }}>
							<span className="text-sm font-bold leading-6">300</span>
						</button>
						<button className={`flex flex-col justify-center items-center border-2 rounded-3xl h-12 ${form?.amount == 500 ? 'border-aqua-700' : 'border-[#50575F]'}`} 
							onClick={() => { handleFormChange("amount", 500) }}>
							<span className="text-sm font-bold leading-6">500</span>
						</button>
						<button className={`flex flex-col justify-center items-center border-2 rounded-3xl h-12 ${form?.amount == 750 ? 'border-aqua-700' : 'border-[#50575F]'}`} 
							onClick={() => { handleFormChange("amount", 750) }}>
							<span className="text-sm font-bold leading-6">750</span>
						</button>
						<button className={`flex flex-col justify-center items-center border-2 rounded-3xl h-12 ${form?.amount == 1000 ? 'border-aqua-700' : 'border-[#50575F]'}`} 
							onClick={() => { handleFormChange("amount", 1000) }}>
							<span className="text-sm font-bold leading-6">1000</span>
						</button>						
					</div>
				</div>
				<div className="self-stretch p-5 pt-2 justify-between items-center inline-flex ">
					<div className="w-80 text-gray-50 text-sm font-semibold leading-10">
						<span>You are paying </span><span className="text-aqua-700">{form?.amount} $KIP</span>
					</div>
				</div>
				<div className="self-stretch p-5 justify-between items-center inline-flex">
					<div className="grid grid-cols-1 text-white font-bold w-full">
						<button
							className="flex flex-row gap-2 items-center justify-center bg-aqua-700 rounded-3xl p-2 px-5"
							type="submit"
							onClick={() => {
							}}
						>
							<h5 className="text-black font-semibold">Continue</h5>
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
			</div>
		</ModalBlank>
	);
}
