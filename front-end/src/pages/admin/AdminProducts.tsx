import AdminSideBar from "../../components/admin/AdminSideBar";
import AdminProductsRight from "../../components/admin/adminProducts/AdminProductsRight";

export default function AdminProducts() {
  return (
    <div className="flex min-h-screen">
      <AdminSideBar />
      <AdminProductsRight />
    </div>
  );
}
