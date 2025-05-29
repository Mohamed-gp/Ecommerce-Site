import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IRootState } from "../../../redux/store";
import { FaCog, FaRegEnvelope, FaPlus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import customAxios from "../../../utils/axios/customAxios";
import { authActions } from "../../../redux/slices/authSlice";
import { toast } from "react-hot-toast";

const AdminDashboardHeader = () => {
  const { user } = useSelector((state: IRootState) => state.auth);
  const dispatch = useDispatch();
  const [showProfile, setShowProfile] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const contactFormRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfile(false);
      }
      if (
        contactFormRef.current &&
        !contactFormRef.current.contains(event.target as Node)
      ) {
        setShowContactForm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !subject.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      await customAxios.post("/messages/send", {
        subject,
        message,
        userId: user?._id,
      });
      toast.success("Message sent successfully!");
      setMessage("");
      setSubject("");
      setShowContactForm(false);
      getUnreadMessagesCount(); // Refresh unread count
    } catch (error: unknown) {
      console.error(error);
      const errorMessage =
        error && typeof error === "object" && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : "Failed to send message";
      toast.error(errorMessage || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

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
          {/* Contact Form */}
          <div className="relative" ref={contactFormRef}>
            <button
              onClick={() => setShowContactForm(!showContactForm)}
              className="relative p-2 text-gray-400 hover:text-mainColor transition-colors"
              title="Send Message"
            >
              <FaPlus className="text-xl" />
            </button>

            <AnimatePresence>
              {showContactForm && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-lg p-6 z-50"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Send Message
                  </h3>
                  <form onSubmit={handleSubmitMessage} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mainColor focus:border-transparent"
                        placeholder="Enter message subject"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mainColor focus:border-transparent"
                        placeholder="Type your message here..."
                        required
                      ></textarea>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-mainColor text-white py-2 px-4 rounded-lg hover:bg-mainColor/90 transition-colors disabled:opacity-50"
                      >
                        {loading ? "Sending..." : "Send Message"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowContactForm(false)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
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
                    onClick={async () => {
                      try {
                        const { data } = await customAxios.post("/auth/logout");
                        dispatch(authActions.logout());
                        localStorage.removeItem("user");
                        toast.success(
                          data.message || "Logged out successfully"
                        );
                        navigate("/login");
                      } catch (error: unknown) {
                        console.error("Logout failed:", error);
                        dispatch(authActions.logout());
                        localStorage.removeItem("user");
                        const errorMessage =
                          error &&
                          typeof error === "object" &&
                          "response" in error
                            ? (
                                error as {
                                  response?: { data?: { message?: string } };
                                }
                              ).response?.data?.message
                            : "Logout failed";
                        toast.error(errorMessage || "Logout failed");
                        navigate("/login");
                      }
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
