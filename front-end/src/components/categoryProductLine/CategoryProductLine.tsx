import { useEffect, useState } from "react";
import { Product } from "../../interfaces/dbInterfaces";
import customAxios from "../../utils/axios/customAxios";
import ProductComp from "../product/Product";
import { Link } from "react-router-dom";
import { FaArrowRight, FaSpinner, FaList } from "react-icons/fa";
import { motion } from "framer-motion";

interface CategoryProductLineProps {
  category: any;
}

export default function CategoryProductLine({
  category,
}: CategoryProductLineProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  const getProductsByCategory = async () => {
    try {
      setIsLoading(true);
      const { data } = await customAxios.get(
        `products?category=${category.name}`
      );
      setProducts(data.data.slice(0, 4));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setTimeout(() => setFadeIn(true), 100);
    }
  };

  useEffect(() => {
    getProductsByCategory();
  }, []);

  return (
    <section
      className={`py-16 transition-opacity duration-500 ${
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
              <FaList className="text-mainColor text-2xl" />
            </div>
            <div>
              <h2 className="text-3xl font-bold leading-tight capitalize">
                {category?.name}
              </h2>
              <p className="text-gray-600 mt-1">
                Discover our selection of {category?.name.toLowerCase()}
              </p>
            </div>
          </div>
          <Link
            to={`/store?category=${encodeURIComponent(category?.name)}`}
            className="group bg-mainColor/10 hover:bg-mainColor text-mainColor hover:text-white px-6 py-2 rounded-full inline-flex items-center transition-all duration-300"
          >
            View All{" "}
            <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="flex flex-col items-center">
              <FaSpinner className="animate-spin text-mainColor text-3xl mb-2" />
              <p className="text-gray-500">Loading {category?.name}...</p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm">
            <p className="text-gray-500">
              No products available in this category yet.
            </p>
            <Link
              to="/store"
              className="text-mainColor hover:underline inline-block mt-2"
            >
              Browse other categories
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={`category-${category._id}-product-${product._id}`}
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
