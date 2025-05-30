import { useEffect, useState } from "react";
import {
  FaEdit,
  FaSearch,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
  FaExclamationTriangle,
} from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import customAxios from "../../../utils/axios/customAxios";
import toast from "react-hot-toast";
import { Product } from "../../../interfaces/dbInterfaces";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { IRootState } from "../../../redux/store";

const AdminProductsRight = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<{
    [key: string]: number;
  }>({});

  const user = useSelector((state: IRootState) => state.auth.user);
  const isDemoAdmin = user?.id === "66f16f6ae8f6650bf25c28d3";

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const { data } = await customAxios.get("/admin/products");
      setProducts(data.data);
      setFilteredProducts(data.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (isDemoAdmin) {
      Swal.fire({
        icon: "warning",
        title: "Demo Admin Restriction",
        text: "Delete operations are not allowed in demo mode. This is a read-only demo.",
        confirmButtonColor: "#00c2ff",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await customAxios.delete(`/admin/products/${id}`);
      toast.success("Product deleted successfully!");
      getProducts();
    } catch (error: any) {
      if (error.response?.data?.isDemo) {
        toast.error(error.response.data.message);
      } else {
        toast.error(
          error.response?.data?.message || "Failed to delete product"
        );
      }
    }
  };

  useEffect(() => {
    getProducts();
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

  const nextImage = (productId: string, totalImages: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [productId]: ((prev[productId] || 0) + 1) % totalImages,
    }));
  };

  const prevImage = (productId: string, totalImages: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [productId]: ((prev[productId] || 0) - 1 + totalImages) % totalImages,
    }));
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
      {/* Demo Admin Warning */}
      {isDemoAdmin && (
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <FaExclamationTriangle className="text-yellow-600 mr-3" />
            <div>
              <h3 className="text-yellow-800 font-semibold">Demo Admin Mode</h3>
              <p className="text-yellow-700 text-sm">
                You're logged in as a demo admin. Some operations like creating,
                editing, and deleting are restricted.
              </p>
            </div>
          </div>
        </div>
      )}

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

          {isDemoAdmin ? (
            <button
              onClick={() => {
                Swal.fire({
                  icon: "info",
                  title: "Demo Admin Restriction",
                  text: "Adding new products is not allowed in demo mode.",
                  confirmButtonColor: "#00c2ff",
                });
              }}
              className="bg-gray-400 text-white px-5 py-2 rounded-lg flex items-center gap-2 cursor-not-allowed whitespace-nowrap"
              disabled
            >
              <FaPlus size={14} />
              <span>Add Product (Demo)</span>
            </button>
          ) : (
            <Link
              to="/admin/products/add"
              className="bg-mainColor text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors whitespace-nowrap"
            >
              <FaPlus size={14} />
              <span>Add Product</span>
            </Link>
          )}
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
          {!isDemoAdmin && (
            <Link
              to="/admin/products/add"
              className="inline-flex items-center px-4 py-2 bg-mainColor text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FaPlus className="mr-2" size={14} /> Add New Product
            </Link>
          )}
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
              <div className="relative aspect-square bg-gray-50 overflow-hidden group">
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <img
                    src={product.images[currentImageIndex[product._id] || 0]}
                    alt={product.name}
                    className="w-full h-full object-contain transition-opacity duration-150"
                  />
                </div>

                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        prevImage(product._id, product.images.length)
                      }
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150 hover:bg-black/70"
                    >
                      <FaChevronLeft size={12} />
                    </button>
                    <button
                      onClick={() =>
                        nextImage(product._id, product.images.length)
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150 hover:bg-black/70"
                    >
                      <FaChevronRight size={12} />
                    </button>

                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                      {product.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            setCurrentImageIndex((prev) => ({
                              ...prev,
                              [product._id]: index,
                            }))
                          }
                          className={`w-2 h-2 rounded-full transition-colors duration-150 ${
                            index === (currentImageIndex[product._id] || 0)
                              ? "bg-mainColor"
                              : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {product.promoPercentage > 0 && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {product.promoPercentage}% OFF
                  </div>
                )}
                {product.isFeatured && (
                  <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Featured
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3
                  className="font-semibold text-gray-800 mb-2 line-clamp-2"
                  title={product.name}
                >
                  {product.name}
                </h3>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex justify-between items-center mb-3">
                  <div className="flex flex-col">
                    <span className="text-mainColor font-bold">
                      $
                      {(
                        product.price *
                        (1 - product.promoPercentage / 100)
                      ).toFixed(2)}
                    </span>
                    {product.promoPercentage > 0 && (
                      <span className="text-gray-400 text-xs line-through">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-gray-500 text-right">
                    <div>Images: {product.images.length}</div>
                    <div className="font-medium">
                      {product.category?.name || "Unknown"}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between gap-2">
                  {isDemoAdmin ? (
                    <button
                      onClick={() => {
                        Swal.fire({
                          icon: "info",
                          title: "Demo Admin Restriction",
                          text: "Editing products is not allowed in demo mode.",
                          confirmButtonColor: "#00c2ff",
                        });
                      }}
                      className="flex-1 text-center py-2 px-3 text-xs bg-gray-400 text-white rounded-lg cursor-not-allowed"
                    >
                      <FaEdit className="inline mr-1" /> Edit (Demo)
                    </button>
                  ) : (
                    <Link
                      to={`/admin/products/edit/${product._id}`}
                      className="flex-1 text-center py-2 px-3 text-xs bg-mainColor text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <FaEdit className="inline mr-1" /> Edit
                    </Link>
                  )}

                  <button
                    onClick={() => deleteProduct(product._id)}
                    className={`flex-1 py-2 px-3 text-xs rounded-lg transition-colors ${
                      isDemoAdmin
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                  >
                    <FaTrash className="inline mr-1" />
                    {isDemoAdmin ? "Delete (Demo)" : "Delete"}
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
