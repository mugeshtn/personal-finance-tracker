"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";
import { transactionSchema } from "@/utils/types";
import axios from 'axios';
import { showToast } from "@/utils/showToast";
import { dashboardCategories } from "@/utils/constants";


const Addform = ({ setOpen, setRefresh }: { setOpen: Dispatch<SetStateAction<boolean>>, setRefresh: Dispatch<SetStateAction<boolean>> }) => {
    const form = useForm({
        resolver: zodResolver(transactionSchema),
        defaultValues: { date: "", paymentMethod: "Cash", amount: "", notes: "", category: "others"},
    });

    const onSubmit = async (data: any) => {
        try {
            await axios.post("/api/transactions", data, {
                headers: { "Content-Type": "application/json" },
            });
            showToast("Transaction saved successfully!", "success")
            form.reset()
            setOpen(false)
            setRefresh(prev => !prev)
        } catch (error: any) {
            showToast(error.message || "Adding Transaction failed !", "error")
        }
    };

    return (
        <div className="flex rounded-xl"  >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto border p-4 shadow-md min-w-[300px]">
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date</FormLabel>
                                <FormControl>
                                    <Input {...field} type="datetime-local" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {dashboardCategories.map((category, index) => (
                                                <SelectItem key={index} value={category}>
                                                    {category}
                                                </SelectItem>
                                            ))}
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
                                    <Input {...field} type="text" placeholder="Enter amount"
                                        inputMode="decimal"
                                        pattern="[0-9]+(\.[0-9]{1,2})?"
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d*\.?\d*$/.test(value)) {
                                                field.onChange(value);
                                            }
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Select Payment Method</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an option" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Cash">Cash</SelectItem>
                                            <SelectItem value="Account">Account</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Notes</FormLabel>
                                <FormControl>
                                    <Input {...field} type="text" placeholder="Optinal notes" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full">Add Transaction</Button>
                </form>
            </Form>
        </div>
    );
}

export default Addform;
