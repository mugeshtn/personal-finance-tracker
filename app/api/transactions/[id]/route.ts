import { connectDB } from "@/lib/mongodb";
import Transaction from "@/models/Transactions";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(__: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const { id } = params; 
        if (!id) {  
            return NextResponse.json({ error: "Transaction ID is required" }, { status: 400 });
        }

        const deletedTransaction = await Transaction.findByIdAndDelete(id);

        if (!deletedTransaction) {
            return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Transaction deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting transaction:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}