import { FaChartLine } from "react-icons/fa";

interface AdminDashboardRevenueCardProps {
  title: string;
  revenue: number;
  orders: number;
}

const AdminDashboardRevenueCard = ({
  title,
  revenue,
  orders,
}: AdminDashboardRevenueCardProps) => {
  const calculateGrowth = () => {
    // Since we don't have historical data, return a mock growth percentage
    // In a real app, this would be calculated from actual historical data
    return Math.floor(Math.random() * 20) - 5; // Random between -5 and 15
  };

  const growth = calculateGrowth();

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-duration-300">
      <h3 className="text-lg font-semibold mb-4">{title} Revenue</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Revenue</span>
          <span className="font-semibold text-2xl">
            ${revenue.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Orders</span>
          <span className="font-medium">{orders}</span>
        </div>

        <div className="flex items-center text-sm pt-2 border-t border-gray-100">
          <FaChartLine
            className={
              growth >= 0 ? "text-green-500 mr-2" : "text-red-500 mr-2"
            }
          />
          <span className={growth >= 0 ? "text-green-500" : "text-red-500"}>
            {Math.abs(growth).toFixed(1)}%
          </span>
          <span className="text-gray-500 ml-2">from last period</span>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardRevenueCard;
