"use client"

import { createContext, useContext, ReactNode, useState, useEffect, useMemo } from "react";
import { MongoTransactionDatas } from "../utils/types";
import axios from "axios";
import { showToast } from "../utils/showToast";

interface TransactionsContextType {
    transactions: MongoTransactionDatas[];
    setTransactions: React.Dispatch<React.SetStateAction<MongoTransactionDatas[]>>;
    getDatas: () => Promise<void>,
    totalAmount: number
}

const TransactionContext = createContext<TransactionsContextType | undefined>(undefined)

export const useTransactions = () => {
    const context = useContext(TransactionContext)
    if (!context) throw new Error("useTransactions must be used within a TransactionsProvider")
    return context;
}


export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
    const [transactions, setTransactions] = useState<MongoTransactionDatas[]>([])
    const getDatas = async () => {
        try {
            const response = await axios.get("/api/transactions");
            if (response.status !== 200) throw new Error("List not found")
            setTransactions(response.data)
        } catch (error: any) {
            showToast(error.message || "List not found", "error")
        }
    }
    useEffect(() => {
        getDatas()
    }, [])

    const totalAmount = useMemo(() => {
        return transactions?.reduce((sum, tx) => sum + Number(tx.amount), 0);
    }, [transactions]);


    return (
        <TransactionContext.Provider value={{ transactions, setTransactions, getDatas, totalAmount }}>
            {children}
        </TransactionContext.Provider>
    )
}