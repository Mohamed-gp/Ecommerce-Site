import { useEffect, useState } from "react";
import { FaEdit, FaSearch, FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import customAxios from "../../../utils/axios/customAxios";
import toast from "react-hot-toast";
import { Product } from "../../../interfaces/dbInterfaces";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const AdminProductsRight = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const getAllProducts = async () => {
    try {
      setIsLoading(true);
      const { data } = await customAxios.get("/products");
      setProducts(data.data);
      setFilteredProducts(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
      return;
    }

    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(results);
  }, [searchTerm, products]);

  const deleteHandler = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00c2ff",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await customAxios.delete(`/products/${id}`);
          getAllProducts();
          toast.success(data.message);
        } catch (error) {
          console.log(error);
          toast.error(error.response.data.message);
        }
      }
    });
  };

  // Animation variants
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
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>

        <div className="flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
          <div className="relative flex-grow md:w-64">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 px-4 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mainColor/30 focus:border-mainColor"
            />
            <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <Link
            to="/admin/products/add"
            className="bg-mainColor text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors whitespace-nowrap"
          >
            <FaPlus size={14} />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mainColor"></div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaSearch className="text-gray-400 text-xl" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            No products found
          </h2>
          <p className="text-gray-500 mb-6">
            {searchTerm
              ? "Try adjusting your search term."
              : "Start by adding your first product."}
          </p>
          <Link
            to="/admin/products/add"
            className="inline-flex items-center px-4 py-2 bg-mainColor text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FaPlus className="mr-2" size={14} /> Add New Product
          </Link>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={`product-${product._id}`}
              variants={itemVariants}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-video bg-gray-100 overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-1">
                  {product.name}
                </h3>

                <div className="flex justify-between items-center mb-3">
                  <div>
                    <span className="text-mainColor font-bold">
                      $
                      {(
                        product.price *
                        (1 - product.promoPercentage / 100)
                      ).toFixed(2)}
                    </span>
                    {product.promoPercentage > 0 && (
                      <span className="text-gray-400 text-sm line-through ml-2">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {product.isFeatured && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                      Featured
                    </span>
                  )}
                </div>

                <div className="text-xs text-gray-500 mb-4">
                  Category:{" "}
                  <span className="font-medium">
                    {product.category?.name || "Unknown"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <Link
                    to={`/admin/products/edit/${product._id}`}
                    className="inline-flex items-center text-xs text-gray-600 hover:text-mainColor"
                  >
                    <FaEdit className="mr-1" /> Edit
                  </Link>

                  <button
                    onClick={() => deleteHandler(product._id)}
                    className="inline-flex items-center text-xs text-red-500 hover:text-red-700"
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {!isLoading && filteredProducts.length > 0 && (
        <div className="mt-6 text-center text-sm text-gray-500">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      )}
    </div>
  );
};

export default AdminProductsRight;
