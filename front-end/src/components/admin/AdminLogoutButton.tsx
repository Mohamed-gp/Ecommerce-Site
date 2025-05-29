import React from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/slices/authSlice";
import customAxios from "../../utils/axios/customAxios";
import { toast } from "react-hot-toast";

interface AdminLogoutButtonProps {
  expanded: boolean;
}

const AdminLogoutButton: React.FC<AdminLogoutButtonProps> = ({ expanded }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const { data } = await customAxios.post("/auth/logout");

      // Clear user data and redirect
      dispatch(authActions.logout());
      localStorage.removeItem("user");
      toast.success(data.message || "Logged out successfully");
      navigate("/login");
    } catch (error: any) {
      console.error("Logout failed:", error);
      // Even if logout fails on server, clear local data
      dispatch(authActions.logout());
      localStorage.removeItem("user");
      toast.error(error.response?.data?.message || "Logout failed");
      navigate("/login");
    }
  };

  // Animation variants for text
  const textVariants = {
    expanded: {
      opacity: 1,
      display: "block",
      transition: {
        delay: 0.1,
        duration: 0.2,
      },
    },
    collapsed: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

  return (
    <button
      onClick={handleLogout}
      className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-colors hover:bg-red-50 text-red-600 ${
        expanded ? "" : "justify-center"
      }`}
    >
      <div className="text-xl min-w-[24px]">
        <FiLogOut />
      </div>

      <motion.span
        variants={textVariants}
        animate={expanded ? "expanded" : "collapsed"}
        className="font-medium text-sm ml-3"
      >
        Logout
      </motion.span>
    </button>
  );
};

export default AdminLogoutButton;
