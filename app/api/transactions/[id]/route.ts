import { connectDB } from "@/lib/mongodb";
import Transaction from "@/models/Transactions";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(__: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();
        const { id } = await params;
        if (!id) {
            return NextResponse.json({ error: "Transaction ID is required" }, { status: 400 });
        }

        const deletedTransaction = await Transaction.findByIdAndDelete(id);

        if (!deletedTransaction) {
            return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Transaction deleted successfully" }, { status: 200 });
    } catch (error: any) {
        console.error("Error occured: ", error.message)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB()
        const {id} = await params;

        if (!id) {
            return NextResponse.json({ error: "Transaction ID is required" }, { status: 400 });
        }
        const body = await req.json()
        const updatedTransaction = await Transaction.findByIdAndUpdate(id, body, { new: true })

        if (!updatedTransaction) {
            return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
        }

        return NextResponse.json(updatedTransaction, { status: 200 });

    } catch (error: any) {
        console.error("Error occured: ", error.message)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}