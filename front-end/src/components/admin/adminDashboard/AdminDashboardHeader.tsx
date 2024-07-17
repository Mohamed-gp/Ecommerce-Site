import { useSelector } from "react-redux";
import { IRootState } from "../../../redux/store";

const AdminDashboardHeader = () => {
  const { user } = useSelector((state: IRootState) => state.auth);
  return (
    
      <div className="flex lg:flex-row flex-col lg:items-center items-center  justify-between ">
        <p>
          Hello, <span className="font-bold text-sm lg:text-xl">{user.username}</span>
        </p>
        <div className="div flex items-center gap-1">
          <div className="img flex justify-center items-center">
            <img src={user.photoUrl} className="w-8 h-8 lg:w-10 lg:h-10 rounded-full fit-cover" alt="" />
          </div>
          {/* <p className="text-sm">{user.username}</p> */}

        </div>
      </div>
  );
};
export default AdminDashboardHeader;
