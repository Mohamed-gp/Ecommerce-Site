import { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiHome,
  FiUsers,
  FiShoppingBag,
  FiGrid,
  FiBarChart2,
  FiSettings,
  FiMessageSquare,
  FiChevronLeft,
  FiMail,
  FiTag,
} from "react-icons/fi";
import AdminSideBarLink from "./AdminSideBarLink";
import AdminLogoutButton from "./AdminLogoutButton";

const AdminSideBar: React.FC = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);

  const navLinks = [
    { to: "/admin/dashboard", icon: <FiHome />, text: "Dashboard" },
    { to: "/admin/products", icon: <FiShoppingBag />, text: "Products" },
    { to: "/admin/categories", icon: <FiGrid />, text: "Categories" },
    { to: "/admin/coupons", icon: <FiTag />, text: "Coupons" },
    { to: "/admin/users", icon: <FiUsers />, text: "Users" },
    { to: "/admin/orders", icon: <FiBarChart2 />, text: "Orders" },
    { to: "/admin/messages", icon: <FiMail />, text: "Messages" },
    { to: "/admin/comments", icon: <FiMessageSquare />, text: "Comments" },
    { to: "/admin/settings", icon: <FiSettings />, text: "Settings" },
  ];

  // Animation variants
  const sidebarVariants = {
    expanded: {
      width: "240px",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    collapsed: {
      width: "70px",
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <motion.div
      variants={sidebarVariants}
      animate={expanded ? "expanded" : "collapsed"}
      className="bg-white h-screen shadow-sm border-r border-gray-200 relative z-10 flex flex-col"
    >
      {/* Logo and Toggle Button Container */}
      <div className="flex items-center p-4">
        {expanded ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center"
          >
            <div className="w-8 h-8 bg-mainColor rounded-md flex items-center justify-center text-white font-bold mr-2">
              EC
            </div>
            <h1 className="text-lg font-bold text-gray-800">AdminPanel</h1>
          </motion.div>
        ) : (
          <div className="w-8 h-8 bg-mainColor rounded-md flex items-center justify-center text-white font-bold mx-auto">
            EC
          </div>
        )}

        <button
          onClick={toggleSidebar}
          className={`absolute -right-3 top-7 bg-white border border-gray-200 rounded-full p-1 shadow-sm ${
            expanded ? "transform rotate-0" : "transform rotate-180"
          } transition-transform`}
        >
          <FiChevronLeft className="text-gray-600" size={16} />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className={`mt-3 ${expanded ? "mb-4" : "mb-6"}`}>
          {expanded && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-gray-500 font-medium uppercase tracking-wider px-3 mb-2"
            >
              Main Menu
            </motion.p>
          )}

          {navLinks.map((link) => (
            <AdminSideBarLink
              key={link.to}
              to={link.to}
              icon={link.icon}
              text={link.text}
              active={location.pathname === link.to}
              expanded={expanded}
            />
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-3 border-t border-gray-200">
        <AdminLogoutButton expanded={expanded} />
      </div>
    </motion.div>
  );
};

export default AdminSideBar;
