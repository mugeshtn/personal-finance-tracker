import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTransactions } from "@/context/context";
import { showToast } from "@/utils/showToast";
import axios from "axios";
import { Edit, Trash } from "lucide-react";
import EditForm from "./EditBudgetForm";
import { useState } from "react";
import { TCategories } from "@/utils/types";

export interface IEditForm{
    total: number;
    category: TCategories;
    id: string;
}


const BudgetTable = () => {

  const { budget, category, getBudget } = useTransactions()
  const [budgetEditForm, showBudgetEditForm] = useState(false)
  const [editForm, setEditForm] = useState<IEditForm>()
  const filteredTotal = category.length > 0 ? category
    .filter(b => budget.some(c => c.category === b.category)) : []

  const handleDelete = async (id: string) => {
    try {
      if(!id){
        showToast("Id is absent", 'error')
      }
      const response
        = await axios.delete(`/api/budgets/${id}`)
      if (response.status !== 200) throw new Error("Unexpected response from server")
      showToast("Budget Deletion successful !", "success")
      getBudget()
    } catch (err: any) {
      showToast(err.message || "Budget deletion failed !", "error")
    }
  }

  const handleForm = (data: IEditForm) => {
    setEditForm(data)
    showBudgetEditForm(!budgetEditForm)
  }
  return (
    <>
      <div className="relative mb-52">
        <div className="w-full max-w-2xl text-black mx-auto p-4 bg-gray-300 rounded-2xl shadow-2xl">
          <h2 className="text-xl font-bold mb-4">Budget vs Actual Expenses</h2>
          <Table className="text-[12px] lg:text-[15px]">
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Budgeted Amount (₹)</TableHead>
                <TableHead>Actual Expenses (₹)</TableHead>
                <TableHead>Variance (₹)</TableHead>
                <TableHead>Edit </TableHead>
                <TableHead>Delete </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {budget.length > 0 ? (
                budget.map((item, index) => {

                  const actualItem = filteredTotal.find(actual => actual.category === item.category);
                  const actual = actualItem ? actualItem.total : 0;

                  const variance = item.total - actual;
                  const varianceColor = variance >= 0 ? "text-green-600" : "text-red-600";

                  return (
                    <TableRow key={index}>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>₹ {item.total}</TableCell>
                      <TableCell>₹ {actual}</TableCell>
                      <TableCell className={`font-semibold ${varianceColor}`}>
                        {variance >= 0 ? `+ ₹${variance}` : `- ₹${Math.abs(variance)}`}
                      </TableCell>
                      <TableCell><Button size="sm"
                        onClick={() => handleForm(item)}
                        className="bg-blue-600"><Edit /></Button></TableCell>
                      <TableCell><Button
                        onClick={() => handleDelete(item.id)}
                        size="sm" className="bg-red-600"><Trash /></Button></TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center pt-6 pb-8 text-gray-500">No Budget Allocated</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {
          budgetEditForm && (
            <div className="absolute top-0 right-0 lg:right-32">
              <EditForm closeForm={showBudgetEditForm} editForm={editForm}/>
            </div>
          )
        }
      </div>
    </>
  )
};

export default BudgetTable;
