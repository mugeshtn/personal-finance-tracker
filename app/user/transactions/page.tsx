"use client"
import Addform from "@/components/pages/transaction/AddForm";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { showToast } from "@/utils/showToast";
import { MongoTransactionDatas } from "@/utils/types";
import axios from "axios";
import { Filter, FilterIcon, Plus, Trash2Icon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    const formattedTime = date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        timeZone: "Asia/Kolkata",
        minute: "2-digit",
        second: "2-digit",
    });

    return [formattedDate, formattedTime];
};

const Transactions = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [refresh, setRefresh] = useState(false)

    const [transactions, setTransactions] = useState<MongoTransactionDatas>([])

    useEffect(() => {
        const getDatas = async () => {
            try {
                const response = await axios.get("/api/transactions");
                if (response.status !== 200) throw new Error("List not found")
                const transactions = response.data
                setTransactions(transactions)
            } catch (error: any) {
                showToast(error.message || "List not found", "error")
            }
        }
        getDatas()
    }, [refresh])

    const totalAmount = useMemo(() => {
        return transactions.reduce((sum, tx) => sum + Number(tx.amount), 0);
    }, [transactions]);

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/api/transactions/${id}`)
            showToast("Deletion successful", "success")
            setRefresh(prev => !prev)
        } catch (error: any) {
            showToast(error.message || "Deletion failed", "error")
        }
    }

    return (
        <div className="mt-20 flex w-full justify-center min-w-[80vw] text-black relative">
            <div className=" bg-gray-100 rounded px-14 min-w-[80vw]">
                <div className="flex justify-between py-6">
                    <h1 className="hidden sm:flex text-xl font-bold">Transaction History</h1>
                    <h1 className="flex sm:hidden text-medium font-bold">Transactions</h1>
                    <Button className="bg-green-500 hidden md:flex" onClick={() => setIsOpen(!isOpen)}><Plus />Add Transaction</Button>
                    <Button className="bg-green-500 flex md:hidden" onClick={() => setIsOpen(!isOpen)}><Plus />Add New</Button>
                </div>
                <div className={`absolute top-11 right-5 bg-white rounded-xl z-10 transition-transform ${isOpen ? "translate-y-5 opacity-100 visible" : "invisible translate-y-0 opacity-0"
                    }`}>
                    <Addform setOpen={setIsOpen} setRefresh={setRefresh} />
                </div>
                <Table className="max-w-[90vw] bg-gray-200 rounded-lg ">
                    <TableCaption className="pb-5 text-bold">A list of your recent transactions.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <div className="flex items-center gap-2">
                                    Date <Filter size={20} className="hover:bg-gray-300 p-1" />
                                </div>
                            </TableHead>

                            <TableHead>
                                <div className="flex items-center gap-2">
                                    Notes <Filter size={20} className="hover:bg-gray-300 p-1" />
                                </div>
                            </TableHead>

                            <TableHead>
                                <div className="flex items-center gap-2">
                                    Payment <Filter size={20} className="hover:bg-gray-300 p-1" />
                                </div>
                            </TableHead>

                            <TableHead>
                                <div className="flex items-center gap-2">
                                    Amount <Filter size={20} className="hover:bg-gray-300 p-1" />
                                </div>
                            </TableHead>

                            <TableHead>Delete</TableHead>
                        </TableRow>


                    </TableHeader>
                    {
                        transactions.length > 0 ? (
                            <>
                                <TableBody>
                                    {transactions && transactions.map((tx, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <p>{formatDateTime(tx.date)[0]}</p>
                                                <small>{formatDateTime(tx.date)[1]}</small>
                                            </TableCell>
                                            <TableCell>{tx.notes || "---"}</TableCell>
                                            <TableCell>{tx.paymentMethod}</TableCell>
                                            <TableCell className="font-medium">₹ {tx.amount}</TableCell>
                                            <TableCell><Button size="sm" onClick={() => handleDelete(tx._id)} className="bg-red-600"><Trash2Icon /></Button></TableCell>

                                        </TableRow>

                                    ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan={3}>Total</TableCell>
                                        <TableCell colSpan={2} className="font-medium text-left">₹ {totalAmount}</TableCell>
                                    </TableRow>
                                </TableFooter></>
                        ) : (
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center pt-6 pb-8 text-gray-500">No transaction history</TableCell>
                                </TableRow>
                            </TableBody>
                        )
                    }
                </Table>
            </div>
        </div>
    );
}

export default Transactions;