import { useState } from "react";
import toast from "react-hot-toast";
import { IRootState } from "../../redux/store";
import { useSelector } from "react-redux";
import customAxios from "../../utils/axios/customAxios";

const SubscribeToUs = () => {
  const user = useSelector((state: IRootState) => state.auth.user);
  const [email, setEmail] = useState(user?.email || "");
  const [isLoading, setIsLoading] = useState(false);

  const subscribeToUsHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await customAxios.post("/users/subscribe", {
        email,
      });
      toast.success(data.message);
      setEmail(""); // Clear the form after successful subscription
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to subscribe. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="py-20 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-mainColor rounded-2xl p-8 xl:p-11">
            <h2 className="font-manrope text-4xl text-white text-center font-bold mb-4">
              Subscribe to the latest offer
            </h2>
            <p className="text-white text-center mb-11 max-lg:max-w-2xl mx-auto">
              Join our community of subscribers and receive regular updates
              delivered straight to your inbox. It's quick, easy, and free
            </p>
            <form
              onSubmit={subscribeToUsHandler}
              className="max-w-md mx-auto lg:bg-transparent lg:border border-gray-300 rounded-3xl max-lg:py-3 lg:rounded-full lg:h-12 lg:p-1.5 lg:flex-row gap-6 lg:gap-0 flex-col flex items-center justify-between"
            >
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white py-2 px-6 rounded-full max-lg:border border-gray-300 text-black max-lg:text-center placeholder:text-gray-400 focus:outline-none flex-1 w-full lg:w-auto lg:py-2 lg:px-6"
                placeholder="Enter your email.."
                required
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !email}
                className={`disabled:opacity-50 py-2 px-5 text-sm bg-mainColor/70 shadow-md rounded-full border-white border ml-2 text-white font-semibold hover:bg-mainColor/90 transition-colors ${
                  isLoading ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                {isLoading ? "Subscribing..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
export default SubscribeToUs;
