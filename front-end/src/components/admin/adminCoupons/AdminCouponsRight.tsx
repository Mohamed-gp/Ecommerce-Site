import { useEffect, useState } from "react";
import { FaTrash, FaPercent, FaPlus, FaClock } from "react-icons/fa6";
import customAxios from "../../../utils/axios/customAxios";
import toast from "react-hot-toast";
import { Coupon } from "../../../interfaces/dbInterfaces";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const AdminCouponsRight = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discount: 0,
    expiresAt: "",
  });

  const getCoupons = async () => {
    try {
      setLoading(true);
      const { data } = await customAxios.get("/coupons");
      setCoupons(data.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to fetch coupons");
    } finally {
      setLoading(false);
    }
  };

  const createCouponHandler = async () => {
    try {
      setIsSubmitting(true);

      if (!newCoupon.code || !newCoupon.discount || !newCoupon.expiresAt) {
        toast.error("Please fill all fields");
        return;
      }

      if (newCoupon.discount <= 0 || newCoupon.discount > 100) {
        toast.error("Discount must be between 1 and 100");
        return;
      }

      const { data } = await customAxios.post("/coupons", newCoupon);
      toast.success("Coupon created successfully");
      setNewCoupon({ code: "", discount: 0, expiresAt: "" });
      getCoupons();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to create coupon");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteCouponHandler = (couponId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This coupon will be permanently deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00c2ff",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await customAxios.delete(`/coupons/${couponId}`);
          toast.success("Coupon deleted successfully");
          getCoupons();
        } catch (error: any) {
          console.log(error);
          toast.error(
            error.response?.data?.message || "Failed to delete coupon"
          );
        }
      }
    });
  };

  useEffect(() => {
    getCoupons();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Manage Coupons</h1>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-sm font-medium text-mainColor bg-mainColor/10 rounded-full">
              {coupons.length} Coupons
            </span>
          </div>
        </div>

        {/* Add New Coupon */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Create New Coupon</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Coupon Code
              </label>
              <input
                type="text"
                value={newCoupon.code}
                onChange={(e) =>
                  setNewCoupon({
                    ...newCoupon,
                    code: e.target.value.toUpperCase(),
                  })
                }
                placeholder="e.g., SUMMER2025"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mainColor focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount (%)
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={newCoupon.discount || ""}
                onChange={(e) =>
                  setNewCoupon({
                    ...newCoupon,
                    discount: Number(e.target.value),
                  })
                }
                placeholder="10"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mainColor focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expires At
              </label>
              <input
                type="datetime-local"
                value={newCoupon.expiresAt}
                onChange={(e) =>
                  setNewCoupon({ ...newCoupon, expiresAt: e.target.value })
                }
                min={new Date().toISOString().slice(0, 16)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mainColor focus:border-transparent"
              />
            </div>
          </div>
          <button
            onClick={createCouponHandler}
            disabled={
              isSubmitting ||
              !newCoupon.code ||
              !newCoupon.discount ||
              !newCoupon.expiresAt
            }
            className="mt-4 w-full flex items-center justify-center gap-2 bg-mainColor text-white py-2 rounded-lg hover:bg-mainColor/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaPlus />
            {isSubmitting ? "Creating..." : "Create Coupon"}
          </button>
        </div>

        {/* Coupons List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mainColor"></div>
          </div>
        ) : coupons.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaPercent className="text-gray-400 text-xl" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No coupons found
            </h2>
            <p className="text-gray-500">
              Create your first coupon to get started!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coupons.map((coupon) => (
              <motion.div
                key={coupon._id}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-mainColor/10 rounded-full text-mainColor font-mono text-sm">
                      {coupon.code}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        new Date(coupon.expiresAt) > new Date()
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {new Date(coupon.expiresAt) > new Date()
                        ? "Active"
                        : "Expired"}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <FaPercent className="text-mainColor" />
                      <span className="text-2xl font-bold">
                        {coupon.discount}% OFF
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaClock />
                      <span>
                        Expires:{" "}
                        {new Date(coupon.expiresAt).toLocaleDateString()} at{" "}
                        {new Date(coupon.expiresAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <button
                      onClick={() => deleteCouponHandler(coupon._id)}
                      className="w-full flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 py-2 rounded-lg transition-colors"
                    >
                      <FaTrash />
                      Delete Coupon
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminCouponsRight;
