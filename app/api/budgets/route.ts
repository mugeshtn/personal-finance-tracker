import { connectDB } from "@/lib/mongodb";
import BudgetModel from "@/models/Budget";
import { budgetSchema } from "@/utils/types";
import { NextResponse } from "next/server";

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

    } catch (error) {
        console.error("Budget API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}