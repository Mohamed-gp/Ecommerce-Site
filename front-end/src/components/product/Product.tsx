import { FaCartShopping, FaHeart, FaRegHeart } from "react-icons/fa6";
import RatingStars from "../ratingstars/RatingStars";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { authActions } from "../../redux/slices/authSlice";
import customAxios from "../../utils/axios/customAxios";

interface productProps {
  product: any;
}
// product props
export default function Product({ product }: productProps) {
  const dispatch = useDispatch();
  const user = useSelector((state: IRootState) => state.auth.user);
  const navigate = useNavigate();
  // const [animate, setanimate] = useState<string>("");
  const toggleWishListHandler = async (userId: string, productId: string) => {
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

  // const addProductHandler = (e) => {
  //   const cart = document.querySelector(".cart-icon");

  //   const product =
  //     e.currentTarget.parentElement.parentElement.parentElement.children[0]
  //       .children[0];
  //   // finding first grand parent of target button
  //   let target_parent = product.parentNode;
  //   // target_parent.style.zIndex = "100";
  //   // Creating separate Image
  //   // let img = target_parent.querySelector('img');
  //   let flying_img = product.cloneNode();
  //   flying_img.classList.add("flying-img");

  //   target_parent.appendChild(flying_img);
  //   // Finding position of flying image
  //   const flying_img_pos = flying_img.getBoundingClientRect();
  //   const shopping_cart_pos = cart.getBoundingClientRect();

  //   let data = {
  //     left:
  //       shopping_cart_pos.left -
  //       (shopping_cart_pos.width / 2 +
  //         flying_img_pos.left +
  //         flying_img_pos.width / 2),
  //     top: shopping_cart_pos.bottom - flying_img_pos.bottom + 30,
  //   };

  //   flying_img.style.cssText = `
  //                             --left : ${data.left.toFixed(2)}px;
  //                             --top : ${data.top.toFixed(2)}px;
  //                             `;

  //   setTimeout(() => {
  //     // target_parent.style.zIndex = "";
  //     target_parent.removeChild(flying_img);
  //   }, 1000);
  // };

  const addToCart = async () => {
    if (!user) {
      navigate("/register");
    }
    try {
      const { data } = await customAxios.post("/cart/add", {
        userId: user._id,
        productId: product._id,
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
      const { data } = await customAxios(`/comments/${product._id}`);
      setreviews(data.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data);
    }
  };
  useEffect(() => {
    getReviews();
  }, []);
  return (
    <>
      {/* data-aos="fade-down" problem with adding to cart */}
      <div
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        className="flex w-[292px] rounded-b-xl rounded-t-xl flex-col  overflow-hidden"
      >
        <div className="relative  overflow-hidden flex-1 flex  items-center justify-center   rounded-t-xl bg-white">
          <div className="w-[100px] h-[140px] relative  hover:scale-110 duration-300 z-[8] flex justify-center items-center">
            <img
              src={product?.images[0]}
              alt={product?._id}
              className="  object-cover "
            />
          </div>
          {user && (
            <div className="absolute right-4 top-4 ">
              {user?.wishlist?.find((ele: any) => ele._id == product._id) ? (
                <div
                  className="relative z-[1] cursor-pointer text-mainColor "
                  onClick={() => toggleWishListHandler(user._id, product._id)}
                >
                  <FaHeart />
                </div>
              ) : (
                <div
                  className="relative z-[1] cursor-pointer "
                  onClick={() => toggleWishListHandler(user._id, product._id)}
                >
                  <FaRegHeart />
                </div>
              )}
            </div>
          )}
          <div className=" absolute h-[280px] w-[280px] ">
            <div className="absolute -left-[50px] top-[70px]  flex h-10   w-[120px] -rotate-45 items-center justify-center bg-bgColorDanger text-xs  text-white ">
              {product?.promoPercentage}%
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-b-xl bg-bgColorBlack px-2  leading-loose text-white">
          <div className="left px-2 py-3">
            <p className="text-sm font-bold line-clamp-1">
              {product?.name?.slice(0, 16)}
            </p>
            <div className="rating-container my-1">
              {reviews?.length != 0 ? (
                <RatingStars
                  starsNumber={
                    +(
                      reviews?.reduce((acc, curr, ind, arr) => {
                        return curr.rate + acc;
                      }, 0) / reviews.length
                    ).toFixed(2)
                  }
                />
              ) : (
                <div className="product-rating">
                  <span className="no-ratings">(No ratings yet)</span>
                </div>
              )}
            </div>
            <div className="relative   w-fit text-base font-bold text-red-600">
              $
              {(product?.price * (1 - product?.promoPercentage / 100)).toFixed(
                2
              )}
              <del className="absolute bottom-0 left-full text-xs text-white">
                ${product?.price}
              </del>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 text-xs font-bold lg:justify-normal flex-1">
            <button
              onClick={() => addToCart()}
              className="flex  w-full !p-1  items-center justify-center gap-1 rounded-lg bg-mainColor  px-1 py-1 text-white"
            >
              <p>Add To Cart</p>
              <FaCartShopping />
            </button>
            <Link
              to={`/product/${product?._id}`}
              className="w-full rounded-lg !p-1 bg-white px-1 py-1 text-center text-[#201F20]"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
