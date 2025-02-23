import { Icon } from "@radix-ui/react-select"
import { LucidePiggyBank, PlusCircle, TrendingDown, Wallet } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTransactions } from "@/context/context"



const IncomeCard = () => {
    const { totalAmount } = useTransactions()
    return (
        <>
            <Card className="sm:m-10 sm:max-w-[250px] ">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-green-800 text-md">Remaining</CardTitle>
                    <Icon><LucidePiggyBank
                        className="text-green-600" /></Icon>
                </CardHeader>
                <CardContent className="relative">
                    <h1 className="font-bold text-medium sm:text-xl">₹ ---</h1>
                </CardContent>
            </Card>
            <Card className="sm:m-10 sm:max-w-[250px] ">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-blue-600 text-md">Income</CardTitle>
                    <Icon><Wallet className="text-blue-600" /></Icon>
                </CardHeader>
                <CardContent className="relative">
                    <h1 className="font-bold text-medium sm:text-xl">₹ ---</h1>
                    <Icon className="absolute top-0 right-6 cursor-pointer"><PlusCircle className="bg-green-600 rounded-[50px] text-white" size={35} />
                    </Icon>
                </CardContent>
            </Card>
            <Card className="sm:m-10 sm:max-w-[250px]">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-red-600 text-md">Total Expenses</CardTitle>
                    <Icon><TrendingDown className="text-red-600" /></Icon>
                </CardHeader>
                <CardContent>
                    <h1 className="font-bold text-medium sm:text-xl">₹ {totalAmount || "---"}</h1>
                </CardContent>
            </Card>
        </>
    )
}

export default IncomeCard