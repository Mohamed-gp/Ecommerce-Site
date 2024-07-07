import { FaBagShopping } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import AdminSideBar from "../../components/admin/AdminSideBar";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import AdminCategoriesRight from "../../components/admin/adminCategories/AdminCategoriesRight";
// import AdminDashBoardRight from "../../components/admin/adminDashboard/AdminDashBoardRight";

export default function AdminCategories() {
  const { user } = useSelector((state: IRootState) => state.auth);
  return (
    <div className="flex min-h-screen">
      <AdminSideBar />
      <AdminCategoriesRight />
    </div>
  );
}
