import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { IRootState } from "../../redux/store";
import AdminSideBar from "../../components/admin/AdminSideBar";
import AdminProductsEditRight from "../../components/admin/adminProducts/AdminProductsEditRight";

const AdminProductsEdit = () => {
  const { user } = useSelector((state: IRootState) => state.auth);
  return (
    <div className="flex min-h-screen">
      <AdminSideBar />
      <AdminProductsEditRight />
    </div>
  );
};
export default AdminProductsEdit;
