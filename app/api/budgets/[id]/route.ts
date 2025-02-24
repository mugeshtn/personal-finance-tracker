import { connectDB } from "@/lib/mongodb";
import BudgetModel from "@/models/Budget";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();
        const id = (await params).id;
        if (!id) {
            return NextResponse.json({ error: "Budget ID is required" }, { status: 400 });
        }
        if (!isValidObjectId(id)) {
            return NextResponse.json({ error: "Invalid Budget ID" }, { status: 400 });
        }
        const deletedBudget = await BudgetModel.findByIdAndDelete(id);

        if (!deletedBudget) {
            return NextResponse.json({ error: "Budget not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Budget deleted successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB()
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ error: "Transaction ID is required" }, { status: 400 });
        }
        const body = await req.json()
        const updatedTransaction = await BudgetModel.findByIdAndUpdate(id, body, { new: true })

        if (!updatedTransaction) {
            return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
        }

        return NextResponse.json(updatedTransaction, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

