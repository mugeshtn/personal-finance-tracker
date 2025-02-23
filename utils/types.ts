import { z } from "zod";

export const transactionSchema = z.object({
    date: z.string().min(1, "Date is required"),
    category: z.enum(["Food & Drinks", "Transport", "Entertainment", "Bills", "Shopping", "Education", "Health & fitness" , "Investment", "others"]),
    amount: z.string().min(0.01, "Amount is greater than zero"),
    paymentMethod: z.enum(["Cash", "Account"], { message: "Select a valid option" }),
    notes: z.string().optional()
});

export type TransactionDatas = z.infer<typeof transactionSchema>[];
export type MongoTransactionDatas = (z.infer<typeof transactionSchema> & {_id: string});

export type TCategories = "Food & Drinks"| "Transport"| "Entertainment"| "Bills"| "Shopping"| "Education"| "Health & fitness" | "Investment"| "others"

export type TPayment = "All" | "Cash" | "Account"