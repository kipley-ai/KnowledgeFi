"use client";
import { redirect, useSearchParams } from "next/navigation";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

import Dashboard from "./dashboard";
import LayoutDashboard from "./layout-dashboard";
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

	if (isConnected) {
		redirect(nextUrl);
	} else {
		return (
			<>
				<LayoutDashboard>
					<Dashboard />
				</LayoutDashboard>
			</>
		);
	}
}
