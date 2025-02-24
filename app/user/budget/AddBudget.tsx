import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Categories } from "@/utils/constants";
import { budgetSchema, TBudgetDatas } from "@/utils/types";
import axios from "axios";
import { showToast } from "@/utils/showToast";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dispatch, SetStateAction } from "react";

const todayInputFormat = new Date().toISOString().split("T")[0];

const AddBudget = ({setShowBudgetForm}: {setShowBudgetForm: Dispatch<SetStateAction<boolean>>}) => {
  const form = useForm<TBudgetDatas>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      amount: "",  // Allow empty initially
      date: todayInputFormat,
      category: undefined,
    },
  });

  const onSubmit = async (data: TBudgetDatas) => {
    try {
      await axios.post("/api/budgets", data, {
        headers: { "Content-Type": "application/json" },
      });
      showToast("Budget saved successfully!", "success");
      setShowBudgetForm(false)
      form.reset();
    } catch (error: any) {
      showToast( error.message || "Error occurred while saving budget!", "error");
    }
  };

  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Add Budget</CardTitle>
      </CardHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto border p-4 shadow-md min-w-[300px] rounded-xl">
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
                        {Categories.map((category, index) => (
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

            <Button type="submit" className="w-full">Add Budget</Button>
          </form>
        </FormProvider>
    </Card>
  );
};

export default AddBudget;
