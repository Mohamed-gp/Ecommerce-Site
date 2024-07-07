import AdminSideBar from "../../components/admin/AdminSideBar";
import AdminProductsAddRight from "../../components/admin/adminProducts/AdminProductsAddRight";

const AdminProductsAdd = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSideBar />
      <AdminProductsAddRight />
    </div>
  );
};
export default AdminProductsAdd;
