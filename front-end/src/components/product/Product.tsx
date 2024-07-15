import { FaCartShopping, FaHeart, FaRegHeart } from "react-icons/fa6";
import RatingStars from "../ratingstars/RatingStars";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

interface productProps {
  product: any;
}
// product props
export default function Product({ product }: productProps) {
  const [wishList, setwishList] = useState<boolean>(false);
  const [animate, setanimate] = useState<string>("");
  const toggleWishListHandler = () => {
    setwishList(!wishList);
    toast.success("toggled successfully");
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

  return (
    <>
      {/* data-aos="fade-down" problem with adding to cart */}
      <div
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        className="flex rounded-b-xl rounded-t-xl flex-col w-[270px] overflow-hidden"
      >
        <div className="relative overflow-hidden  flex h-full w-[280px] items-center justify-center   rounded-t-xl bg-white">
          <img
            src={product?.images[0]}
            alt={product?._id}
            width={120}
            className="hover:scale-110 duration-300 z-[8]"
            height={120}
          />
          <div className="absolute right-4 top-4 ">
            {wishList ? (
              <div
                className="relative z-[1] cursor-pointer text-mainColor "
                onClick={() => toggleWishListHandler()}
              >
                <FaHeart />
              </div>
            ) : (
              <div
                className="relative z-[1] cursor-pointer "
                onClick={() => toggleWishListHandler()}
              >
                <FaRegHeart />
              </div>
            )}
          </div>

          <div className=" absolute h-[280px] w-[280px] ">
            <div className="absolute -left-[43px] top-[70px]  flex h-10   w-[120px] -rotate-45 items-center justify-center bg-bgColorDanger text-xs  text-white ">
              {product?.promoPercentage}%
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-b-xl bg-bgColorBlack px-2 leading-loose text-white">
          <div className="left px-2 py-3">
            <p className="text-sm font-bold">{product?.name}</p>
            <div className="rating-container my-1">
              <RatingStars starsNumber={product?.rating} />
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
          <div className="flex flex-col items-center justify-center gap-3 text-xs font-bold lg:justify-normal">
            <button
              // onClick={(e) => addProductHandler(e)}
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
