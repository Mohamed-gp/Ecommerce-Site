import { useEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import Features from "../../components/Hero/Features";
import NewArrivals from "../../components/arrivals/NewArrivals";
import CategoryProductLine from "../../components/categoryProductLine/CategoryProductLine";
import StoreProducts from "../../components/store/StoreProducts";
import ContactForm from "../../components/contactUs/ContactForm";
import customAxios from "../../utils/axios/customAxios";
import { FaArrowRight, FaEnvelope, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";

interface Category {
  _id: string;
  name: string;
}

export default function Home() {
  const { user } = useSelector((state: IRootState) => state.auth);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterName, setNewsletterName] = useState("");
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);
  const [showNameField, setShowNameField] = useState(false);

  const getAllCategories = async () => {
    try {
      setIsLoading(true);
      const { data } = await customAxios.get("/categories");
      setCategories(data.data);
    } catch (error) {
      toast.error("Failed to load categories");
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

    // If no logged-in user, we'll need to collect name
    setShowNameField(!user);
  }, [user]);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    if (!newsletterEmail) {
      toast.error("Please enter your email address");
      return;
    }

    if (!user && !newsletterName) {
      toast.error("Please enter your name");
      return;
    }

    try {
      setIsSubmittingNewsletter(true);

      // Create the message payload
      const messageData = user
        ? {
            subject: "Newsletter Subscription",
            message: `${user.username} would like to subscribe to the newsletter with email: ${newsletterEmail}`,
            userId: user._id,
          }
        : {
            subject: "Newsletter Subscription",
            message: `${newsletterName} would like to subscribe to the newsletter.`,
            guestName: newsletterName,
            guestEmail: newsletterEmail,
          };

      await customAxios.post("/messages/send", messageData);

      toast.success("Thanks for subscribing to our newsletter!");
      setNewsletterEmail("");
      setNewsletterName("");
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
      console.error("Newsletter submission error:", error);
    } finally {
      setIsSubmittingNewsletter(false);
    }
  };

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
              <form
                onSubmit={handleNewsletterSubmit}
                className="max-w-md mx-auto space-y-3"
              >
                {/* Name field for guests */}
                {showNameField && (
                  <div className="flex">
                    <div className="flex-grow relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <FaUser />
                      </span>
                      <input
                        type="text"
                        value={newsletterName}
                        onChange={(e) => setNewsletterName(e.target.value)}
                        placeholder="Your name"
                        className="w-full rounded-full px-12 py-3 border-2 border-mainColor focus:outline-none focus:ring-2 focus:ring-mainColor/20 transition-shadow"
                        required={!user}
                      />
                    </div>
                  </div>
                )}

                {/* Email field */}
                <div className="flex">
                  <div className="flex-grow relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <FaEnvelope />
                    </span>
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full rounded-l-full px-12 py-3 border-2 border-mainColor focus:outline-none focus:ring-2 focus:ring-mainColor/20 transition-shadow"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmittingNewsletter}
                    className="bg-mainColor text-white px-8 py-3 rounded-r-full hover:bg-[#00aae6] transition-colors flex items-center gap-2 shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isSubmittingNewsletter ? (
                      <>
                        <span className="animate-spin inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-1"></span>
                        Subscribing...
                      </>
                    ) : (
                      <>
                        Subscribe
                        <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
