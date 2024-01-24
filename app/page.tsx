"use client";
import { redirect, useSearchParams } from "next/navigation";
import { useAccount } from "wagmi";
import Dashboard from './dashboard'
import LayoutDashboard from './layout-dashboard'
export default function Home() {
	const { isConnected } = useAccount();
	const searchParams = useSearchParams();

	const nextUrl = searchParams.get("next") || "/dashboard";
	console.log(isConnected)

	// Alfath: `isConnected` will always return false for me even with metamask ready
	if (isConnected) {
		
		redirect(nextUrl);
	} else {
		return <>
		<LayoutDashboard>
			<Dashboard/>
		</LayoutDashboard>
		</>;
	}
}
