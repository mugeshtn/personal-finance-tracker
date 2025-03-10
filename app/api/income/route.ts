import { connectDB } from "@/lib/mongodb";
import IncomeModel from "@/models/Income";
import { incomeSchema } from "@/utils/types";
import { NextResponse } from "next/server";

export async function GET() {
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


export async function PUT(req: Request) {
    try {
        await connectDB();
    const body = await req.json();
    let amountToReduce = Number(body)

    if (isNaN(amountToReduce) || amountToReduce <= 0) {
        return NextResponse.json({ message: "Invalid amount" }, { status: 400 });
    }

    const incomes = await IncomeModel.find().sort({ amount: -1 })

    if (!incomes.length) {
        return NextResponse.json({ message: "No incomes available" }, { status: 404 });
    }

    for (const income of incomes) {
        if (amountToReduce <= 0) break;

        if (income.amount <= amountToReduce) {
            amountToReduce -= income.amount;
            await IncomeModel.findByIdAndDelete(income._id);
        } else {
            income.amount -= amountToReduce;
            amountToReduce = 0;
            await income.save()
        }
    }

    return NextResponse.json("Income updated successfully", { status: 201 });
    } catch (error: any) {
        console.error("Income API Error", error.message)
        return NextResponse.json({ message: "Income API error" })
    }
}