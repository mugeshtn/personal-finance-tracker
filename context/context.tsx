"use client"

import { createContext, useContext, ReactNode, useState, useEffect, useMemo } from "react";
import { IBudgetCategory, MongoTransactionDatas, TCategories } from "../utils/types";
import axios from "axios";
import { showToast } from "../utils/showToast";

interface TransactionsContextType {
    transactions: MongoTransactionDatas[];
    setTransactions: React.Dispatch<React.SetStateAction<MongoTransactionDatas[]>>;
    getDatas: () => Promise<void>,
    getIncome: () => Promise<void>,
    getBudget: () => Promise<void>,
    totalExpense: number,
    income: number,
    budget: { total: number, category: TCategories, id: string }[],
    budgetAmt: number,
    balance: number,
    category: { total: number, category: TCategories }[],
    filteredBudgets: IBudgetCategory[]
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
    const [category, setCategory] = useState<{ total: number, category: TCategories }[]>([])
    const [budget, setBudget] = useState<{ total: number, category: TCategories, id: string }[]>([])

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
    const getIncome = async () => {
        try {
            const response = await axios.get("/api/income")
            if (response.status !== 200) throw new Error("Income not found")
            setIncome(response.data.totalIncome)
        } catch (error: any) {
            showToast(error.message || "Error in fetching budget expenses !", "success")
        }
    }

    const getBudget = async () => {
        try {
            const response = await axios.get("/api/budgets");
            if (response.status !== 200) throw new Error("Budget not found")
            const data = response.data;
            setBudget(data)
        } catch (err: any) {
            showToast(err.message || "Error in fetching income values !", "success")
        }
    }
    const filteredBudgets = budget.map(b => {
        const matchingCategory = category.find(c => c.category === b.category);
        if (matchingCategory) {
            return {
                ...b,
                category: matchingCategory
            };
        }
        return {
            ...b,
            category: {
                total: 0,
                category: b.category
            }
        };
    });

    useEffect(() => {
        getDatas()
        getIncome()
        getBudget()
    }, [])
    const totalExpense = useMemo(() => {
        return transactions?.reduce((sum, tx) => sum + Number(tx.amount), 0);
    }, [transactions]);
    const budgetAmt = useMemo(() => {
        return budget?.reduce((sum, val) => sum + Number(val.total), 0)
    }, [budget])
    const balance = income - totalExpense

    return (
        <TransactionContext.Provider value={{ transactions, setTransactions, getDatas, totalExpense, income, balance, getIncome, budgetAmt, budget, category, getBudget, filteredBudgets }}>
            {children}
        </TransactionContext.Provider>
    )
}