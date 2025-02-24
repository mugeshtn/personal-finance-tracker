import { connectDB } from "@/lib/mongodb";
import IncomeModel from "@/models/Income";
import { incomeSchema } from "@/utils/types";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        await connectDB();
        const totalIncome = await IncomeModel.aggregate([
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ])
        return NextResponse.json({ totalIncome: totalIncome[0]?.total || 0 }, { status: 200 });
    } catch (error: any) {
        console.error("Income Aggregation Error:", error.message);
        return NextResponse.json({ message: "Failed to aggregate income" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        const parsedData = incomeSchema.safeParse(body)
        if (!parsedData.success) {
            return NextResponse.json({ error: parsedData.error.errors }, { status: 400 });
        }
        const newTransaction = await IncomeModel.create(parsedData.data)
        return NextResponse.json(newTransaction, { status: 201 });
    } catch (error: any) {
        console.error("Income API Error", error.message)
        return NextResponse.json({ message: "Income API error" })
    }
}