import { useEffect, useState } from "react";
import { FaSpinner, FaChartLine, FaBox } from "react-icons/fa";
import customAxios from "../../../utils/axios/customAxios";

interface OrderStats {
  today: {
    orders: number;
    total: number;
  };
  month: {
    orders: number;
    total: number;
  };
  pending: number;
  processing: number;
  delivered: number;
}

const AdminDashboardOrderCard = () => {
  const [orderStats, setOrderStats] = useState<OrderStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrderStats = async () => {
      try {
        const { data } = await customAxios.get("/orders/stats");
        setOrderStats(data.data);
      } catch (error) {
        console.error("Error fetching order stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderStats();
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

  const orderGrowth = calculateGrowth(
    orderStats?.today.orders || 0,
    (orderStats?.month.orders || 0) / 30 // approximate daily average
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-duration-300">
      <h3 className="text-lg font-semibold mb-4">Orders Overview</h3>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Today's Orders</span>
          <span className="font-semibold">{orderStats?.today.orders || 0}</span>
        </div>

        <div className="flex items-center text-sm">
          <FaChartLine
            className={
              orderGrowth >= 0 ? "text-green-500 mr-2" : "text-red-500 mr-2"
            }
          />
          <span
            className={orderGrowth >= 0 ? "text-green-500" : "text-red-500"}
          >
            {Math.abs(orderGrowth).toFixed(1)}%
          </span>
          <span className="text-gray-500 ml-2">from daily average</span>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-yellow-500 font-semibold">
                {orderStats?.pending || 0}
              </div>
              <div className="text-xs text-gray-500">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-blue-500 font-semibold">
                {orderStats?.processing || 0}
              </div>
              <div className="text-xs text-gray-500">Processing</div>
            </div>
            <div className="text-center">
              <div className="text-green-500 font-semibold">
                {orderStats?.delivered || 0}
              </div>
              <div className="text-xs text-gray-500">Delivered</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOrderCard;
