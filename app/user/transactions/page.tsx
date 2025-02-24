"use client"
import Addform from "@/components/transaction/AddForm";
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
import { Filter, Plus, ArrowUpDown, RefreshCcw, X, Pencil, Trash2Icon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useTransactions } from "@/context/context";
import { MongoTransactionDatas, TCategories } from "@/utils/types";
import EditForm from "@/components/transaction/EditForm";
import { formatDateTime } from "@/utils/utilFunctions";
import { handleDelete } from "./handleApi";
import { sortByAmount, sortByCategories, sortByDate, sortByPaymentMethod } from "@/utils/filterTransaction";
import { Categories, paymentItems } from "@/utils/constants";

const Transactions = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [amount, setAmount] = useState(false)
    const [payment, setPayment] = useState(false)
    const [dateFilter, setDateFilter] = useState(false)
    const [editedData, setEditedData] = useState<MongoTransactionDatas>()
    const [showEditForm, setShowEditForm] = useState(false)
    const [category, setCategory] = useState(false)
    const { transactions, setTransactions, getDatas, totalExpense } = useTransactions()

    useEffect(() => {
        getDatas()
        setPayment(false)
        setAmount(false)
        setDateFilter(false)
        setCategory(false)
    }, [refresh])

    const handleAmountSort = useCallback((isAscending: boolean) => {
        const amountSorted = sortByAmount(transactions ?? [], isAscending)
        setTransactions(amountSorted ?? [])
        setAmount(!amount)
    }, [amount])

    const handleDateSort = useCallback(() => {
        setDateFilter(prev => !prev)
        const dateSorted = sortByDate(transactions ?? [], dateFilter)
        setTransactions(dateSorted)
    }, [dateFilter])

    const handlePaymentSort = useCallback((payMode: "Cash" | "Account" | "All") => {
        if (payMode === "All") {
            setPayment(false)
            return getDatas()
        }
        const payModeSorted = sortByPaymentMethod(transactions ?? [], payMode)
        setTransactions(payModeSorted ?? [])
        setPayment(false)
    }, [payment])

    const handleCategorySort = useCallback((category: TCategories | "All") => {
        if (category === "All") {
            setPayment(false)
            return getDatas()
        }
        const categorySorted = sortByCategories(transactions, category)
        setTransactions(categorySorted ?? [])
        setCategory(false)
    }, [category])

    const editingData = (tx: MongoTransactionDatas) => {
        setShowEditForm(!showEditForm)
        setEditedData(tx)
    }

    return (
        <>
            <h1 className="white ml-10 text-lgtext-gray-400">Keep records of every transaction !</h1>
            <div className="mt-14 flex w-full justify-center min-w-[80vw] text-black relative mb-32">
                <div className=" bg-gray-100 rounded-3xl px-14 min-w-[80vw]">
                    <div className="flex justify-between py-6">
                        <div>
                            <h1 className="hidden sm:flex text-xl font-bold">Transaction History</h1>
                            <h1 className="flex sm:hidden text-medium font-bold">Transactions</h1>
                            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-800 mt-2" onClick={() => setRefresh(!refresh)}>Refresh<RefreshCcw size={24} /></Button>
                        </div>
                        {
                            isOpen ? (<>
                                <Button size="sm" className="bg-red-600 flex mt-10" onClick={() => setIsOpen(!isOpen)}><X />Close</Button>
                            </>) : (
                                <>
                                    <Button size="sm" className="bg-green-500 hidden md:flex mt-10" onClick={() => setIsOpen(!isOpen)}><Plus />Add Transaction</Button>
                                    <Button className="bg-green-500 flex md:hidden mt-8" size="sm" onClick={() => setIsOpen(!isOpen)}><Plus />Add New</Button></>
                            )
                        }

                    </div>
                    <div className={`absolute top-0 md:right-80 right-10 bg-white rounded-xl z-10 transition-transform ${isOpen ? "translate-y-24 -translate-x-12 md:translate-y-16 md:translate-x-16 opacity-100 visible" : "invisible md:translate-y-16 md:translate-x-96 opacity-0"
                        }`}>
                        <Addform setOpen={setIsOpen} setRefresh={setRefresh} />
                    </div>
                    <Table className="max-w-[90vw] bg-gray-200 rounded-lg min-h-[60vh]">
                        <TableCaption className="pb-5 text-xs">List of your recent transactions.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    <div className="flex items-center gap-1">
                                        Date <ArrowUpDown size={20}
                                            onClick={handleDateSort}
                                            className="hover:bg-gray-300 p-1 rounded-sm" />
                                    </div>
                                </TableHead>

                                <TableHead>
                                    Notes
                                </TableHead>
                                <TableHead>
                                    <div className="flex items-center gap-1 relative">
                                        Category <Filter size={20}
                                            onClick={() => setCategory(!category)}
                                            className="hover:bg-gray-300 p-1 rounded-sm" />
                                        <div className={`absolute top-5 right-0 lg:right-24 bg-gray-300 text-black p-2 rounded-md shadow-md flex flex-col text-xs  ${category ? "visible opacity-100 translate-y-0" : "-translate-y-5 invisible"} space-y-2 transition-transform `}>
                                            {
                                                Categories.map((val) => (
                                                    <p
                                                        key={val}
                                                        onClick={() => handleCategorySort(val)}
                                                        className="hover:bg-gray-400 cursor-pointer p-2 rounded-lg">
                                                        {val}
                                                    </p>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </TableHead>

                                <TableHead>
                                    <div className="flex items-center gap-1 relative">
                                        Payment <Filter size={20}
                                            onClick={() => setPayment(!payment)}
                                            className="hover:bg-gray-300 p-1 rounded-sm" />
                                        <div className={`absolute top-5 right-0 lg:right-24 bg-gray-300 text-black p-2 rounded-md shadow-md flex flex-col text-xs  ${payment ? "visible opacity-100 translate-y-0" : "-translate-y-5 invisible"} space-y-2 transition-transform `}>
                                            {
                                                paymentItems.map((val) => (
                                                    <p
                                                        key={val}
                                                        onClick={() => handlePaymentSort(val)}
                                                        className="hover:bg-gray-400 cursor-pointer p-2 rounded-lg">
                                                        {val}
                                                    </p>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </TableHead>

                                <TableHead>
                                    <div className="flex items-center gap-1 relative">
                                        Amount <ArrowUpDown size={20}
                                            onClick={() => setAmount(!amount)}
                                            className="hover:bg-gray-300 p-1 rounded-sm" />
                                        <div className={`absolute top-5 right-0 lg:right-20 bg-gray-300 text-black p-4 rounded-md shadow-md flex flex-col ${amount ? "visible opacity-100 translate-y-0" : "-translate-y-5 invisible"} space-y-2 transition-transform `}>
                                            <p className="hover:bg-gray-400 cursor-pointer p-2 rounded-lg text-xs" onClick={() => handleAmountSort(true)}>Lowest</p>
                                            <p onClick={() => handleAmountSort(false)} className="hover:bg-gray-400 cursor-pointer p-2 rounded-lg text-xs">Highest</p>
                                        </div>
                                    </div>
                                </TableHead>

                                <TableHead>Edit</TableHead>
                                <TableHead>Delete</TableHead>
                            </TableRow>


                        </TableHeader>
                        {transactions &&
                            transactions.length > 0 ? (
                            <>
                                <TableBody>
                                    {transactions.map((tx, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <p>{formatDateTime(tx.date)[0]}</p>
                                                <small>{formatDateTime(tx.date)[1]}</small>
                                            </TableCell>
                                            <TableCell>{tx.notes || "---"}</TableCell>
                                            <TableCell>{tx.category}</TableCell>
                                            <TableCell>{tx.paymentMethod}</TableCell>
                                            <TableCell className="font-medium">₹ {tx.amount}</TableCell>
                                            <TableCell><Button size="sm" onClick={() => editingData(tx)} className="bg-blue-600"><Pencil /></Button></TableCell>
                                            <TableCell><Button size="sm" onClick={() => handleDelete(tx._id, setRefresh)} className="bg-red-600"><Trash2Icon /></Button></TableCell>
                                        </TableRow>

                                    ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan={4}>Total</TableCell>
                                        <TableCell colSpan={3} className="font-medium text-left">₹ {totalExpense}</TableCell>
                                    </TableRow>
                                </TableFooter></>
                        ) : (
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center pt-6 pb-8 text-gray-500">No transaction history</TableCell>
                                </TableRow>
                            </TableBody>
                        )
                        }
                    </Table>

                    {
                        showEditForm && (
                            <EditForm editedData={editedData as MongoTransactionDatas} setEditedData={setEditedData} setClose={setShowEditForm} setRefresh={setRefresh} />
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default Transactions;