import { Link, NavLink } from "react-router-dom";
import AdminSideBarLink from "./AdminSideBarLink";
import AdminLogoutButton from "./AdminLogoutButton";
import { MdDashboard } from "react-icons/md";
import { HiArchiveBox } from "react-icons/hi2";
import { FaLinesLeaning } from "react-icons/fa6";
import { FaBasketShopping } from "react-icons/fa6";
import { FaUsersGear } from "react-icons/fa6";
import { FaGear } from "react-icons/fa6";
const AdminSideBar = () => {
  return (
    <nav
      style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
      className={
        "text-gray-500 p-2 lg:pl-6 lg:py-8  lg:w-[300px] min-h-screen flex flex-col gap-2 text-lg bg-white "
      }
    >
      <p className="text-xl text-center lg:block hidden">SwiftBuy</p>
      <AdminSideBarLink link="dashboard" icon={<MdDashboard />} />
      <AdminSideBarLink link="products" icon={<HiArchiveBox />} />
      <AdminSideBarLink link="categories" icon={<FaLinesLeaning />} />
      <AdminSideBarLink link="orders" icon={<FaBasketShopping />} />
      <AdminSideBarLink link="admins" icon={<FaUsersGear />} />
      <AdminSideBarLink link="settings" icon={<FaGear />} />
      <AdminLogoutButton />
    </nav>
  );
};
export default AdminSideBar;
