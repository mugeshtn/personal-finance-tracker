import { TCardFeatures, TCategories, TPayment, TSource } from "./types";

export const Categories: TCategories[] = ["Food & Drinks", "Transport", "Entertainment", "Bills", "Shopping", "Education", "Health & fitness", "Investment", "others"];

export const incomeSource: TSource[] = ["Salary", "Business", "Others"]

export const paymentItems: TPayment[] = ["All", "Cash", "Account"]

export const dashCardFeatures: TCardFeatures[] = [{
    name: "Total Income",
    color: "text-blue-600",
    amount: "---"
}, {
    name: "Total Expenses",
    color: "text-red-600",
    amount: "---"
},{
    name: "Balance",
    color: "text-green-600",
    amount: "---"
}
]

export const budgetCardFeatures: TCardFeatures[] = [{
    name: "Total Budget",
    color: "text-blue-600",
    amount: "---"
}, {
    name: "Savings",
    color: "text-green-600",
    amount: "___"
},{
    name: "Actual Spend",
    color: "text-red-600",
    amount: "___"
}]
