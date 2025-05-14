import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IRootState } from "../../../redux/store";
import { FaBell, FaCog, FaRegEnvelope } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import customAxios from "../../../utils/axios/customAxios";

const AdminDashboardHeader = () => {
  const { user } = useSelector((state: IRootState) => state.auth);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Mock notifications - in a real app, these would come from your backend
  const notifications = [
    { id: 1, text: "New order received", time: "5 minutes ago", isNew: true },
    { id: 2, text: "Product stock low", time: "1 hour ago", isNew: true },
    { id: 3, text: "New user registered", time: "2 hours ago", isNew: false },
  ];

  // Get unread messages count
  const getUnreadMessagesCount = async () => {
    try {
      const { data } = await customAxios.get("/messages/unread/count");
      setUnreadMessages(data.data);
    } catch (error) {
      console.error("Error fetching unread messages:", error);
    }
  };

  useEffect(() => {
    getUnreadMessagesCount();

    // Poll for new messages every minute
    const interval = setInterval(getUnreadMessagesCount, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white shadow-sm rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            Welcome back,{" "}
            <span className="text-mainColor">{user.username}</span>
          </h1>
          <p className="text-sm text-gray-500">
            Here's what's happening with your store today.
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-400 hover:text-mainColor transition-colors"
            >
              <FaBell className="text-xl" />
              {notifications.some((n) => n.isNew) && (
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg py-2 z-50"
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-800">
                      Notifications
                    </h3>
                  </div>

                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <p className="text-sm text-gray-800">
                          {notification.text}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.time}
                        </p>
                        {notification.isNew && (
                          <span className="inline-block px-2 py-0.5 text-xs bg-mainColor/10 text-mainColor rounded-full mt-1">
                            New
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="px-4 py-2 border-t border-gray-100">
                    <Link
                      to="/admin/notifications"
                      className="text-xs text-mainColor hover:underline"
                    >
                      View all notifications
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Messages */}
          <button
            onClick={() => navigate("/admin/messages")}
            className="relative p-2 text-gray-400 hover:text-mainColor transition-colors"
          >
            <FaRegEnvelope className="text-xl" />
            {unreadMessages > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-mainColor text-white rounded-full">
                {unreadMessages}
              </span>
            )}
          </button>

          {/* Settings */}
          <Link
            to="/admin/settings"
            className="p-2 text-gray-400 hover:text-mainColor transition-colors"
          >
            <FaCog className="text-xl" />
          </Link>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-3 focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
                <img
                  src={user.photoUrl || "/default-avatar.png"}
                  alt={user.username}
                  className="w-full h-full object-cover"
                />
              </div>
            </button>

            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50"
                >
                  <Link
                    to="/admin/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Settings
                  </Link>
                  <Link
                    to="/admin/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Profile
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={() => {
                      // Add logout handler
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors"
                  >
                    Sign out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHeader;
