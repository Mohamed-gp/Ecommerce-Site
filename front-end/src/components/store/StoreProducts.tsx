import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import customAxios from "../../utils/axios/customAxios";
import { FaArrowRight, FaStore } from "react-icons/fa";
import { motion } from "framer-motion";
import { Product } from "../../interfaces/dbInterfaces";

export default function StoreProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const { data } = await customAxios.get("/products");
      setProducts(data.data.slice(0, 4));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setTimeout(() => setFadeIn(true), 100);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className={`py-8 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
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
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white rounded-lg shadow-md p-4 transition-shadow hover:shadow-lg">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-48 object-contain mb-4"
                  />
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="text-mainColor font-bold">
                      $
                      {(
                        product.price *
                        (1 - (product.promoPercentage || 0) / 100)
                      ).toFixed(2)}
                    </div>
                    {product.promoPercentage > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                        {product.promoPercentage}% OFF
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
