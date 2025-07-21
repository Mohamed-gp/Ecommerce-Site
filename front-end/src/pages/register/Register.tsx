import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaEyeSlash, FaEye, FaUser, FaEnvelope, FaLock } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import customAxios from "../../utils/axios/customAxios";
import GoogleSignInButton from "../../components/oauth/GoogleSignInButton";
import { authActions } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

export default function Register() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setformData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isHiddenPassword, setisHiddenPassword] = useState(true);
  const submitHandler = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    const { username, email, password } = formData;
    if (email.trim() == "") {
      setLoading(false);
      return toast.error("Email is required");
    }
    if (username.trim() == "") {
      setLoading(false);
      return toast.error("Username is required");
    }
    if (password.trim() == "") {
      setLoading(false);
      return toast.error("Password is required");
    }
    try {
      const { data } = await customAxios.post("/auth/register", formData, {
        withCredentials: true,
      });
      dispatch(authActions.login(data.data));
      toast.success(data.message);
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="flex items-center justify-center">
        {/* Form side */}
        <div
          style={{
            minHeight: "calc(100vh - 70.94px)",
          }}
          className="flex h-full w-full flex-col justify-center px-6 py-10 md:w-1/2 max-w-md mx-auto"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Create Account
            </h1>
            <p className="text-gray-500">
              Join SwiftBuy and start shopping with ease
            </p>
          </div>

          <GoogleSignInButton />

          <div className="relative my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm font-medium">
              or register with email
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <form className="space-y-4" onSubmit={submitHandler}>
            {/* Username field */}
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaUser />
                </div>
                <input
                  value={formData.username}
                  onChange={(e) => {
                    setformData({ ...formData, username: e.target.value });
                  }}
                  type="text"
                  id="username"
                  className="block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-mainColor/20 focus:border-mainColor focus:outline-none transition"
                  placeholder="johndoe"
                />
              </div>
            </div>

            {/* Email field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaEnvelope />
                </div>
                <input
                  value={formData.email}
                  onChange={(e) => {
                    setformData({ ...formData, email: e.target.value });
                  }}
                  type="email"
                  id="email"
                  className="block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-mainColor/20 focus:border-mainColor focus:outline-none transition"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
              </div>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaLock />
                </div>
                <input
                  type={isHiddenPassword ? "password" : "text"}
                  id="password"
                  value={formData.password}
                  onChange={(e) => {
                    setformData({ ...formData, password: e.target.value });
                  }}
                  className="block w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-mainColor/20 focus:border-mainColor focus:outline-none transition"
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer">
                  {isHiddenPassword ? (
                    <FaEyeSlash onClick={() => setisHiddenPassword(false)} />
                  ) : (
                    <FaEye onClick={() => setisHiddenPassword(true)} />
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Use 8 or more characters with a mix of letters, numbers &
                symbols
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 rounded-lg bg-mainColor py-3 text-white font-medium transition hover:bg-mainColor/90 focus:outline-none focus:ring-2 focus:ring-mainColor/50 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-mainColor font-medium hover:text-mainColor/80 transition"
              >
                Sign in
              </Link>
            </p>
          </div>

          <p className="mt-4 text-xs text-center text-gray-500">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-mainColor">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-mainColor">
              Privacy Policy
            </a>
            .
          </p>
        </div>

        {/* Image side */}
        <div
          className="hidden h-full w-1/2 md:block relative"
          style={{
            minHeight: "calc(100vh - 70.94px)",
            backgroundImage: `url(https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-mainColor/30"></div>

          {/* Feature highlights */}
          <div className="absolute top-1/4 left-12 right-12 bg-white/90 p-6 rounded-xl shadow-lg backdrop-blur-sm">
            <h3 className="text-xl font-bold text-mainColor mb-4">
              Why Join SwiftBuy?
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg
                  className="h-5 w-5 text-mainColor mr-2 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>Exclusive deals and discounts for members</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-5 w-5 text-mainColor mr-2 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>Track your orders and purchase history</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-5 w-5 text-mainColor mr-2 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>Save your favorite items to wishlist</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-5 w-5 text-mainColor mr-2 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>Lightning-fast checkout experience</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
