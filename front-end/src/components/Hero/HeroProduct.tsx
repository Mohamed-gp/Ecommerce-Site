import { FaCartShopping, FaArrowRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import customAxios from "../../utils/axios/customAxios";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { authActions } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface HeroProductProps {
  product: any;
}

export default function HeroProduct({ product }: HeroProductProps) {
  const { user } = useSelector((state: IRootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const addToCart = async () => {
    if (!user) {
      navigate("/register");
      return;
    }
    try {
      const { data } = await customAxios.post("/cart/add", {
        userId: user._id,
        productId: product._id,
      });
      dispatch(authActions.setCart(data.data));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container relative flex h-full w-full items-center justify-between px-4 py-16 lg:py-0">
      <div className="w-full lg:w-1/2 relative z-20 text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={animationStarted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-6"
        >
          <span className="inline-block w-fit mx-auto lg:mx-0 rounded-full bg-mainColor/20 px-4 py-1 text-sm text-mainColor backdrop-blur-sm">
            {product?.category?.name || "Featured"}
          </span>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            {product?.name}
          </h1>

          <p className="text-white/80 text-lg max-w-xl mx-auto lg:mx-0">
            {product?.description}
          </p>

          <div className="flex flex-col md:flex-row items-center gap-4 justify-center lg:justify-start">
            <div className="text-5xl font-bold text-mainColor">
              $
              {(product?.price * (1 - product?.promoPercentage / 100)).toFixed(
                2
              )}
            </div>

            {product?.promoPercentage > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-2xl text-white/50 line-through">
                  ${product?.price.toFixed(2)}
                </span>
                <span className="bg-red-500 rounded-md text-white text-sm px-3 py-1.5">
                  {product?.promoPercentage}% OFF
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-4">
            <Link
              to={`/product/${product._id}`}
              className="group relative overflow-hidden rounded-full bg-white/10 backdrop-blur-sm px-8 py-3 text-white transition-all hover:bg-white/20"
            >
              <span className="relative z-10 flex items-center gap-2 font-medium">
                View Details
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>

            <button
              onClick={addToCart}
              className="group relative overflow-hidden rounded-full bg-mainColor px-8 py-3 text-white transition-all hover:bg-[#00aae6]"
            >
              <span className="relative z-10 flex items-center gap-2 font-medium">
                Add To Cart
                <FaCartShopping className="transition-transform duration-300 group-hover:scale-110" />
              </span>
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 30, scale: 0.9 }}
        animate={animationStarted ? { opacity: 1, x: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="hidden lg:flex w-1/2 justify-center items-center relative z-10"
      >
        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-mainColor/20 to-transparent blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mainColor/10 blur-2xl"></div>

          <img
            src={product?.images[0]}
            alt={product?.name}
            className="relative mx-auto max-h-[600px] w-auto object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-105 z-10"
          />

          {product?.promoPercentage > 0 && (
            <div className="absolute -top-6 -right-6 z-20 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 text-2xl font-bold text-white shadow-lg animate-pulse">
              -{product?.promoPercentage}%
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
