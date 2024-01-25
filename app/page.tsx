"use client";
import { redirect, useSearchParams } from "next/navigation";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

export default function Home() {
	const { isConnected } = useAccount();
	useEffect(() => {
		setIsConnected_(isConnected);
	}, [isConnected]);

	// Hydrate safe
	const [isConnected_, setIsConnected_] = useState<boolean>(false);

	const searchParams = useSearchParams();

	const nextUrl = searchParams.get("next") || "/dashboard";
	console.log(isConnected);

	// Alfath: `isConnected` will always return false for me even with metamask ready
	// if (isConnected_) {
	// 	console.log(nextUrl);
		redirect(nextUrl);
	// } else {
	// 	return <></>;
	// }
}
