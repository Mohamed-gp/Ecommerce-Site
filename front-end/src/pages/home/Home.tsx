import { useEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import Features from "../../components/Hero/Features";
import NewArrivals from "../../components/arrivals/NewArrivals";
import CategoryProductLine from "../../components/categoryProductLine/CategoryProductLine";
import StoreProducts from "../../components/store/StoreProducts";
import ContactForm from "../../components/contactUs/ContactForm";
import customAxios from "../../utils/axios/customAxios";
import { FaArrowRight, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

interface Category {
  _id: string;
  name: string;
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  const getAllCategories = async () => {
    try {
      setIsLoading(true);
      const { data } = await customAxios.get("/categories");
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllCategories();
    setTimeout(() => {
      setFadeIn(true);
    }, 100);
  }, []);

  return (
    <div
      className={`transition-opacity duration-500 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <section>
        <Hero />
      </section>

      <div className="bg-bgColorWhite">
        <Features />

        <NewArrivals />

        <StoreProducts />

        {isLoading ? (
          <div className="container flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mainColor"></div>
          </div>
        ) : (
          <div className="py-8">
            {categories?.map((category) => (
              <CategoryProductLine
                category={category}
                key={`home-${category._id}`}
              />
            ))}
          </div>
        )}

        {/* Contact Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto py-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Have questions, feedback, or need support? We'd love to hear from
              you. Send us a message and we'll get back to you as soon as
              possible.
            </p>
          </div>
          <ContactForm />
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto py-16"
        >
          <div className="bg-gradient-to-b from-mainColor/5 to-transparent rounded-2xl p-12">
            <div className="text-center max-w-2xl mx-auto">
              <div className="bg-mainColor/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaEnvelope className="text-mainColor text-2xl" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
              <p className="text-gray-600 mb-8 text-lg">
                Subscribe to receive updates on new products and special offers
              </p>
              <form className="flex max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow rounded-l-full px-6 py-3 border-2 border-mainColor focus:outline-none focus:ring-2 focus:ring-mainColor/20 transition-shadow"
                />
                <button
                  type="submit"
                  className="bg-mainColor text-white px-8 py-3 rounded-r-full hover:bg-[#00aae6] transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
                >
                  Subscribe
                  <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
