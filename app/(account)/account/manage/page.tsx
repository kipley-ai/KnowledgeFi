"use client";

import Dashboard from "./tabs/dashboard";
import { useManageAccountContext } from "./account-context";
import CreatorOverview from "./tabs/creator-overview";
import CreditUsage from "./tabs/credit-usage";
import DepositHistory from "./tabs/deposit-history";
import WithdrawHistory from "./tabs/withdraw-history";
import EarningReport from "./tabs/earning-report";
import { useSearchParams } from "next/navigation";

export default function AccountSettings() {
	const searchParams = useSearchParams();
	const currentTab = searchParams.get("tab") || "dashboard";

	switch (currentTab) {
		case "dashboard":
			return <Dashboard />;
		case "creator":
			return <CreatorOverview />;
		case "earning":
			return <EarningReport />;
		case "withdraw":
			return <WithdrawHistory />;
		case "deposit":
			return <DepositHistory />;
		case "credit":
			return <CreditUsage />;
	}
}
