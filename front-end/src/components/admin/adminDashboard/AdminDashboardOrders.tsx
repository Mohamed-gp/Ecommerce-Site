import AdminDashboardOrderCard from "./AdminDashboardOrderCard";

const AdminDashboardOrders = () => {
  return (
    <>
      <p className="mt-6 mb-2 font-bold">Orders</p>
      <div className="flex justify-between lg:flex-row  flex-col gap-y-3">
        <AdminDashboardOrderCard />
        <AdminDashboardOrderCard />
        <AdminDashboardOrderCard />
      </div>
    </>
  );
};
export default AdminDashboardOrders;
