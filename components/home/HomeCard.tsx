import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaWallet, FaChartBar, FaRegChartBar, FaRocket } from "react-icons/fa";

const features = [
  { icon: <FaWallet className="text-blue-500 text-3xl" />, title: "Budget Tracking", description: "Set & manage your budgets easily." },
  { icon: <FaChartBar className="text-green-500 text-3xl" />, title: "Expense Tracking", description: "Log & categorize expenses effortlessly." },
  { icon: <FaRegChartBar className="text-purple-500 text-3xl" />, title: "Visual Reports", description: "View spending trends with insightful charts." },
  { icon: <FaRocket className="text-orange-500 text-3xl" />, title: "Easy to Use", description: "A simple & user-friendly interface." },
];

const HomeCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {features.map((feature, index) => (
        <Card key={index} className="p-4 shadow-md rounded-2xl hover:shadow-lg transition 
        hidden lg:block">
          <CardHeader className="flex items-center space-x-3">
            {feature.icon}
            <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default HomeCard;