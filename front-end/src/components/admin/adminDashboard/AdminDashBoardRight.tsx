import { useSelector } from "react-redux";
import { IRootState } from "../../../redux/store";
import AdminDashboardHeader from "./AdminDashboardHeader";
import AdminDashboardOrders from "./AdminDashboardOrders";
import AdminDashBoardRevenue from "./AdminDashBoardRevenue";
import AdminCount from "./AdminCount";

const AdminDashBoardRight = () => {
  const { user } = useSelector((state: IRootState) => state.auth);
  return (
    <div className="p-6 flex-1">
      <AdminDashboardHeader />
      <AdminCount />
      {/* <AdminDashboardOrders /> */}
      {/* <AdminDashBoardRevenue /> */}
    </div>
  );
};
export default AdminDashBoardRight;
