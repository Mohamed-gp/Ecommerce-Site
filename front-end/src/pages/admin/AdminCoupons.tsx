import AdminSideBar from "../../components/admin/AdminSideBar";
import AdminCouponsRight from "../../components/admin/adminCoupons/AdminCouponsRight";

export default function AdminCoupons() {
  return (
    <div className="flex min-h-screen">
      <AdminSideBar />
      <AdminCouponsRight />
    </div>
  );
}
