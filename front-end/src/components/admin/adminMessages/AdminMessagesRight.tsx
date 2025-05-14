import { useEffect, useState } from "react";
import {
  FaSpinner,
  FaSearch,
  FaUser,
  FaClock,
  FaTrash,
  FaEnvelope,
} from "react-icons/fa";
import customAxios from "../../../utils/axios/customAxios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

interface Message {
  _id: string;
  subject: string;
  message: string;
  userId: {
    _id: string;
    username: string;
    email: string;
    photoUrl: string;
  };
  createdAt: string;
  read: boolean;
}

const AdminMessagesRight = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);

  const getMessages = async () => {
    try {
      setIsLoading(true);
      const { data } = await customAxios.get("/messages");
      setMessages(data.data);
      setFilteredMessages(data.data);
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error fetching messages");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredMessages(messages);
      return;
    }

    const filtered = messages.filter(
      (message) =>
        message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.userId.username
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        message.userId.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMessages(filtered);
  }, [searchTerm, messages]);

  const deleteMessage = async (messageId: string) => {
    try {
      const result = await Swal.fire({
        title: "Delete Message?",
        text: "This action cannot be undone",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#00C2FF",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await customAxios.delete(`/messages/${messageId}`);
        toast.success("Message deleted successfully");
        getMessages();
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error deleting message");
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      await customAxios.patch(`/messages/${messageId}/read`);
      getMessages();
    } catch (error: any) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Error marking message as read"
      );
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="p-6 flex-1 bg-gray-50">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          Messages
        </h1>
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mainColor/20"
          />
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <FaSpinner className="animate-spin text-mainColor text-3xl" />
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-4"
        >
          {filteredMessages.map((message) => (
            <motion.div
              key={message._id}
              variants={itemVariants}
              className={`bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow ${
                !message.read ? "border-l-4 border-mainColor" : ""
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                      <img
                        src={message.userId.photoUrl || "/default-avatar.png"}
                        alt={message.userId.username}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {message.userId.username}
                      </p>
                      <p className="text-sm text-gray-500">
                        {message.userId.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 flex items-center">
                      <FaClock className="mr-1" />
                      {new Date(message.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {message.subject}
                  </h3>
                  <p className="mt-2 text-gray-600">{message.message}</p>
                </div>

                <div className="mt-4 flex justify-end space-x-3">
                  {!message.read && (
                    <button
                      onClick={() => markAsRead(message._id)}
                      className="inline-flex items-center px-3 py-1 border border-mainColor text-sm text-mainColor rounded-md hover:bg-mainColor hover:text-white transition-colors"
                    >
                      <FaEnvelope className="mr-1" />
                      Mark as Read
                    </button>
                  )}
                  <button
                    onClick={() => deleteMessage(message._id)}
                    className="inline-flex items-center px-3 py-1 border border-red-500 text-sm text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <FaTrash className="mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {filteredMessages.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-500">No messages found</p>
        </div>
      )}

      {!isLoading && filteredMessages.length > 0 && (
        <div className="mt-6 text-center text-sm text-gray-500">
          Showing {filteredMessages.length} of {messages.length} messages
        </div>
      )}
    </div>
  );
};

export default AdminMessagesRight;
