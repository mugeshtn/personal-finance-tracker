import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Categories } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormProvider, useForm } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { IEditForm } from "./BudgetTable";
import { budgetEditSchma } from "@/utils/types";
import axios from "axios";
import { showToast } from "@/utils/showToast";
import { useTransactions } from "@/context/context";



export default function EditForm({ closeForm, editForm }
    : {
        closeForm: Dispatch<SetStateAction<boolean>>,
        editForm: IEditForm | undefined
    }) {

    const { getBudget } = useTransactions()

    const form = useForm({
        resolver: zodResolver(budgetEditSchma),
        defaultValues: {
            amount: String(editForm?.total) || undefined,
            category: editForm?.category || undefined
        }
    });
    const onSubmit = async (data: { amount?: string; category?: string }) => {
        try {
            if (!editForm?.id) {
                showToast("Invalid budget ID", "error");
                return;
            }
            if (!data.amount && !data.category) {
                showToast("Please provide at least one field to update", "warning");
                return;
            }
            const response = await axios.patch(`/api/budgets/${editForm?.id}`, data, {
                headers: { "Content-Type": "application/json" }
            });
            if (response.status === 200) {
                showToast("Budget updated successfully", "success");
                closeForm(false);
                getBudget()
            }
        } catch (err: any) {
            showToast(err.response?.data?.message || "Error updating budget", "error");
        }
    };

    return (
        <Card className="w-full  z-10 max-w-md shadow-lg">
            <CardHeader>
                <h2 className="text-lg font-semibold">Add Budget</h2>
            </CardHeader>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select source" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    Categories.map((category) => (
                                                        <SelectItem key={category} value={category}>{category}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Enter amount"
                                            inputMode="decimal"
                                            pattern="^\d+(\.\d{1,2})?$"
                                            onChange={(e) => {
                                                let value = e.target.value;
                                                if (/^0+\d/.test(value)) {
                                                    value = value.replace(/^0+/, "");
                                                }
                                                if (/^\d*\.?\d{0,2}$/.test(value) || value === "") {
                                                    field.onChange(value);
                                                }
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button type="submit"
                            className="bg-green-600">Save</Button>
                        <Button
                            onClick={() => closeForm(false)}
                            className="bg-red-600">Close</Button>
                    </CardFooter>
                </form>
            </FormProvider>
        </Card>
    );
}
