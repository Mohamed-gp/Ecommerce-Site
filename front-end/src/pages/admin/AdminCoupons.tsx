import AdminSideBar from "../../components/admin/AdminSideBar";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import AdminCouponsRight from "../../components/admin/adminCoupons/AdminCouponsRight";

export default function AdminCoupons() {
  const { user } = useSelector((state: IRootState) => state.auth);
  return (
    <div className="flex min-h-screen">
      <AdminSideBar />
      <AdminCouponsRight />
    </div>
  );
}
