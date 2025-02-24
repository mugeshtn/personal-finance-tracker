"use client"

import { createContext, useContext, ReactNode, useState, useEffect, useMemo } from "react";
import { MongoTransactionDatas, TCategories } from "../utils/types";
import axios from "axios";
import { showToast } from "../utils/showToast";

interface TransactionsContextType {
    transactions: MongoTransactionDatas[];
    setTransactions: React.Dispatch<React.SetStateAction<MongoTransactionDatas[]>>;
    getDatas: () => Promise<void>,
    getIncome: () => Promise<void>,
    totalExpense: number,
    income: number,
    balance: number,
    category: {total: number, category: TCategories}[]
}

const TransactionContext = createContext<TransactionsContextType | undefined>(undefined)

export const useTransactions = () => {
    const context = useContext(TransactionContext)
    if (!context) throw new Error("useTransactions must be used within a TransactionsProvider")
    return context;
}


export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
    const [transactions, setTransactions] = useState<MongoTransactionDatas[]>([])
    const [income, setIncome] = useState(0)
    const [category, setCategory] = useState([])

    const getDatas = async () => {
        try {
            const response = await axios.get("/api/transactions");
            if (response.status !== 200) throw new Error("List not found")
            setTransactions(response.data.transactions)
        setCategory(response.data.categoryExpenses)
        } catch (error: any) {
            showToast(error.message || "List not found", "error")
        }
    }
    const getIncome = async() => {
        try {
            const response = await axios.get("/api/income")
            if (response.status !== 200) throw new Error("List not found")
                setIncome(response.data.totalIncome)
        } catch (error: any) {
            showToast(error.message || "Error in fetching income values !", "success")
        }
    }
    useEffect(() => {
        getDatas()
        getIncome()
    }, [income])
    console.log(category)
    const totalExpense = useMemo(() => {
        return transactions?.reduce((sum, tx) => sum + Number(tx.amount), 0);
    }, [transactions]); 

    const balance = income - totalExpense

    return (
        <TransactionContext.Provider value={{ transactions, setTransactions, getDatas, totalExpense, income, balance, getIncome, category}}>
            {children}
        </TransactionContext.Provider>
    )
}