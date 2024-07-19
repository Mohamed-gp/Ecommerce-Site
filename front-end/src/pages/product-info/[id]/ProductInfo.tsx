import { useEffect, useState } from "react";
import RatingStars from "../../../components/ratingstars/RatingStars";
import {
  FaBasketShopping,
  FaCartShopping,
  FaRegHeart,
  FaShare,
  FaStar,
  FaTrash,
} from "react-icons/fa6";
import { toast } from "react-hot-toast";
import { MdInsertComment } from "react-icons/md";
import ZoomedImage from "../../../components/zooomedImage/ZoomedImage";
import { useNavigate, useParams } from "react-router-dom";
import customAxios from "../../../utils/axios/customAxios";
import { Product } from "../../../interfaces/dbInterfaces";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../redux/store";
import { authActions } from "../../../redux/slices/authSlice";
import Swal from "sweetalert2";

export default function ProductInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: IRootState) => state.auth.user);
  const [product, setProduct] = useState<Product>({} as Product);
  const getProductById = async () => {
    try {
      const { data } = await customAxios.get(`/products/${id}`);
      setProduct(data.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    // finally loading
  };
  useEffect(() => {
    getProductById();
    scrollTo(0, 0);
  }, []);

  const [activeProductImageIndex, setactiveProductImageIndex] = useState(0);
  const copy = () => {
    const input = document.createElement("input");
    input.setAttribute("value", location.href);
    document.body.appendChild(input);
    input.select();
    const result = document.execCommand("copy");
    document.body.removeChild(input);
    toast.success("copied successfuly, share it with your friends");
    return result;
  };
  const [quantity, setQuantity] = useState(1);
  const addToCart = async () => {
    if (!user) {
      navigate("/register");
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
      toast.error(error.response.data.message);
    }
  };

  const [reviews, setreviews] = useState([]);
  const getReviews = async () => {
    try {
      const { data } = await customAxios(`/comments/${id}`);
      setreviews(data.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data);
    }
  };
  const [review, setreview] = useState({
    rating: 5,
    content: "",
  });
  const [emptyArray, setemptyArray] = useState<any[]>([]);
  useEffect(() => {
    setemptyArray([]);
    for (let index = 0; index < 5; index++) {
      setemptyArray((prev) => prev.concat(index));
    }
    getReviews();
  }, []);
  const addReviewHandler = async () => {
    try {
      const { data } = await customAxios.post(`/comments/${id}`, {
        rating: 6 - review?.rating,
        content: review?.content,
        userId: user?._id,
      });
      getReviews();
      console.log(data);
      toast.success(data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const deleteReviewHandler = (id: string) => {
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
            `/comments/${user?._id}/${id}`
          );
          toast.success(data.message);
          getReviews();
          Swal.fire({
            title: "Deleted!",
            text: "Review Deleted Successfuly",
            icon: "success",
          });
        } catch (error: any) {
          console.log(error);
          toast.error(error?.response?.data.message);
        }
      } else {
        Swal.fire({
          title: "your Review is Safe!",
          text: "something went wrong",
          icon: "error",
        });
      }
    });
  };
  const toggleWishListHandler = async (userId: string, productId: string) => {
    if (!user) {
      navigate("/register");
      return
    }
    try {
      const { data } = await customAxios.post("/products/wishlist", {
        userId,
        productId,
      });
      dispatch(authActions.setWishlist(data.data));
      console.log(data.data);
      toast.success(data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="container">
      <div
        style={{ minHeight: "calc(100vh - 80px)" }}
        className=" flex xl:flex-row flex-col  items-center justify-between gap-x-24  "
      >
        <div className="flex flex-col items-center gap-8 overflow-hidden">
          {/* zoomed components */}
          {product?.images && (
            <ZoomedImage
              productImages={product?.images}
              activeProductImageIndex={activeProductImageIndex}
            />
          )}
          <div className="flex gap-4">
            {product?.images?.map((productImage: string, index: number) => (
              <div
                onClick={() => setactiveProductImageIndex(index)}
                className={`${
                  index == activeProductImageIndex ? "opacity-50" : ""
                } cursor-pointer `}
              >
                <img
                  src={productImage ? productImage : "nul"}
                  alt=""
                  className="w-24 h-24 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold">{product?.name}</p>
            <FaShare className="cursor-pointer" onClick={() => copy()} />
          </div>
          <div className="flex items-center gap-1">
            <p className="text-lg ">category: </p>
            <p className="opacity-50"> {product?.category?.name}</p>
          </div>
          <div className="flex items-center gap-1">
            {reviews?.length != 0 && (
              <>
                <RatingStars
                  starsNumber={
                    reviews?.reduce((acc, curr, ind, arr) => {
                      return curr?.rate + acc;
                    }, 0) / reviews.length
                  }
                />
                <span className="mx-3 h-2 w-2 rounded-full bg-black opacity-25"></span>
                <MdInsertComment />
                <p>{reviews?.length} Reviews</p>
              </>
            )}

            {/* <span className="mx-3 h-2 w-2 rounded-full bg-black opacity-25"></span> */}
            {/* <FaBasketShopping />
        <p>154 Sold</p> */}
          </div>
          <div className="flex items-center gap-1 font-bold">
            <p className="text-4xl">
              $
              {(product?.price * (1 - product?.promoPercentage / 100)).toFixed(
                2
              )}
            </p>
            <p className="text-xl opacity-50 line-through ">
              ${product?.price?.toFixed(2)}
            </p>
            <p className="text-sm text-bgColorDanger ">
              {product?.promoPercentage}%OFF
            </p>
          </div>

          <div className="flex gap-5 items-center border-y-2 py-4 border-mainColor/20">
            <div className="flex  bg-white border-2 border-solid p-2 rounded-3xl items-center gap-2">
              <button
                onClick={() => setQuantity((prev) => prev - 1)}
                disabled={quantity == 1}
                className="bg-[#dadada] disabled:cursor-not-allowed w-7 h-7 rounded-full flex justify-center items-center disabled:opacity-20"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => {
                  setQuantity((prev) => prev + 1);
                }}
                className="bg-[#dadada] w-7 h-7  rounded-full flex justify-center items-center"
              >
                +
              </button>
            </div>
            <button
              onClick={() => {
                addToCart();
              }}
              className="flex flex-1 w-1/2 items-center justify-center gap-1 rounded-lg bg-mainColor px-1 py-2  text-white"
            >
              <p>Add To Cart</p>
              <FaCartShopping />
            </button>
            <button
              onClick={() => toggleWishListHandler(user?._id, product?._id)}
              className={`${
                user?.wishlist.find((ele) => ele?._id == product?._id)
                  ? "bg-mainColor text-white"
                  : "bg-white text-mainColor"
              } w-8 h-8 flex justify-center items-center rounded-full  `}
            >
              <FaRegHeart className=" opacity" />
            </button>
            {/* <button
          className="flex w-1/2 items-center justify-center gap-1 rounded-lg bg-white border-1 px-1 py-2 text-mainColor "
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        >
          <p>Add To Wishlist</p>
        </button> */}
          </div>
          <div className="flex items-center  justify-between gap-2">
            <p className="text-xl font-bold">Total:</p>
            <p className=" text-mainColor">
              $
              {(product?.price * (1 - product?.promoPercentage / 100)).toFixed(
                2
              )}{" "}
              * {quantity} = $
              {(
                product?.price *
                (1 - product?.promoPercentage / 100) *
                quantity
              ).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      <p className="pl-3 border-l-mainColor mt-12 border-l-4 font-bold text-2xl">
        Description
      </p>
      <p className="opacity-50 text-lg my-2">{product?.description}</p>
      <div className="reviews flex flex-col">
        <div className="flex justify-between items-center">
          <p className="text-3xl font-bold mt-4">Reviews</p>
          <span className="text-xl">{reviews?.length}</span>
        </div>
        {user && (
          <>
            <div className="py-2 mt-8 px-4 mb-4 bg-white rounded-lg rounded-t-lg border ">
              <textarea
                id="comment"
                value={review?.content}
                onChange={(e) =>
                  setreview({ ...review, content: e.target.value })
                }
                className="px-0 w-full text-sm   border-0 focus:ring-0 focus:outline-none "
                placeholder="Write a review..."
                required
              ></textarea>
            </div>
            <div className="flex flex-row-reverse justify-between p-10">
              {emptyArray?.map((index) => (
                <FaStar
                  onClick={() => setreview({ ...review, rating: index + 1 })}
                  className={`${
                    review.rating < index + 2
                      ? "text-mainColor opacity-100 "
                      : "text-mainColor opacity-10 "
                  } w-6 h-6 mx-2 peer peer-hover:opacity-100 hover:opacity-100  cursor-pointer`}
                />
              ))}
              <span>{6 - review.rating}/5</span>
            </div>
            <button
              type="submit"
              disabled={review.content.trim() == ""}
              onClick={() => addReviewHandler()}
              className="flex disabled:opacity-50 disabled:cursor-not-allowed justify-center items-center text-xs font-medium  mb-12 bg-buttonColor text-center mt-6 rounded-xl bg-mainColor px-6 py-3  text-white"
            >
              Post comment
            </button>
          </>
        )}
        <>
          {reviews?.map((review: any) => (
            <div className="flex flex-col  border-y border-y-mainColor py-4  my-12    ">
              <div className="flex items-center gap-2 my-3">
                <div className="size-10 rounded-full overflow-hidden">
                  <img src={review?.user?.photoUrl} alt="" />
                </div>
                <div className="flex flex-1 flex-col gap2 opacity-90">
                  <RatingStars starsNumber={review?.rate} />
                  <p>{review?.user?.username}</p>
                </div>
                {review?.user?._id == user?._id && (
                  <FaTrash
                    onClick={() => deleteReviewHandler(review?._id)}
                    className="cursor-pointer text-red-400"
                  />
                )}
              </div>
              <p className="bg-white p-2 rounded-xl break-words ">
                {review?.content}
              </p>
            </div>
          ))}
        </>
      </div>
      {reviews?.length == 0 ? (
        <p className="text-center my-12 text-xl">There is no reviews</p>
      ) : null}
    </div>
  );
}
