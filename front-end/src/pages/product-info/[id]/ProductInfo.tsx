import { useEffect, useState } from "react";
import RatingStars from "../../../components/ratingstars/RatingStars";
import {
  FaCartShopping,
  FaRegHeart,
  FaShare,
  FaStar,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
} from "react-icons/fa6";
import { toast } from "react-hot-toast";
import { MdInsertComment } from "react-icons/md";
import ZoomedImage from "../../../components/zooomedImage/ZoomedImage";
import { useNavigate, useParams } from "react-router-dom";
import customAxios from "../../../utils/axios/customAxios";
import { Product, Comment as Review } from "../../../interfaces/dbInterfaces";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../redux/store";
import { authActions } from "../../../redux/slices/authSlice";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: IRootState) => state.auth.user);
  const [product, setProduct] = useState<Product>({} as Product);
  const [isLoading, setIsLoading] = useState(true);
  const [activeProductImageIndex, setActiveProductImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const closeZoomModal = () => {
    setIsImageModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const openZoomModal = () => {
    setIsImageModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const getProductById = async () => {
    try {
      setIsLoading(true);
      const { data } = await customAxios.get(`/products/${id}`);
      setProduct(data.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to load product");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProductById();
    scrollTo(0, 0);
  }, []);

  const copy = () => {
    navigator.clipboard
      .writeText(location.href)
      .then(() => {
        toast.success("Link copied successfully! Share it with your friends");
      })
      .catch(() => {
        // Fallback for older browsers
        const input = document.createElement("input");
        input.setAttribute("value", location.href);
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
        toast.success("Link copied successfully! Share it with your friends");
      });
  };

  const [quantity, setQuantity] = useState(1);
  const addToCart = async () => {
    if (!user) {
      navigate("/register");
      return;
    }
    try {
      const { data } = await customAxios.post("/cart/add", {
        userId: user._id,
        productId: product._id,
        quantity,
      });
      dispatch(authActions.setCart(data.data));
      toast.success(data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to add to cart");
    }
  };

  const [reviews, setReviews] = useState([]);
  const getReviews = async () => {
    try {
      const { data } = await customAxios(`/comments/${id}`);
      setReviews(data.data);
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to load reviews");
    }
  };

  const [review, setReview] = useState({
    rating: 5,
    content: "",
  });

  const [emptyArray, setEmptyArray] = useState<any[]>([]);

  useEffect(() => {
    setEmptyArray([]);
    for (let index = 0; index < 5; index++) {
      setEmptyArray((prev) => prev.concat(index));
    }
    getReviews();
  }, []);

  const addReviewHandler = async () => {
    try {
      const { data } = await customAxios.post(
        `/comments/${id}`,
        {
          rating: 6 - review?.rating,
          content: review?.content,
          userId: user?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      getReviews();
      setReview({ rating: 5, content: "" });
      toast.success(data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to post review");
    }
  };

  const deleteReviewHandler = (reviewId: string) => {
    Swal.fire({
      title: "Are you sure to remove this Review?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await customAxios.delete(
            `/comments/${user?._id}/${reviewId}`
          );
          toast.success(data.message);
          getReviews();
          Swal.fire({
            title: "Deleted!",
            text: "Review Deleted Successfully",
            icon: "success",
          });
        } catch (error: any) {
          console.log(error);
          toast.error(
            error?.response?.data?.message || "Failed to delete review"
          );
        }
      }
    });
  };

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
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to update wishlist");
    }
  };

  const nextImage = () => {
    setActiveProductImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setActiveProductImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-mainColor"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex xl:flex-row flex-col items-start justify-between gap-12 min-h-[60vh]">
        {/* Enhanced Image Gallery */}
        <div className="flex flex-col items-center gap-6 flex-1">
          {/* Main Image Display with Zoomed View */}
          <div className="relative w-full max-w-lg mx-auto">
            {isImageModalOpen ? (
              <motion.div
                className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeZoomModal}
              >
                <motion.div
                  className="relative max-w-4xl w-full h-full flex items-center justify-center"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ZoomedImage
                    productImages={product?.images || []}
                    activeProductImageIndex={activeProductImageIndex}
                    onClose={closeZoomModal}
                  />
                  <button
                    onClick={closeZoomModal}
                    className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
                  >
                    ×
                  </button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-lg cursor-zoom-in"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onClick={openZoomModal}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeProductImageIndex}
                    src={product?.images?.[activeProductImageIndex]}
                    alt={product?.name}
                    className="w-full h-full object-contain"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>

                {/* Navigation Arrows */}
                {product?.images?.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
                    >
                      <FaChevronLeft className="text-gray-700" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
                    >
                      <FaChevronRight className="text-gray-700" />
                    </button>
                  </>
                )}

                {/* Expand Icon */}
                <button
                  onClick={openZoomModal}
                  className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
                >
                  <FaExpand className="text-gray-700" />
                </button>
              </motion.div>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {product?.images?.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 w-full max-w-lg">
              {product.images.map((image: string, index: number) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveProductImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    index === activeProductImageIndex
                      ? "border-mainColor shadow-lg"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-1 flex-col gap-6 max-w-lg">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-900">
              {product?.name}
            </h1>
            <button
              onClick={copy}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Share product"
            >
              <FaShare className="text-gray-600" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">Category:</span>
            <span className="px-3 py-1 bg-mainColor/10 text-mainColor rounded-full text-sm font-medium">
              {product?.category?.name}
            </span>
          </div>

          {/* Rating and Reviews */}
          {reviews?.length > 0 && (
            <div className="flex items-center gap-4">
              <RatingStars
                starsNumber={
                  reviews.reduce(
                    (acc: number, curr: any) => curr?.rate + acc,
                    0
                  ) / reviews.length
                }
              />
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <div className="flex items-center gap-1 text-gray-600">
                <MdInsertComment />
                <span>{reviews.length} Reviews</span>
              </div>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold text-gray-900">
              $
              {(product?.price * (1 - product?.promoPercentage / 100)).toFixed(
                2
              )}
            </span>
            {product?.promoPercentage > 0 && (
              <>
                <span className="text-xl text-gray-500 line-through">
                  ${product?.price?.toFixed(2)}
                </span>
                <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-sm font-semibold">
                  {product?.promoPercentage}% OFF
                </span>
              </>
            )}
          </div>

          {/* Quantity and Actions */}
          <div className="flex gap-4 items-center p-6 bg-gray-50 rounded-xl">
            <div className="flex items-center bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                disabled={quantity === 1}
                className="px-4 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                -
              </button>
              <span className="px-4 py-2 border-x-2 border-gray-200 min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>

            <motion.button
              onClick={addToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-mainColor text-white py-3 px-6 rounded-xl font-semibold hover:bg-mainColor/90 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaCartShopping />
              Add To Cart
            </motion.button>

            <motion.button
              onClick={() => toggleWishListHandler(user?._id, product?._id)}
              className={`p-3 rounded-xl border-2 transition-all ${
                user?.wishlist?.find((ele: any) => ele?._id === product?._id)
                  ? "bg-mainColor text-white border-mainColor"
                  : "bg-white text-mainColor border-mainColor hover:bg-mainColor/5"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaRegHeart />
            </motion.button>
          </div>

          {/* Total Price */}
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-xl font-bold text-mainColor">
              $
              {(
                product?.price *
                (1 - product?.promoPercentage / 100) *
                quantity
              ).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4 border-l-4 border-mainColor pl-4">
          Description
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed bg-gray-50 p-6 rounded-xl">
          {product?.description}
        </p>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Reviews</h2>
          <span className="bg-mainColor text-white px-4 py-2 rounded-full font-semibold">
            {reviews?.length}
          </span>
        </div>

        {/* Add Review Form */}
        {user && (
          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg border mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
            <textarea
              value={review?.content}
              onChange={(e) =>
                setReview({ ...review, content: e.target.value })
              }
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mainColor focus:border-transparent resize-none"
              placeholder="Share your experience with this product..."
              rows={4}
              required
            />

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Rating:</span>
                <div className="flex gap-1">
                  {emptyArray?.map((index) => (
                    <FaStar
                      key={index}
                      onClick={() =>
                        setReview({ ...review, rating: index + 1 })
                      }
                      className={`w-5 h-5 cursor-pointer transition-colors ${
                        review.rating >= index + 1
                          ? "text-yellow-400"
                          : "text-gray-300 hover:text-yellow-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  ({review.rating}/5)
                </span>
              </div>

              <button
                type="submit"
                disabled={review.content.trim() === ""}
                onClick={addReviewHandler}
                className="px-6 py-2 bg-mainColor text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-mainColor/90 transition-colors"
              >
                Post Review
              </button>
            </div>
          </motion.div>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews?.map((review: any, index: number) => (
            <motion.div
              key={review._id}
              className="bg-white p-6 rounded-xl shadow-lg border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={review?.user?.photoUrl || "/default-avatar.png"}
                    alt={review?.user?.username}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {review?.user?.username}
                    </h4>
                    <RatingStars starsNumber={review?.rate} />
                  </div>
                </div>

                {review?.user?._id === user?._id && (
                  <button
                    onClick={() => deleteReviewHandler(review?._id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete review"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>

              <p className="text-gray-700 leading-relaxed">{review?.content}</p>
            </motion.div>
          ))}
        </div>

        {reviews?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No reviews yet</p>
            <p className="text-gray-400 mt-2">
              Be the first to review this product!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
