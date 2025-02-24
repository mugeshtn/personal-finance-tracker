import { useTransactions } from "@/context/context";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { MongoTransactionDatas } from "@/utils/types";

type formattedData = {
  date: string,
  amount: number
}

export const DailyBarChart = () => {
  const { transactions } = useTransactions();

  const formattedData: formattedData[] = transactions.reduce((acc: formattedData[], tx: MongoTransactionDatas) => {
    const date = new Date(tx.date).toLocaleString("en-IN", {
      day: "numeric",
      weekday: "short"
    });

    const existingDay = acc.find(item => item.date === date);

    if (existingDay) {
      existingDay.amount += Number(tx.amount);
    } else {
      acc.push({ date, amount: Number(tx.amount) });
    }

    return acc;
  }, []);
  return (
    <div className="w-full md:w-[690px] px-5 py-5 bg-gray-100 rounded-2xl shadow-2xl p-4">
      <h1 className="text-xl font-semibold mb-4 ml-8">Monthly Transaction</h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formattedData} margin={{ top: 30, right: 30, bottom: 20, left: 0 }} barCategoryGap={5}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" fontSize={10} />
          <YAxis fontSize={10} domain={[0, "dataMax + 500"]} allowDataOverflow />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const budgetData = [
  { category: "Food & Drinks", amount: 5000 },
  { category: "Transport", amount: 2000 },
  { category: "Entertainment", amount: 3000 },
  { category: "Shopping", amount: 4000 },
  { category: "Health & Fitness", amount: 2500 },
  { category: "Others", amount: 1500 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF", "#FF6384"];


export const CategoryPieChart = () => {
  const { category } = useTransactions();
  return (
    <div className="w-full md:w-[400px] md:ml-10 bg-gray-100 md:px-5 shadow-2xl rounded-xl p-4">
      <h1 className="text-xl font-semibold ml-8">Categories</h1>
      <ResponsiveContainer className="bg-gray-100  rounded-2xl py-8" width="100%" height={320}>
        <PieChart >
          <Pie data={category} dataKey="total" nameKey="category" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#8884d8" label>
            {budgetData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: "11px" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

