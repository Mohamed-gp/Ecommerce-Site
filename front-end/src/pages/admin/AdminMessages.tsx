import AdminSideBar from "../../components/admin/AdminSideBar";
import AdminMessagesRight from "../../components/admin/adminMessages/AdminMessagesRight";

const AdminMessages = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSideBar />
      <AdminMessagesRight />
    </div>
  );
};

export default AdminMessages;
