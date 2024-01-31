"use client";

import {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useState,
} from "react";

interface ContextProps {
	sidebarOpen: boolean;
	setSidebarOpen: Dispatch<SetStateAction<boolean>>;
	headerTitle: string;
	setHeaderTitle: Dispatch<SetStateAction<string>>;
	modalLogin: boolean;
	setModalLogin: Dispatch<SetStateAction<boolean>>;
	modalTopUp: boolean;
	setModalTopUp: Dispatch<SetStateAction<boolean>>;
	toast: any;
	setToast: Dispatch<SetStateAction<any>>;
}

const AppContext = createContext<ContextProps>({
	sidebarOpen: false,
	setSidebarOpen: (): boolean => false,
	headerTitle: "",
	setHeaderTitle: (): string => "",
	modalLogin: false,
	setModalLogin: (): boolean => false,
	modalTopUp: false,
	setModalTopUp: (): boolean => false,
	toast: {},
	setToast: () => {},
});

export default function AppProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
	const [headerTitle, setHeaderTitle] = useState("");
	const [modalLogin, setModalLogin] = useState(false);
	const [modalTopUp, setModalTopUp] = useState(false);
	const [toast, setToast] = useState(false); 

	return (
		<AppContext.Provider
			value={{
				sidebarOpen,
				setSidebarOpen,
				headerTitle,
				setHeaderTitle,
				modalLogin,
				setModalLogin,
				modalTopUp,
				setModalTopUp,
				toast, 
				setToast,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export const useAppProvider = () => useContext(AppContext);
