import { LucidePiggyBank, TrendingDown, PlusCircle, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransactions } from "@/context/context";
import { TCardFeatures } from "@/utils/types";
import AddIncome from "@/app/user/dashboard/AddIncome";
import { useEffect, useState } from "react";
import AddBudget from "@/app/user/budget/AddBudget";

const IncomeCard = ({ cardFeatures }: { cardFeatures: TCardFeatures[] }) => {
    const { totalExpense, income, balance, getIncome, budgetAmt, getBudget, filteredBudgets = [] } = useTransactions();

    const [showIncForm, setShowIncForm] = useState(false);
    const [showBudgetForm, setShowBudgetForm] = useState(false);

    const spendAmt = filteredBudgets.reduce((sum, val) => {
       return sum + val.category.total;
    }, 0)

    const savingsAmt = budgetAmt - spendAmt;

    useEffect(() => {
        getIncome()
        getBudget()
    }, [showIncForm, showBudgetForm])

    const getCardValue = (name: string, amount: string) => {
        switch (name) {
            case "Total Expenses":
                return totalExpense ?? amount;
            case "Balance":
                return balance ?? amount;
            case "Total Income":
                return income ?? amount;
            case "Total Budget":
                return budgetAmt ?? amount;
            case "Savings":
                return savingsAmt ?? amount;
            case "Actual Spend":
                return spendAmt ?? amount;

            default:
                return "---";
        }
    };

    return (
        <>
            {cardFeatures.map((card) => (
                <Card className="sm:m-10 sm:max-w-[250px] shadow-md" key={card.name}>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className={`${card.color} font-bold`}>{card.name}</CardTitle>
                        {
                            card.name === "Total Expenses" || card.name === "Actual Spend" ? <TrendingDown className={card.color} /> :
                                card.name === "Total Income" || card.name === "Total Budget" ? <Wallet className={card.color} /> :
                                    card.name === "Balance" || card.name === "Savings" ? <LucidePiggyBank className={card.color} /> :
                                        card.name === "Total Budget" ? <Wallet className={card.color} /> : null
                        }
                    </CardHeader>
                    <CardContent className="relative">
                        <h1 className="font-bold text-medium sm:text-xl">
                            ₹ {
                                getCardValue(card.name, card.amount)
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
                <div className="absolute lg:left-72 right-0 lg:top-10 z-10 min-w-[300px]">
                    <AddIncome setShowIncForm={setShowIncForm} />
                </div>
            )}
            {showBudgetForm && (
                <div className="absolute left-32 lg:left-72 top-10  z-20 min-w-[300px]">
                    <AddBudget setShowBudgetForm={setShowBudgetForm} />
                </div>
            )}
        </>
    );
};

export default IncomeCard;