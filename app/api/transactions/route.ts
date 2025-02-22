import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Transaction from "@/models/Transactions";
import { transactionSchema } from "@/utils/types";

export async function GET() {
    try {
        await connectDB();
        const transactions = await Transaction.find({});
        return NextResponse.json(transactions, { status: 200 });
    } catch (error) {
        console.error("Transaction API Error:", error);
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
    } catch (error) {
        console.error("Transaction API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


