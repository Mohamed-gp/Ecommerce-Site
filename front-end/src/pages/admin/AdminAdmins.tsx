import AdminAdminsRight from "../../components/admin/adminAdmins/AdminAdminsRight";
import AdminSideBar from "../../components/admin/AdminSideBar";

const AdminAdmins = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSideBar />
      <AdminAdminsRight />
    </div>
  );
};
export default AdminAdmins;
