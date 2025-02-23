import { showToast } from "./showToast"
import { MongoTransactionDatas, TCategories } from "./types"

export const sortByDate = (transactions: MongoTransactionDatas[], isAscending: boolean) => {
    try {
        return [...transactions].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);

            return isAscending
                ? dateA.getTime() - dateB.getTime()
                : dateB.getTime() - dateA.getTime();
        });
    } catch (error) {
        showToast("Error sorting by dates", "error")
        return transactions;
    }
}

export const sortByAmount = (transactions: MongoTransactionDatas[], isAscending: boolean) => {
    try {
        return [...transactions].sort((a, b) => {
            return isAscending
                ? Number(a.amount) - Number(b.amount)
                : Number(b.amount) - Number(a.amount);
        })
    } catch (error) {
        showToast("Error sorting by amount", "error")
    }
}

export const sortByPaymentMethod = (
    transactions: MongoTransactionDatas[],
    payMode: "Cash" | "Account" | "All"
) => {
    try {
        return [...transactions].filter((data) => {
            return data.paymentMethod === payMode;
        })
    } catch (error) {
        showToast("Error sorting by paymentMethod", "error")
    }
}

export const sortByCategories = (
    transactions: MongoTransactionDatas[],
    category: TCategories | "All"
) => {
    try {
        return [...transactions].filter(data => {
            return data.category === category
        })
    } catch (error) {
        showToast("Error sorting by category", "error")
    }
}