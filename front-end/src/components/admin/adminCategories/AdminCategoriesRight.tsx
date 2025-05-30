import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { FaTrash, FaPlus } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import customAxios from "../../../utils/axios/customAxios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { IRootState } from "../../../redux/store";
import Swal from "sweetalert2";

interface Category {
  _id: string;
  name: string;
}

const AdminCategoriesRight = () => {
  const user = useSelector((state: IRootState) => state.auth.user);
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getCategories = async () => {
    try {
      setLoading(true);
      const { data } = await customAxios.get("/categories");
      setCategories(data.data);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch categories"
      );
    } finally {
      setLoading(false);
    }
  };

  const createCategoryHandler = async () => {
    if (category.trim().length < 3) {
      toast.error("Category name must be at least 3 characters long");
      return;
    }

    try {
      setIsSubmitting(true);
      const { data } = await customAxios.post(
        "/categories",
        { name: category },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success(data.message);
      setCategory("");
      getCategories();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to create category"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteHandler = async (id: string, name: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `This will permanently delete the category "${name}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
    });

    if (result.isConfirmed) {
      try {
        const { data } = await customAxios.delete(`categories/${id}`);
        toast.success(data.message);
        getCategories();
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to delete category"
        );
      }
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="p-6 flex-1 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
          <p className="text-gray-500">Manage your product categories</p>
        </div>

        {/* Add Category Form */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex gap-4">
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter new category name"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              disabled={isSubmitting}
            />
            <button
              onClick={createCategoryHandler}
              disabled={category.trim().length < 3 || isSubmitting || loading}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <FaPlus />
                  <span>Add Category</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Categories List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              All Categories
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <FaSpinner className="animate-spin text-blue-500 text-2xl" />
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No categories found</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="divide-y divide-gray-200"
            >
              <AnimatePresence>
                {categories.map((category) => (
                  <motion.div
                    key={category._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-700">{category.name}</span>
                    <button
                      onClick={() => deleteHandler(category._id, category.name)}
                      className="flex items-center gap-2 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FaTrash />
                      <span>Delete</span>
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCategoriesRight;
