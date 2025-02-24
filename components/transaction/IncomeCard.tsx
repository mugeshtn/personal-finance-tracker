import { LucidePiggyBank, TrendingDown, PlusCircle, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransactions } from "@/context/context";
import { TCardFeatures } from "@/utils/types";
import AddIncome from "@/app/user/dashboard/AddIncome";
import { useEffect, useState } from "react";
import AddBudget from "@/app/user/budget/AddBudget";

const IncomeCard = ({ cardFeatures }: { cardFeatures: TCardFeatures[] }) => {
    const { totalExpense, income, balance, getIncome } = useTransactions();

    const [showIncForm, setShowIncForm] = useState(false);
    const [showBudgetForm, setShowBudgetForm] = useState(false);

    useEffect(() => {
        getIncome()
    }, [showIncForm])

    
    return (
        <>
            {cardFeatures.map((card) => (
                <Card className="sm:m-10 sm:max-w-[250px] shadow-md" key={card.name}>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className={`${card.color} font-bold`}>{card.name}</CardTitle>
                        {
                            card.name === "Total Expenses" || card.name === "Actual Spend" ? <TrendingDown className={card.color} /> :
                                card.name === "Total Income" || card.name === "Total Budget" ? <Wallet className={card.color} /> :
                                    card.name === "Balance" ||card.name === "Savings" ? <LucidePiggyBank className={card.color} /> :
                                        card.name === "Total Budget" ? <Wallet className={card.color} /> : null
                        }
                    </CardHeader>
                    <CardContent className="relative">
                        <h1 className="font-bold text-medium sm:text-xl">
                            ₹ {
                                card.name === "Total Expenses" ? totalExpense ?? card.amount :
                                    card.name === "Balance" ? balance ?? card.amount :
                                        card.name === "Total Income" ? income ?? card.amount :
                                            "---"
                            }
                        </h1>
                        {
                            (card.name === "Total Income" || card.name === "Total Budget") && (
                                <div
                                    onClick={() => card.name === "Total Income" ? setShowIncForm(!showIncForm) : setShowBudgetForm(!showBudgetForm)}
                                    className="absolute top-0 right-6 cursor-pointer"
                                >
                                    <PlusCircle className="bg-green-600 rounded-full text-white" size={35} />
                                </div>
                            )
                        }
                    </CardContent>
                </Card>
            ))}

            {showIncForm && (
                <div className="absolute left-72 top-10 z-10 min-w-[300px]">
                    <AddIncome setShowIncForm={setShowIncForm} />
                </div>
            )}
            {showBudgetForm && (
                <div className="absolute left-72 top-10 z-20 min-w-[300px]">
                    <AddBudget setShowBudgetForm={setShowBudgetForm} />
                </div>
            )}
        </>
    );
};

export default IncomeCard;