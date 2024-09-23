import AdminSideBar from "../../components/admin/AdminSideBar";
import AdminCategoriesRight from "../../components/admin/adminCategories/AdminCategoriesRight";

export default function AdminCategories() {
  return (
    <div className="flex min-h-screen">
      <AdminSideBar />
      <AdminCategoriesRight />
    </div>
  );
}
