import { useTransactions } from "@/context/context";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { MongoTransactionDatas } from "@/utils/types";

type formattedData = {
  date: string,
  amount: number
}

export const DailyBarChart = () => {
  const { transactions = [] } = useTransactions();

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
    <div className="w-full px-5 py-5 bg-gray-100 rounded-2xl shadow-2xl ">
      <h1 className="text-xl font-semibold mb-4 ml-8">Monthly Transaction</h1>
      {
        transactions.length > 0 ? (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={formattedData} margin={{ top: 30, right: 30, bottom: 20, left: 0 }} barCategoryGap={5}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" fontSize={10} />
              <YAxis fontSize={10} domain={[0, "dataMax + 500"]} allowDataOverflow />
              <Tooltip />
              <Bar dataKey="amount" fill="#8884d8" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center text-gray-500 py-8">No Transaction data available!</div>
        )
      }
    </div>
  );
};


// CATEGORY WISE PIE CHART

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF", "#FF6384"];

export const CategoryPieChart = () => {
  const { category = [] } = useTransactions();
  return (
    <div className="w-full md:w-[400px] md:ml-10 bg-gray-200 md:px-5 shadow-2xl rounded-xl py-5">
      <h1 className="text-xl font-semibold ml-8">Categories</h1>
      {category.length > 0 ? (
        <ResponsiveContainer className="bg-gray-200 rounded-2xl" width="100%" height={320}>
          <PieChart>
            <Pie
              data={category}
              dataKey="total"
              nameKey="category"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              fill="#8884d8"
              fontSize={13}
              label
            >
              {category.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: "11px" }} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-center text-gray-500 py-8">No Categories Available</div>
      )}
    </div>
  );
}




// BUDGET VS ACTUAL BAR CHART
const customBarRender = (props: any, payload: any) => {
  const { x, y, width, height } = props;
  const barColor = payload.category.total > payload.total ? "red" : "#82ca9d"; 

  return (
    <rect x={x} y={y} width={width} height={height} fill={barColor} />
  );
};
export const ComparisonBarChart = () => {
  const { filteredBudgets=[] } = useTransactions();


  return (
    <>
      <div className="w-full md:w-[690px] px-5 py-5 bg-gray-100 rounded-2xl shadow-2xl">
        <h1 className="text-xl font-semibold ml-0 md:ml-10 pb-3 text-center md:text-left">Budget vs Actual Comparison</h1>
        {
          filteredBudgets.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredBudgets}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis fontSize={10} dataKey="category.category" />
                <YAxis fontSize={10} domain={[0, "dataMax + 500"]} allowDataOverflow />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Bar dataKey="total" fill="#8884d8" name="Budget"/>
                <Bar
                name="Expenses"
                  dataKey="category.total"
                  shape={(props: any) => customBarRender(props, props.payload)}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center text-gray-500 py-8">No comparison data Available</div>
          )
        }
      </div>

    </>
  )
}