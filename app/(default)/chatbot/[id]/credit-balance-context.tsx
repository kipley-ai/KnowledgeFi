import { useCreditBalance } from "@/hooks/api/credit";
import { ReactSetter } from "@/lib/aliases";
import { createContext, useContext, useEffect, useState } from "react";

interface CreditBalanceContextProps {
    creditBalance: number;
    setCreditBalance: ReactSetter<number>;
}

const CreditBalanceContext = createContext<CreditBalanceContextProps | undefined>(undefined);

export const CreditBalanceProvider = ({ children }: { children: React.ReactNode }) => {
    const [creditBalance, setCreditBalance] = useState(0);
    
    const { data: creditBalanceData } = useCreditBalance();

    useEffect(() => {
        setCreditBalance(creditBalanceData?.data.data.credit_balance)
    }, [creditBalanceData])
    
    return (
        <CreditBalanceContext.Provider value={{ creditBalance, setCreditBalance }}>
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