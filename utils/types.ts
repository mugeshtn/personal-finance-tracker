import { z } from "zod";

export const transactionSchema = z.object({
    date: z.string().min(1, "Date is required"),
    category: z.enum(["Food & Drinks", "Transport", "Entertainment", "Bills", "Shopping", "Education", "Health & fitness" , "Investment", "others"]),
    amount: z.string().min(1, "Amount is greater than zero"),
    paymentMethod: z.enum(["Cash", "Account"], { message: "Select a valid option" }),
    notes: z.string().optional()
});
export type TransactionDatas = z.infer<typeof transactionSchema>[];
export type MongoTransactionDatas = (z.infer<typeof transactionSchema> & {_id: string});

//----------------------------------------------------

export const incomeSchema = z.object({
    source: z.enum(["Salary", "Business", "Others"]),
    amount: z.string(),
    date: z.string()
})

export type TIncomeDatas = z.infer<typeof incomeSchema>
export type MongoIncomeDatas = (z.infer<typeof incomeSchema> & {_id: string})

//-----------------------------------------------------

export const budgetSchema = z.object({
    category: z.enum(["Food & Drinks", "Transport", "Entertainment", "Bills", "Shopping", "Education", "Health & fitness" , "Investment", "others"]),
    amount: z.string(),
    date: z.string()
})

export type TBudgetDatas = z.infer<typeof budgetSchema>
export type MongoBudgetDatas = (z.infer<typeof budgetSchema> & {_id: string})

//-----------------------------------------------------

export type TCategories = "Food & Drinks"| "Transport"| "Entertainment"| "Bills"| "Shopping"| "Education"| "Health & fitness" | "Investment"| "others"

export type TPayment = "All" | "Cash" | "Account"

export type TCardFeatures = {
    name: string,
    amount: string,
    color: string
}

export type TSource = "Salary" | "Business" | "Others";