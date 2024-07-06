import { FaBagShopping } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import AdminSideBar from "../../components/admin/AdminSideBar";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import AdminDashBoardRight from "../../components/admin/adminDashboard/AdminDashBoardRight";

export default function   AdminDashboard() {
  const { user } = useSelector((state: IRootState) => state.auth);
  return (
    <div className="flex min-h-screen">
      <AdminSideBar />
      <AdminDashBoardRight/>
    </div>
  );
}

{
  /* <a href="https://aadl3inscription2024.dz" target="_blank">here adl</a> */
}
