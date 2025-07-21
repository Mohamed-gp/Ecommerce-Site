import { useEffect, useState } from "react";
import { FaSpinner, FaArrowRight, FaStar } from "react-icons/fa";
import customAxios from "../../utils/axios/customAxios";
import Product from "../product/Product";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Product as ProductType } from "../../interfaces/dbInterfaces";

export default function NewArrivals() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  const getNewArrivals = async () => {
    try {
      const { data } = await customAxios.get("/products/new-arrivals");
      setProducts(data.data);
    } catch (error) {
      toast.error("Failed to load new arrivals");
    } finally {
      setIsLoading(false);
      setTimeout(() => setFadeIn(true), 100);
    }
  };

  useEffect(() => {
    getNewArrivals();
  }, []);

  return (
    <section
      className={`py-16 bg-gradient-to-b from-white to-mainColor/5 transition-opacity duration-500 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between mb-12"
        >
          <div className="flex items-center mb-6 md:mb-0">
            <div className="mr-4 bg-mainColor/10 p-3 rounded-xl">
              <FaStar className="text-mainColor text-2xl" />
            </div>
            <div>
              <h2 className="text-3xl font-bold leading-tight">New Arrivals</h2>
              <p className="text-gray-600 mt-1">
                Check out our latest products
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Link
              to="/store"
              className="group bg-mainColor/10 hover:bg-mainColor text-mainColor hover:text-white px-6 py-2 rounded-full inline-flex items-center transition-all duration-300"
            >
              View All{" "}
              <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="flex flex-col items-center">
              <FaSpinner className="animate-spin text-mainColor text-3xl mb-2" />
              <p className="text-gray-500">Loading new arrivals...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={`new-arrival-${product._id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Product product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
