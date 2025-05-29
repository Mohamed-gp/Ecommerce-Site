import { useEffect, useState } from "react";
import {
  FaCheck,
  FaSpinner,
  FaTimes,
  FaSearch,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import customAxios from "../../../utils/axios/customAxios";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import defaultAvatar from "/websiteavatar.png";

interface User {
  _id: string;
  username: string;
  email: string;
  photoUrl?: string;
}

interface OrderProduct {
  product: {
    name: string;
    price: number;
    images: string[];
  };
  quantity: number;
}

interface Order {
  _id: string;
  user: User;
  products: OrderProduct[];
  totalPrice: number;
  createdAt: string;
  status: string;
  isPaid: boolean;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const AdminOrdersRight = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  const getOrders = async () => {
    try {
      setIsLoading(true);
      const { data } = await customAxios.get("/orders");
      setOrders(data.data);
      setFilteredOrders(data.data);
    } catch (error: unknown) {
      console.error(error);
      const apiError = error as ApiError;
      toast.error(apiError.response?.data?.message || "Error fetching orders");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredOrders(orders);
      return;
    }

    const filtered = orders.filter(
      (order) =>
        order.user?.username
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        order._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.status?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(filtered);
  }, [searchTerm, orders]);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      setUpdatingStatus(orderId);
      await customAxios.patch(`/orders/${orderId}`, { status: newStatus });
      toast.success("Order status updated successfully");
      getOrders();
    } catch (error: unknown) {
      console.error(error);
      const apiError = error as ApiError;
      toast.error(apiError.response?.data?.message || "Error updating order");
    } finally {
      setUpdatingStatus(null);
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

  const detailsVariants = {
    hidden: { height: 0, opacity: 0 },
    show: { height: "auto", opacity: 1 },
  };

  return (
    <div className="p-6 flex-1 bg-gray-50">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          Orders
        </h1>
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search orders..."
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
          className="bg-white rounded-xl shadow-sm overflow-x-auto"
        >
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <>
                  <motion.tr
                    key={order._id}
                    variants={itemVariants}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      #{order._id.slice(-6)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                          <img
                            src={order.user?.photoUrl || defaultAvatar}
                            alt={order.user?.username}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = defaultAvatar;
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {order.user?.username}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.user?.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${order.totalPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                          ${
                            order.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "processing"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.isPaid ? (
                        <span className="inline-flex items-center text-green-500">
                          <FaCheck className="mr-1" /> Paid
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-red-500">
                          <FaTimes className="mr-1" /> Unpaid
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() =>
                          setExpandedOrder(
                            expandedOrder === order._id ? null : order._id
                          )
                        }
                        className="text-gray-500 hover:text-gray-700"
                      >
                        {expandedOrder === order._id ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </button>
                    </td>
                  </motion.tr>
                  <AnimatePresence>
                    {expandedOrder === order._id && (
                      <motion.tr
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        variants={detailsVariants}
                      >
                        <td colSpan={7} className="px-6 py-4 bg-gray-50">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">
                                Order Status
                              </h4>
                              <select
                                value={order.status}
                                onChange={(e) =>
                                  updateOrderStatus(order._id, e.target.value)
                                }
                                disabled={updatingStatus === order._id}
                                className="rounded-md border-gray-200 text-sm focus:ring-mainColor focus:border-mainColor disabled:opacity-50"
                              >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                              {updatingStatus === order._id && (
                                <FaSpinner className="inline ml-2 animate-spin text-mainColor" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">
                                Products
                              </h4>
                              <div className="space-y-2">
                                {order.products.map((item, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between text-sm"
                                  >
                                    <div className="flex items-center">
                                      <div className="h-10 w-10 rounded-lg overflow-hidden bg-gray-100 mr-3">
                                        <img
                                          src={item.product.images[0]}
                                          alt={item.product.name}
                                          className="h-full w-full object-cover"
                                        />
                                      </div>
                                      <span>{item.product.name}</span>
                                    </div>
                                    <div className="text-gray-500">
                                      {item.quantity} × $
                                      {item.product.price.toFixed(2)}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </>
              ))}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No orders found</p>
            </div>
          )}
        </motion.div>
      )}

      {!isLoading && filteredOrders.length > 0 && (
        <div className="mt-6 text-center text-sm text-gray-500">
          Showing {filteredOrders.length} of {orders.length} orders
        </div>
      )}
    </div>
  );
};

export default AdminOrdersRight;
