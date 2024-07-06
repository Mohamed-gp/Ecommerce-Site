import AdminDashboardRevenueCard from "./AdminDashboardRevenueCard";

const AdminDashBoardRevenue = () => {
  return (
    <>
      <p className="mt-6 mb-2 font-bold">Revenue</p>
      <div className="flex justify-between lg:flex-row  flex-col gap-y-3 ">
        <AdminDashboardRevenueCard />
        <AdminDashboardRevenueCard />
        <AdminDashboardRevenueCard />
      </div>
    </>
  );
};
export default AdminDashBoardRevenue;
