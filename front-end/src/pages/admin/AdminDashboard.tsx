import AdminSideBar from "../../components/admin/AdminSideBar";
import AdminDashBoardRight from "../../components/admin/adminDashboard/AdminDashBoardRight";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen">
      <AdminSideBar />
      <AdminDashBoardRight />
    </div>
  );
}
