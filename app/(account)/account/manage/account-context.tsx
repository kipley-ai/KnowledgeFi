"use client";

import { createContext, useContext, useState } from "react";
import { ReactSetter } from "@/lib/aliases";

export type TabIdentifier = "db" | "co" | "wh" | "dh" | "cu";

interface ManageAccountContextProps {
	currentTab: TabIdentifier;
	setCurrentTab: ReactSetter<TabIdentifier>;
}

const ManageAccountContext = createContext<
	ManageAccountContextProps | undefined
>(undefined);

export const ManageAccountProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [currentTab, setCurrentTab] = useState<TabIdentifier>("db");

	return (
		<ManageAccountContext.Provider
			value={{
				currentTab,
				setCurrentTab,
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
