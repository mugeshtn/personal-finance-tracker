"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { incomeDateTime } from "@/utils/utilFunctions";
import { incomeSchema, TIncomeDatas } from "@/utils/types";
import { showToast } from "@/utils/showToast";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

const todayFormatted = incomeDateTime(new Date().toISOString());
const todayInputFormat = new Date().toISOString().split("T")[0];

const AddIncome = ({ setShowIncForm }: { setShowIncForm: Dispatch<SetStateAction<boolean>> }) => {

    const form = useForm<TIncomeDatas>({
        resolver: zodResolver(incomeSchema),
        defaultValues: {
            amount: "",
            date: todayInputFormat,
            source: undefined,
        },
    });
    const onSubmit = async (data: TIncomeDatas) => {
        try {
            await axios.post("/api/income", data, {
                headers: { "Content-Type": "application/json" },
            });
            showToast("Income added successfully !", "success")
            setShowIncForm(false)
            form.reset()
        } catch (error: any) {
            showToast(error.message || "Error saving income datas")
        }
    };

    return (
        <Card className="w-full z-10 max-w-md shadow-lg">
            <CardHeader>
                <h2 className="text-lg font-semibold">Add Income</h2>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="space-y-4">
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
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="date" />
                                    </FormControl>
                                    <small className="text-xs ml-3 text-gray-400">{todayFormatted}</small>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="source"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Source</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select source" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Salary">Salary</SelectItem>
                                                <SelectItem value="Business">Business</SelectItem>
                                                <SelectItem value="Others">Others</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button type="submit" className="bg-blue-600">Save</Button>
                        <Button type="submit" onClick={() => setShowIncForm(false)} className="bg-red-600">Close</Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
};

export default AddIncome;
