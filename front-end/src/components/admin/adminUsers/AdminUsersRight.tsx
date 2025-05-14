import { useEffect, useState } from "react";
import {
  FaSpinner,
  FaSearch,
  FaUserCog,
  FaBan,
  FaUserShield,
} from "react-icons/fa";
import customAxios from "../../../utils/axios/customAxios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  photoUrl: string;
  isBlocked: boolean;
  createdAt: string;
}

const AdminUsersRight = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const { data } = await customAxios.get("/users");
      setUsers(data.data);
      setFilteredUsers(data.data);
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error fetching users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const toggleUserBlock = async (userId: string, currentStatus: boolean) => {
    try {
      await customAxios.patch(`/users/${userId}/toggle-block`);
      toast.success(
        `User ${currentStatus ? "unblocked" : "blocked"} successfully`
      );
      getUsers();
    } catch (error: any) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Error updating user status"
      );
    }
  };

  const promoteToAdmin = async (userId: string) => {
    try {
      const result = await Swal.fire({
        title: "Promote to Admin?",
        text: "This will give the user administrative privileges",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#00C2FF",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, promote!",
      });

      if (result.isConfirmed) {
        await customAxios.patch(`/users/${userId}/promote`);
        toast.success("User promoted to admin successfully");
        getUsers();
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error promoting user");
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
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Users</h1>
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search users..."
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredUsers.map((user) => (
            <motion.div
              key={user._id}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                    <img
                      src={user.photoUrl || "/default-avatar.png"}
                      alt={user.username}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.username}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                  <div className="inline-flex items-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                        ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : user.isBlocked
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                    >
                      {user.role === "admin"
                        ? "Admin"
                        : user.isBlocked
                        ? "Blocked"
                        : "Active"}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex justify-between gap-2">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => promoteToAdmin(user._id)}
                      className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-mainColor text-sm font-medium rounded-md text-mainColor hover:bg-mainColor hover:text-white transition-colors"
                    >
                      <FaUserShield className="mr-2" />
                      Make Admin
                    </button>
                  )}

                  <button
                    onClick={() => toggleUserBlock(user._id, user.isBlocked)}
                    className={`flex-1 inline-flex items-center justify-center px-3 py-2 border text-sm font-medium rounded-md transition-colors ${
                      user.isBlocked
                        ? "border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                        : "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    }`}
                  >
                    {user.isBlocked ? (
                      <>
                        <FaUserCog className="mr-2" />
                        Unblock
                      </>
                    ) : (
                      <>
                        <FaBan className="mr-2" />
                        Block
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-4 text-xs text-gray-500">
                  Member since: {new Date(user.createdAt).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {filteredUsers.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-500">No users found</p>
        </div>
      )}

      {!isLoading && filteredUsers.length > 0 && (
        <div className="mt-6 text-center text-sm text-gray-500">
          Showing {filteredUsers.length} of {users.length} users
        </div>
      )}
    </div>
  );
};

export default AdminUsersRight;
