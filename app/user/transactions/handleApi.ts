import { showToast } from "@/utils/showToast"
import { MongoTransactionDatas } from "@/utils/types"
import axios from "axios"
import { Dispatch, SetStateAction } from "react"

export const handleDelete = async (id: string, setRefresh: Dispatch<SetStateAction<boolean>>) => {
    try {
        await axios.delete(`/api/transactions/${id}`)
        showToast("Deletion successful", "success")
        setRefresh(prev => !prev)
    } catch (error: any) {
        showToast(error.message || "Deletion failed", "error")
    }
}


export const handleEdit = async (data: MongoTransactionDatas, setRefresh: Dispatch<SetStateAction<boolean>>, setClose: Dispatch<SetStateAction<boolean>>
) => {
    console.log(data._id)
    try {
        await axios.put(`/api/transactions/${data._id}`, data, {
            headers: { "Content-Type": "application/json" },
        });
        setRefresh(prev => !prev)
        setClose(prev => !prev)

        showToast("Transaction updated successfully!", 'success')
    } catch (error: any) {
        showToast(error.message || "Error updating transaction !", 'error')
    }
};