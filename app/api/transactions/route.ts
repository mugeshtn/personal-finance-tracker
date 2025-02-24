import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Transaction from "@/models/Transactions";
import { transactionSchema } from "@/utils/types";

export async function GET() {
    try {
        await connectDB();
        const transactions = await Transaction.find({});
        const categoryExpenses = await Transaction.aggregate([
            { $group: { _id: "$category", total: { $sum: "$amount" } } },
            { $project: { _id: 1, category: "$_id", total: 1 } }
        ])
        return NextResponse.json({ transactions, categoryExpenses: categoryExpenses.length > 0 ? categoryExpenses : [] }, { status: 200 });
    } catch (error: any) {
        console.error("Transaction API Error:", error.message);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        const parsedData = transactionSchema.safeParse(body);

        if (!parsedData.success) {
            return NextResponse.json({ error: parsedData.error.errors }, { status: 400 });
        }

        const newTransaction = await Transaction.create(parsedData.data);
        return NextResponse.json(newTransaction, { status: 201 });
    } catch (error: any) {
        console.error("Transaction API Error:", error.message);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


