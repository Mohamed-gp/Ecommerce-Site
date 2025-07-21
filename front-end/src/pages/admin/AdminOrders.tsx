import AdminSideBar from "../../components/admin/AdminSideBar";
import AdminOrdersRight from "../../components/admin/adminOrders/AdminOrdersRight";

export default function AdminOrders() {
  return (
    <div className="flex min-h-screen">
      <AdminSideBar />
      <AdminOrdersRight />
    </div>
  );
}
