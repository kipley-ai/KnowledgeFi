import { useCreditBalance } from "@/hooks/api/credit";
import { ReactSetter } from "@/lib/aliases";
import { createContext, useContext, useEffect, useState } from "react";

interface CreditBalanceContextProps {
    creditBalance: number;
    setCreditBalance: ReactSetter<number>;
    setRefetch: ReactSetter<boolean>;
}

const CreditBalanceContext = createContext<CreditBalanceContextProps | undefined>(undefined);

export const CreditBalanceProvider = ({ children }: { children: React.ReactNode }) => {
    const [creditBalance, setCreditBalance] = useState(0);
    const [refetch, setRefetch] = useState(false);
    
    const creditBalanceApi = useCreditBalance();

    useEffect(() => {
        if (creditBalanceApi.isFetching) return;
        if (creditBalanceApi.isError) return;
        if (!creditBalanceApi.isSuccess) return;

        setCreditBalance(creditBalanceApi.data.data.data.credit_balance)
    }, [creditBalanceApi.data])

    useEffect(() => {
        if (refetch) {
            creditBalanceApi.refetch();
            setRefetch(false);
        }
    }, [refetch])
    
    return (
        <CreditBalanceContext.Provider value={{ creditBalance, setCreditBalance, setRefetch }}>
            {children}
        </CreditBalanceContext.Provider>
    );
}

export const useCreditBalanceContext = () => {
    const context = useContext(CreditBalanceContext);
    if (!context) {
        throw new Error("useCreditBalanceContext must be used within a CreditBalanceProvider");
    }
    return context;
}