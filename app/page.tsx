"use client";
import { redirect, useSearchParams } from "next/navigation";
import { useAccount } from "wagmi";

export default function Home() {
	const { isConnected } = useAccount();
	const searchParams = useSearchParams();

	const nextUrl = searchParams.get("next") || "/dashboard";
	console.log(isConnected)

	// Alfath: `isConnected` will always return false for me even with metamask ready
	if (isConnected) {
		console.log(nextUrl);
		redirect(nextUrl);
	} else {
		return <></>;
	}
}
