"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { ReactSetter } from "@/lib/aliases";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export type TabIdentifier =
	| "dashboard"
	| "creator"
	| "earning"
	| "withdraw"
	| "deposit"
	| "credit";

interface ManageAccountContextProps {
	null_: null;
}

const ManageAccountContext = createContext<
	ManageAccountContextProps | undefined
>(undefined);

export const ManageAccountProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const null_ = null;

	return (
		<ManageAccountContext.Provider
			value={{
				null_,
			}}
		>
			{children}
		</ManageAccountContext.Provider>
	);
};

export const useManageAccountContext = () => {
	const context = useContext(ManageAccountContext);
	if (!context) {
		throw new Error(
			"useManageAccountContext must be used within a ManageAccountContext"
		);
	}
	return context;
};
