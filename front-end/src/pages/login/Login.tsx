import customAxios from "../../utils/axios/customAxios";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FaEyeSlash,
  FaEye,
  FaLock,
  FaEnvelope,
  FaUser,
  FaUserShield,
} from "react-icons/fa6";
import { toast } from "react-hot-toast";
import GoogleSignIn from "../../components/oauth/GoogleSignInButton";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/slices/authSlice";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const [isHiddenPassword, setisHiddenPassword] = useState(true);

  const loginHandler = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    const { email, password } = formData;
    if (email.trim() == "") {
      setLoading(false);
      return toast.error("Email shouldn't be empty");
    }
    if (password.trim() == "") {
      setLoading(false);
      return toast.error("Password shouldn't be empty");
    }
    try {
      const { data } = await customAxios.post("/auth/login", formData);
      dispatch(authActions.login(data.data));
      toast.success(data.message);
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
    setLoading(false);
  };

  // Auto-fill demo account credentials
  const fillDemoCredentials = (type: "user" | "admin") => {
    if (type === "user") {
      setformData({
        email: "user@demo.com",
        password: "user@demo.com",
      });
    } else if (type === "admin") {
      setformData({
        email: "admin@admin.com",
        password: "admin@admin.com",
      });
    }
    toast.success(
      `${
        type === "admin" ? "Admin" : "User"
      } demo credentials filled. Click Sign in to continue.`
    );
  };

  return (
    <>
      <div className="flex items-center justify-center">
        {/* Left side - Image */}
        <div
          className="hidden h-full w-1/2 md:block relative"
          style={{
            minHeight: "calc(100vh - 70.94px)",
            backgroundImage: `url(https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTd8fHxlbnwwfHx8fHw%3D.jpg)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-mainColor/30 to-blue-500/30"></div>

          {/* Testimonial card */}
          <div className="absolute bottom-12 left-12 right-12 bg-white/90 p-6 rounded-xl shadow-lg backdrop-blur-sm">
            <p className="text-gray-700 italic">
              "SwiftBuy transformed my shopping experience. The interface is
              intuitive and the products are top-notch!"
            </p>
            <div className="mt-4 flex items-center">
              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold text-mainColor">
                J
              </div>
              <div className="ml-3">
                <p className="font-semibold text-mainColor">Jane Cooper</p>
                <p className="text-xs text-gray-500">Happy Customer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div
          style={{
            minHeight: "calc(100vh - 70.94px)",
          }}
          className="flex h-full w-full flex-col justify-center px-6 py-10 md:w-1/2 max-w-md mx-auto"
        >
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-500">
              Sign in to your account to continue shopping
            </p>
          </div>

          {/* Demo Accounts Section */}
          <div className="mb-6 bg-gradient-to-r from-mainColor/5 to-blue-500/5 rounded-xl p-5 border border-mainColor/10">
            <div className="text-center mb-3">
              <h3 className="text-lg font-semibold text-mainColor">
                🎯 Try Demo Accounts
              </h3>
              <p className="text-sm text-gray-500">
                Click any account to auto-fill credentials
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Admin Demo Account */}
              <button
                onClick={() => fillDemoCredentials("admin")}
                className="flex flex-col items-center justify-center p-3 rounded-lg bg-white hover:bg-mainColor/5 border border-gray-200 transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-mainColor mb-2">
                  <FaUserShield size={18} />
                </div>
                <p className="font-medium text-gray-800">Admin</p>
                <p className="text-xs text-gray-500 mt-1">admin@admin.com</p>
              </button>

              {/* User Demo Account */}
              <button
                onClick={() => fillDemoCredentials("user")}
                className="flex flex-col items-center justify-center p-3 rounded-lg bg-white hover:bg-mainColor/5 border border-gray-200 transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-mainColor mb-2">
                  <FaUser size={16} />
                </div>
                <p className="font-medium text-gray-800">User</p>
                <p className="text-xs text-gray-500 mt-1">user@demo.com</p>
              </button>
            </div>
          </div>

          <GoogleSignIn />

          <div className="relative my-5 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm font-medium">
              or continue with email
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <form className="space-y-5" onSubmit={loginHandler}>
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
                <a
                  href="#"
                  className="text-sm text-mainColor hover:text-mainColor/80 transition"
                >
                  Forgot password?
                </a>
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
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-mainColor py-3 text-white font-medium transition hover:bg-mainColor/90 focus:outline-none focus:ring-2 focus:ring-mainColor/50 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
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
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-mainColor font-medium hover:text-mainColor/80 transition"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
