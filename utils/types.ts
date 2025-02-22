import { z } from "zod";

export const transactionSchema = z.object({
    date: z.string().min(1, "Date is required"),
    paymentMethod: z.enum(["Cash", "Account"], { message: "Select a valid option" }),
    amount: z.string().min(0.01, "Amount is greater than zero"),
    notes: z.string().optional(),
    category: z.string().optional()
});

export type TransactionDatas = z.infer<typeof transactionSchema>[];
export type MongoTransactionDatas = (z.infer<typeof transactionSchema> & {_id: string})[];