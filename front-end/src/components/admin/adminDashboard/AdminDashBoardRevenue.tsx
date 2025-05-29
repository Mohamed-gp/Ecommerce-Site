import { useEffect, useState } from "react";
import AdminDashboardRevenueCard from "./AdminDashboardRevenueCard";
import customAxios from "../../../utils/axios/customAxios";
import { FaSpinner } from "react-icons/fa";

const AdminDashBoardRevenue = () => {
  const [revenueStats, setRevenueStats] = useState({
    today: { revenue: 0, orders: 0 },
    month: { revenue: 0, orders: 0 },
    total: { revenue: 0, orders: 0 },
  });
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    fetchRevenueStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <FaSpinner className="animate-spin text-mainColor text-2xl" />
      </div>
    );
  }

  return (
    <>
      <p className="mt-6 mb-2 font-bold">Revenue</p>
      <div className="flex justify-between lg:flex-row flex-col gap-y-3">
        <AdminDashboardRevenueCard
          title="Today"
          revenue={revenueStats.today.revenue}
          orders={revenueStats.today.orders}
        />
        <AdminDashboardRevenueCard
          title="This Month"
          revenue={revenueStats.month.revenue}
          orders={revenueStats.month.orders}
        />
        <AdminDashboardRevenueCard
          title="Total"
          revenue={revenueStats.total.revenue}
          orders={revenueStats.total.orders}
        />
      </div>
    </>
  );
};
export default AdminDashBoardRevenue;
