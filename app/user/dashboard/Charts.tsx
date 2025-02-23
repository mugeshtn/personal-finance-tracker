import { useTransactions } from "@/context/context";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { MongoTransactionDatas } from "@/utils/types";

type formattedData = {
  date: string,
  amount: number
}
// const generateTransactionData = () => {
//   const transactions = [];
//   const months = ["2025-01", "2025-02", "2025-03", "2025-04", "2025-05"];
//   const paymentMethods = ["Cash", "Account"];

//   for (let i = 0; i < 50; i++) {
//     const randomMonth = months[Math.floor(Math.random() * months.length)];
//     const randomDate = `${randomMonth}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`;
//     const randomAmount = (Math.random() * 500).toFixed(2);
//     const randomPaymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];

//     transactions.push({
//       date: randomDate,
//       paymentMethod: randomPaymentMethod,
//       amount: randomAmount,
//       notes: `Transaction ${i + 1}`,
//     });
//   }

//   return transactions;
// };

// // Format the generated data to be used in the chart
// const formatDataForChart = (transactions: any[]) => {
//   const dateMap: { [key: string]: number } = {};

//   transactions.forEach((tx) => {
//     const date = tx.date;
//     const amount = parseFloat(tx.amount);
//     if (dateMap[date]) {
//       dateMap[date] += amount;
//     } else {
//       dateMap[date] = amount;
//     }
//   });

//   const formattedData = Object.keys(dateMap).map((date) => ({
//     date,
//     amount: dateMap[date].toFixed(2),
//   }));

//   return formattedData;
// };


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
    <div className="w-full md:w-[690px] px-5 py-5 bg-gray-100 rounded-2xl p-4">
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

const categoryData = [
  { name: "Food", value: 400 },
  { name: "Transport", value: 300 },
  { name: "Entertainment", value: 200 },
  { name: "Shopping", value: 500 },
  { name: "Health", value: 250 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

export const CategoryPieChart = () => {
  return (
    <div className="w-full md:w-[400px] md:ml-10 bg-gray-100 md:px-5 rounded-xl p-4">
      <h1 className="text-xl font-semibold ml-8">Categories</h1>
      <ResponsiveContainer className="bg-gray-100  rounded-2xl py-8" width="100%" height={320}>
        <PieChart >
          <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#8884d8" label>
            {categoryData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: "13px" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

