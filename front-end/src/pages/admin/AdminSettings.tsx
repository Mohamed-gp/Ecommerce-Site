import AdminSideBar from "../../components/admin/AdminSideBar";
import AdminSettingsRight from "../../components/admin/adminSettings/AdminSettingsRight";

const AdminSettings = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSideBar />
      <AdminSettingsRight />
    </div>
  );
};
export default AdminSettings;
