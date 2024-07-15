import AdminSideBar from "../../components/admin/AdminSideBar";
import AdminProductsEditRight from "../../components/admin/adminProducts/AdminProductsEditRight";

const AdminProductsEdit = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSideBar />
      <AdminProductsEditRight />
    </div>
  );
};
export default AdminProductsEdit;
