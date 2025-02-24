import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const budgetData = [
  { category: "Food & Drinks", budget: 5000, actual: 4500 },
  { category: "Transport", budget: 2000, actual: 2500 },
  { category: "Entertainment", budget: 3000, actual: 2800 },
  { category: "Shopping", budget: 4000, actual: 4200 },
  { category: "Health & Fitness", budget: 3500, actual: 3000 },
  { category: "Others", budget: 1000, actual: 800 },
];

const BudgetTable = () => {
  return (
    <div className="w-full max-w-2xl text-black mx-auto p-4 bg-gray-300 rounded-2xl mb-20 shadow-2xl">
      <h2 className="text-xl font-bold mb-4">Budget vs Actual Expenses</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Budgeted Amount (₹)</TableHead>
            <TableHead>Actual Expenses (₹)</TableHead>
            <TableHead>Variance (₹)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {budgetData.map((item, index) => {
            const variance = item.budget - item.actual;
            const varianceColor = variance >= 0 ? "text-green-600" : "text-red-600";

            return (
              <TableRow key={index}>
                <TableCell>{item.category}</TableCell>
                <TableCell>₹{item.budget}</TableCell>
                <TableCell>₹{item.actual}</TableCell>
                <TableCell className={`font-semibold ${varianceColor}`}>
                  {variance >= 0 ? `+₹${variance}` : `-₹${Math.abs(variance)}`}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default BudgetTable;
