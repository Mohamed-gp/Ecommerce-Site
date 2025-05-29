import AdminSideBar from "../../components/admin/AdminSideBar";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import AdminUsersRight from "../../components/admin/adminUsers/AdminUsersRight";

export default function AdminUsers() {
  const { user } = useSelector((state: IRootState) => state.auth);
  return (
    <div className="flex min-h-screen">
      <AdminSideBar />
      <AdminUsersRight />
    </div>
  );
}
