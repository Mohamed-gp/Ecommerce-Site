import AdminSideBar from "../../components/admin/AdminSideBar";
import AdminUsersRight from "../../components/admin/adminUsers/AdminUsersRight";

export default function AdminUsers() {
  return (
    <div className="flex min-h-screen">
      <AdminSideBar />
      <AdminUsersRight />
    </div>
  );
}
