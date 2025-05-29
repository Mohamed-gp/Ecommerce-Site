import { useEffect, useState } from "react";
import { FaSpinner, FaChartLine } from "react-icons/fa";
import customAxios from "../../../utils/axios/customAxios";

interface RevenueStats {
  today: {
    revenue: number;
    orders: number;
  };
  month: {
    revenue: number;
    orders: number;
  };
  total: {
    revenue: number;
    orders: number;
  };
}

const AdminDashboardRevenueCard = () => {
  const [revenueStats, setRevenueStats] = useState<RevenueStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRevenueStats = async () => {
      try {
        const { data } = await customAxios.get("/orders/revenue-stats");
        setRevenueStats(data.data);
      } catch (error) {
        console.error("Error fetching revenue stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRevenueStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <FaSpinner className="animate-spin text-mainColor text-2xl" />
      </div>
    );
  }

  const calculateGrowth = (current: number, previous: number) => {
    if (!previous) return 0;
    return ((current - previous) / previous) * 100;
  };

  const todayGrowth = calculateGrowth(
    revenueStats?.today.revenue || 0,
    (revenueStats?.month.revenue || 0) / 30 // approximate daily average
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-duration-300">
      <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Today's Revenue</span>
          <span className="font-semibold">
            ${revenueStats?.today.revenue.toLocaleString() || 0}
          </span>
        </div>

        <div className="flex items-center text-sm">
          <FaChartLine
            className={
              todayGrowth >= 0 ? "text-green-500 mr-2" : "text-red-500 mr-2"
            }
          />
          <span
            className={todayGrowth >= 0 ? "text-green-500" : "text-red-500"}
          >
            {Math.abs(todayGrowth).toFixed(1)}%
          </span>
          <span className="text-gray-500 ml-2">from daily average</span>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-500">Monthly Revenue</span>
            <span className="font-medium">
              ${revenueStats?.month.revenue.toLocaleString() || 0}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Total Revenue</span>
            <span className="font-medium">
              ${revenueStats?.total.revenue.toLocaleString() || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardRevenueCard;
