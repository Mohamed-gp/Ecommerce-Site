import AdminSideBar from "../../components/admin/AdminSideBar";
import AdminCategoriesRight from "../../components/admin/adminCategories/AdminCategoriesRight";

const AdminAdmins = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSideBar />
      <AdminCategoriesRight />
    </div>
  );
};
export default AdminAdmins;
