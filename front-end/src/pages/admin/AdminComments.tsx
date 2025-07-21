import AdminSideBar from "../../components/admin/AdminSideBar";
import AdminCommentsRight from "../../components/admin/adminComments/AdminComments";

const AdminCommentsPage = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSideBar />
      <AdminCommentsRight />
    </div>
  );
};

export default AdminCommentsPage;
