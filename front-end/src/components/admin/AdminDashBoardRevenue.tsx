import { useEffect, useState } from "react";
import customAxios from "../../utils/axios/customAxios";
import toast from "react-hot-toast";
import AdminDashboardRevenueCard from "./adminDashboard/AdminDashboardRevenueCard";

interface RevenueData {
  today: number;
  thisMonth: number;
  total: number;
  todayOrders: number;
  thisMonthOrders: number;
  totalOrders: number;
}

const AdminDashBoardRevenue = () => {
  const [revenue, setRevenue] = useState<RevenueData>({
    today: 0,
    thisMonth: 0,
    total: 0,
    todayOrders: 0,
    thisMonthOrders: 0,
    totalOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  const getRevenue = async () => {
    try {
      const { data } = await customAxios.get("/admin/revenue");
      setRevenue(data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load revenue data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRevenue();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-mainColor"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <AdminDashboardRevenueCard
        title="Today's"
        revenue={revenue.today || 0}
        orders={revenue.todayOrders || 0}
      />
      <AdminDashboardRevenueCard
        title="This Month's"
        revenue={revenue.thisMonth || 0}
        orders={revenue.thisMonthOrders || 0}
      />
      <AdminDashboardRevenueCard
        title="Total"
        revenue={revenue.total || 0}
        orders={revenue.totalOrders || 0}
      />
    </div>
  );
};

export default AdminDashBoardRevenue;
