import { LucidePiggyBank, TrendingDown, PlusCircle, Wallet, MinusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransactions } from "@/context/context";
import { TCardFeatures } from "@/utils/types";
import AddIncome from "@/app/user/dashboard/AddIncome";
import { useEffect, useState } from "react";
import AddBudget from "@/app/user/budget/AddBudget";
import DeleteForm from "./DeleteForm";

const IncomeCard = ({ cardFeatures }: { cardFeatures: TCardFeatures[] }) => {
    const { totalExpense, income, balance, getIncome, budgetAmt, getBudget, filteredBudgets = [] } = useTransactions();

    const [showIncForm, setShowIncForm] = useState(false);
    const [showDelForm, setShowDelForm] = useState(false);
    const [showBudgetForm, setShowBudgetForm] = useState(false);

    const spendAmt = filteredBudgets.reduce((sum, val) => {
        return sum + val.category.total;
    }, 0)

    const savingsAmt = budgetAmt - spendAmt;

    useEffect(() => {
        getIncome()
    }, [showIncForm])

    useEffect(() => {
        getBudget()
    }, [showBudgetForm])

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
                        <h1 className="font-bold text-medium lg:text-lg">
                            ₹ {
                                getCardValue(card.name, card.amount)
                            }
                        </h1>
                        {
                            (card.name === "Total Income") ? (
                                <>
                                    <div
                                        onClick={() => {
                                            setShowIncForm(!showIncForm)
                                            setShowDelForm(false)
                                        }}
                                        className="absolute top-0 right-16"
                                    >
                                        <PlusCircle className="bg-green-600 rounded-full text-white" size={32} />
                                    </div>
                                    <div
                                        onClick={() => {
                                            setShowDelForm(!showDelForm)
                                            setShowIncForm(false)
                                        }}
                                        className="absolute right-4 top-0"
                                    >
                                        <MinusCircle className="bg-red-600 rounded-full text-white" size={32} />
                                    </div>
                                </>
                            ) : (card.name === "Total Budget") ? (
                                <div
                                    onClick={() => setShowBudgetForm(!showBudgetForm)}
                                    className="absolute bottom-5 right-6 cursor-pointer"
                                >
                                    <PlusCircle className="bg-green-600 rounded-full text-white" size={32} />
                                </div>
                            ) : null

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
                <div className="absolute left-20 lg:left-72 top-10  z-20 min-w-[300px]">
                    <AddBudget setShowBudgetForm={setShowBudgetForm} />
                </div>
            )}

            {
                showDelForm && (
                    <div className="absolute left-20 sm:left-52 md:left-64 lg:left-72 sm:top-10 z-10 min-w-[200px]">
                        <DeleteForm setShowDelForm={setShowDelForm} />
                    </div>
                )
            }
        </>
    );
};

export default IncomeCard;