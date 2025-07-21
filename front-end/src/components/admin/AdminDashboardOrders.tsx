import { useEffect, useState } from "react";
import customAxios from "../../utils/axios/customAxios";
import toast from "react-hot-toast";

const AdminDashboardOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    try {
      const { data } = await customAxios.get("/admin/orders");
      setOrders(data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-mainColor"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
      <div className="space-y-4">
        {orders.slice(0, 5).map((order: any) => (
          <div
            key={order._id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div>
              <p className="font-medium">Order #{order._id.slice(-6)}</p>
              <p className="text-sm text-gray-500">{order.user?.email}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">${order.total}</p>
              <span
                className={`text-sm px-2 py-1 rounded-full ${
                  order.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : order.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardOrders;
