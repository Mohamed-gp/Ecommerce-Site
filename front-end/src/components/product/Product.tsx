import {
  FaCartShopping,
  FaHeart,
  FaRegHeart,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { cartActions } from "../../redux/slices/cartSlice";
import customAxios from "../../utils/axios/customAxios";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  promoPercentage: number;
  images: string[];
  isNew?: boolean;
  isFeatured?: boolean;
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
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(
    new Set()
  );
  const productRef = useRef<HTMLDivElement>(null);

  const addToCart = async () => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }

    try {
      await customAxios.post("/cart/add", {
        productId: product._id,
        quantity: 1,
      });
      dispatch(cartActions.addToCart({ product, quantity: 1 }));
      toast.success("Product added to cart!");
    } catch (error) {
      toast.error("Failed to add product to cart");
    }
  };

  const addToWishlist = async () => {
    if (!user) {
      toast.error("Please login to add items to wishlist");
      return;
    }

    try {
      await customAxios.post("/users/wishlist", {
        productId: product._id,
      });
      toast.success("Product added to wishlist!");
    } catch (error) {
      toast.error("Failed to add product to wishlist");
    }
  };

  const getReviews = async () => {
    try {
      const { data } = await customAxios(`/comments/${product._id}`);
      setReviews(data.data);
    } catch (error) {
      toast.error("Failed to fetch reviews");
    }
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % product.images.length;
    preloadImage(product.images[nextIndex]);
    setCurrentImageIndex(nextIndex);
  };

  const prevImage = () => {
    const prevIndex =
      (currentImageIndex - 1 + product.images.length) % product.images.length;
    preloadImage(product.images[prevIndex]);
    setCurrentImageIndex(prevIndex);
  };

  // Preload images for faster switching
  const preloadImage = (src: string) => {
    if (!preloadedImages.has(src)) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setPreloadedImages((prev) => new Set([...prev, src]));
      };
    }
  };

  useEffect(() => {
    getReviews();

    // Preload first few images immediately
    if (product.images && product.images.length > 0) {
      product.images.slice(0, 3).forEach(preloadImage);
    }

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
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group"
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
            src={product?.images[currentImageIndex]}
            alt={product?.name}
            className={`w-full h-full object-contain transition-opacity duration-150 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>

        {/* Image Navigation - only show if more than 1 image and on hover */}
        {product?.images.length > 1 && isHovered && (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                prevImage();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-1.5 rounded-full hover:bg-black/80 transition-colors duration-150 z-10"
            >
              <FaChevronLeft size={12} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                nextImage();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-1.5 rounded-full hover:bg-black/80 transition-colors duration-150 z-10"
            >
              <FaChevronRight size={12} />
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    preloadImage(product.images[index]);
                    setCurrentImageIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-colors duration-150 ${
                    index === currentImageIndex ? "bg-mainColor" : "bg-white/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}

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

        {/* Featured Badge */}
        {product?.isFeatured && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-white text-sm font-bold px-3 py-1 rounded-full z-20">
            Featured
          </div>
        )}

        {/* Quick Actions */}
        {user && (
          <div
            className={`absolute right-3 top-3 flex flex-col gap-2 transition-opacity duration-200 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                addToWishlist();
              }}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors duration-150"
            >
              {user?.wishlist?.find(
                (item: Product) => item._id === product._id
              ) ? (
                <FaHeart className="text-mainColor" />
              ) : (
                <FaRegHeart className="text-gray-600" />
              )}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart();
              }}
              className="p-2 rounded-full bg-mainColor text-white shadow-md hover:bg-opacity-90 transition-colors duration-150"
            >
              <FaCartShopping />
            </button>
          </div>
        )}
      </div>

      {/* Product Info Section */}
      <div className="p-4">
        {/* Title and Rating */}
        <div className="mb-4">
          <Link to={`/product/${product._id}`} className="block group">
            <h3 className="font-medium text-gray-900 group-hover:text-mainColor transition-colors duration-150 line-clamp-1">
              {product?.name}
            </h3>
          </Link>

          <div className="flex items-center mt-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`${
                    i < Math.round(averageRating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
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
            <span className="text-xl font-bold text-mainColor">
              $
              {(product?.price * (1 - product?.promoPercentage / 100)).toFixed(
                2
              )}
            </span>
            {product?.promoPercentage > 0 && (
              <span className="text-sm text-gray-400 line-through -mt-1">
                ${product?.price.toFixed(2)}
              </span>
            )}
          </div>

          <Link
            to={`/product/${product._id}`}
            className={`py-2 px-4 text-sm border border-gray-200 rounded-lg transition-all duration-150 ${
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
