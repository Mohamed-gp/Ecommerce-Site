import { FaCartShopping, FaHeart, FaRegHeart, FaStar } from "react-icons/fa6";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { authActions } from "../../redux/slices/authSlice";
import customAxios from "../../utils/axios/customAxios";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  promoPercentage: number;
  images: string[];
  isNew?: boolean;
}

interface Review {
  _id: string;
  rate: number;
  comment: string;
  userId: string;
}

interface ProductProps {
  product: Product;
}

export default function Product({ product }: ProductProps) {
  const dispatch = useDispatch();
  const { user } = useSelector((state: IRootState) => state.auth);
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const productRef = useRef<HTMLDivElement>(null);

  const toggleWishListHandler = async (userId: string, productId: string) => {
    if (!user) {
      navigate("/register");
      return;
    }
    try {
      const { data } = await customAxios.post("/products/wishlist", {
        userId,
        productId,
      });
      dispatch(authActions.setWishlist(data.data));
      toast.success(data.message);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

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
      if (error instanceof Error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

  const getReviews = async () => {
    try {
      const { data } = await customAxios(`/comments/${product._id}`);
      setReviews(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getReviews();
    const currentRef = productRef.current;

    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const img = new Image();
          img.src = product?.images[0];
          img.onload = () => setIsImageLoaded(true);
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [product._id, product.images]);

  // Calculate average rating
  const averageRating = reviews.length
    ? reviews.reduce((acc, curr) => acc + curr.rate, 0) / reviews.length
    : 0;

  return (
    <div
      ref={productRef}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Section */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <div
          className={`absolute inset-0 bg-gray-200 animate-pulse ${
            isImageLoaded ? "hidden" : "block"
          }`}
        />
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <img
            src={product?.images[0]}
            alt={product?.name}
            className={`w-full h-full object-contain transform transition-all duration-500 ${
              isHovered ? "scale-110" : "scale-100"
            } ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
            loading="lazy"
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>

        {/* Promotion Badge */}
        {product?.promoPercentage > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full z-20">
            {product.promoPercentage}% OFF
          </div>
        )}

        {/* New Badge */}
        {product?.isNew && (
          <div className="absolute top-2 left-2 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full z-20">
            New
          </div>
        )}

        {/* Quick Actions */}
        {user && (
          <div
            className={`absolute right-3 flex flex-col gap-2 transition-all duration-300 ${
              isHovered ? "opacity-100 top-14" : "opacity-0 -top-10"
            }`}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleWishListHandler(user._id, product._id);
              }}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors group/btn"
            >
              {user?.wishlist?.find(
                (item: Product) => item._id === product._id
              ) ? (
                <FaHeart className="text-mainColor transform group-hover/btn:scale-110 transition-transform" />
              ) : (
                <FaRegHeart className="text-gray-600 transform group-hover/btn:scale-110 transition-transform" />
              )}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart();
              }}
              className="p-2 rounded-full bg-mainColor text-white shadow-md hover:bg-opacity-90 transition-colors group/btn"
            >
              <FaCartShopping className="transform group-hover/btn:scale-110 transition-transform" />
            </button>
          </div>
        )}
      </div>

      {/* Product Info Section */}
      <div className="p-4">
        {/* Title and Rating */}
        <div className="mb-4">
          <Link to={`/product/${product._id}`} className="block group">
            <h3 className="font-medium text-gray-900 group-hover:text-mainColor transition-colors line-clamp-1">
              {product?.name}
            </h3>
          </Link>

          <div className="flex items-center mt-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`transform transition-transform ${
                    i < Math.round(averageRating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  } ${isHovered ? "scale-110" : "scale-100"}`}
                  size={14}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500">
              {reviews.length > 0 ? `(${reviews.length})` : ""}
            </span>
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between h-10">
          <div className="flex flex-col">
            <span
              className={`text-xl font-bold text-mainColor transition-all duration-300 ${
                isHovered ? "scale-110" : "scale-100"
              }`}
            >
              ${(product?.price * (1 - product?.promoPercentage / 100)).toFixed(2)}
            </span>
            {product?.promoPercentage > 0 && (
              <span className="text-sm text-gray-400 line-through -mt-1">
                ${product?.price.toFixed(2)}
              </span>
            )}
          </div>

          <Link
            to={`/product/${product._id}`}
            className={`py-2 px-4 text-sm border border-gray-200 rounded-lg transition-all duration-300 ${
              isHovered
                ? "bg-mainColor text-white border-mainColor"
                : "text-gray-700 hover:border-mainColor hover:text-mainColor"
            }`}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
