import { useTransactions } from "@/context/context";
import { Button } from "../ui/button";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import axios from "axios";
import { showToast } from "@/utils/showToast";


const DeleteForm = ({ setShowDelForm }: { setShowDelForm: Dispatch<SetStateAction<boolean>> }) => {
    const { income, getIncome } = useTransactions()
    const [amount, setAmount] = useState("")
    const [error, setError] = useState("")

    const validateAmount = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        const pattern = /^(|[1-9][0-9]*|[1-9][0-9]*\.[0-9]{1,2})$/;
        if (pattern.test(input)) {
            setAmount(input)
        }
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (Number(amount) >= income) {
            setAmount("")
            setError("Amount is greater than income")
            return;
        }
        const amountToReduce = Number(amount);
        updateIncome(amountToReduce)
        setShowDelForm(false)
    }

    const updateIncome = async (amount: number) => {
        try {
            await axios.put("/api/income", amount, {
                headers: { "Content-Type": "application/json" },
            });
            showToast("Income updated successfully !", "success")
            getIncome()
            setShowDelForm(false)
            setAmount("")
        } catch (error: any) {
            showToast(error.message || "Error saving income datas")
        }
    }
    return (
        <div className="flex rounded-xl"  >
            <div className="space-y-4 mx-auto border p-4 shadow-md max-w-[250px] bg-gray-200 rounded-xl">
                <h1 className="text-xl text-black font-bold text-center">Deduct</h1>
                {error && <small className="text-red-600 text-center">{error}</small>}
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <input
                        className="w-[100%] p-2 text-black outline-none border-none rounded-xl mb-5"
                        type="text"
                        id="amount"
                        value={amount}
                        placeholder="Enter amount"
                        onChange={validateAmount}
                    />

                    <Button disabled={amount ? false : true} type="submit" size="sm" className="bg-red-600 m-auto">Reduce</Button>
                </form>
            </div>
        </div >
    )
}

export default DeleteForm;