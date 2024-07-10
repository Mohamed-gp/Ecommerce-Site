import { useDispatch } from "react-redux";
import { authActions } from "../../redux/slices/authSlice";
import customAxios from "../../utils/axios/customAxios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminLogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const { data } = await customAxios.post("/auth/logout");
      dispatch(authActions.logout(null));
      navigate("/");
      toast.success(data.message);
    } catch (error: any) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
  return (
    <button
      onClick={() => logoutHandler()}
      className="flex items-center admin-logout-button p-1 lg:p-2 justify-center lg:justify-normal rounded-xl lg:rounded-l-lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        width={20}
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
        />
      </svg>
      <span className="hidden lg:inline">Logout</span>
    </button>
  );
};
export default AdminLogoutButton;
