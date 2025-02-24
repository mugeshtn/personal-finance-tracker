import { connectDB } from "@/lib/mongodb";
import BudgetModel from "@/models/Budget";
import { budgetSchema } from "@/utils/types";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();

        const budgetExpenses = await BudgetModel.aggregate([
            { $group: { _id: "$category", total: { $sum: "$amount" }, id: {$first: "$_id"
            } } },
            { $project: { _id: 0, category: "$_id", total: 1, id: 1} }
        ])
        return NextResponse.json(budgetExpenses,
            { status: 200 });

    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();

        const body = await req.json();
        console.log(body)
        const parsedData = budgetSchema.safeParse(body);

        if (!parsedData.success) {
            return NextResponse.json({ error: parsedData.error.errors }, { status: 400 });
        }

        const newTransaction = await BudgetModel.create(parsedData.data);
        return NextResponse.json(newTransaction, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}