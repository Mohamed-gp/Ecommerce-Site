import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import customAxios from "../../utils/axios/customAxios";
import { FaArrowRight, FaStore } from "react-icons/fa";
import { motion } from "framer-motion";
import { Product } from "../../interfaces/dbInterfaces";
import ProductComp from "../product/Product";
import toast from "react-hot-toast";

export default function StoreProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  const getProducts = async () => {
    try {
      const { data } = await customAxios.get("/products");
      setProducts(data.data);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setIsLoading(false);
      setTimeout(() => setFadeIn(true), 100);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section
      className={`py-8 transition-opacity duration-500 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="mr-4 bg-mainColor/10 p-3 rounded-xl">
              <FaStore className="text-mainColor text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold leading-tight">
                Featured Products
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Hand-picked products just for you
              </p>
            </div>
          </div>
          <Link
            to="/store"
            className="inline-flex items-center gap-2 text-mainColor hover:text-[#00aae6] transition-colors"
          >
            View All
            <FaArrowRight className="text-sm" />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mainColor"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm">
            <p className="text-gray-500">No featured products available yet.</p>
            <Link
              to="/store"
              className="text-mainColor hover:underline inline-block mt-2"
            >
              Browse our full catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductComp product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
