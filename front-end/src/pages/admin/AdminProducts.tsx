import AdminSideBar from "../../components/admin/AdminSideBar";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import AdminDashBoardRight from "../../components/admin/adminDashboard/AdminDashBoardRight";
import AdminProductsRight from "../../components/admin/adminProducts/AdminProductsRight";

export default function AdminProducts() {
  const { user } = useSelector((state: IRootState) => state.auth);
  return (
    <div className="flex min-h-screen">
      <AdminSideBar />
      <AdminProductsRight />
    </div>
  );
}

{
  /* <a href="https://aadl3inscription2024.dz" target="_blank">here adl</a> */
}
