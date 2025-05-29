import { useEffect, useState } from "react";
import AdminDashboardOrderCard from "./AdminDashboardOrderCard";
import customAxios from "../../../utils/axios/customAxios";
import { FaSpinner } from "react-icons/fa";

const AdminDashboardOrders = () => {
  const [orderStats, setOrderStats] = useState({
    today: { count: 0, status: { pending: 0, processing: 0, delivered: 0 } },
    week: { count: 0, status: { pending: 0, processing: 0, delivered: 0 } },
    month: { count: 0, status: { pending: 0, processing: 0, delivered: 0 } },
  });
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    fetchOrderStats();
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
      <p className="mt-6 mb-2 font-bold">Orders</p>
      <div className="flex justify-between lg:flex-row flex-col gap-y-3">
        <AdminDashboardOrderCard
          title="Today"
          count={orderStats.today.count}
          status={orderStats.today.status}
        />
        <AdminDashboardOrderCard
          title="This Week"
          count={orderStats.week.count}
          status={orderStats.week.status}
        />
        <AdminDashboardOrderCard
          title="This Month"
          count={orderStats.month.count}
          status={orderStats.month.status}
        />
      </div>
    </>
  );
};
export default AdminDashboardOrders;
