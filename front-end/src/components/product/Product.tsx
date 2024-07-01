import { FaCartShopping, FaHeart, FaRegHeart } from "react-icons/fa6";
import RatingStars from "../ratingstars/RatingStars";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Product() {
  const [wishList, setwishList] = useState<boolean>(false);
  const [animate, setanimate] = useState<string>("");
  const addWishListHandler = () => {
    setwishList(!wishList);
    toast.success("Product Added To WishList Successfully");
  };

  const addProductHandler = (e) => {
    const cart = document.querySelector(".cart-icon");

    const product =
      e.currentTarget.parentElement.parentElement.parentElement.children[0]
        .children[0];
    // finding first grand parent of target button
    let target_parent = product.parentNode;
    // target_parent.style.zIndex = "100";
    // Creating separate Image
    // let img = target_parent.querySelector('img');
    let flying_img = product.cloneNode();
    flying_img.classList.add("flying-img");

    target_parent.appendChild(flying_img);
    // Finding position of flying image
    const flying_img_pos = flying_img.getBoundingClientRect();
    const shopping_cart_pos = cart.getBoundingClientRect();

    let data = {
      left:
        shopping_cart_pos.left -
        (shopping_cart_pos.width / 2 +
          flying_img_pos.left +
          flying_img_pos.width / 2),
      top: shopping_cart_pos.bottom - flying_img_pos.bottom + 30,
    };

    flying_img.style.cssText = `
                              --left : ${data.left.toFixed(2)}px;
                              --top : ${data.top.toFixed(2)}px;
                              `;

    setTimeout(() => {
      // target_parent.style.zIndex = "";
      target_parent.removeChild(flying_img);
    }, 1000);
  };

  return (
    <>
     {/* data-aos="fade-down" problem with adding to cart */}
      <div className="flex flex-col ">
        <div className="relative  flex h-[150px] w-[270px] items-center justify-center   rounded-t-xl bg-white">
          <img
            src="/618d5bS2lUL._AC_SX466_-removebg-preview.png"
            alt="618d5bS2lUL._AC_SX466_-removebg-preview.png"
            width={120}
            height={120}
          />
          <div className="absolute right-4 top-4 ">
            {wishList ? (
              <div
                className="relative z-[1] cursor-pointer text-[red] "
                onClick={() => setwishList(!wishList)}
              >
                <FaHeart />
              </div>
            ) : (
              <div
                className="relative z-[1] cursor-pointer "
                onClick={() => addWishListHandler()}
              >
                <FaRegHeart />
              </div>
            )}
          </div>

          <div className=" absolute h-[149px] w-[269px] overflow-hidden">
            <div className="absolute -left-[28px] -top-[3px]  flex h-10 w-[87px] -rotate-45 items-center justify-center bg-bgColorDanger text-xs  text-white ">
              99%
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-b-xl bg-bgColorBlack px-2 leading-loose text-white">
          <div className="left px-2 py-3">
            <p className="text-sm font-bold">MacBook Pro 16</p>
            <div className="rating-container my-1">
              <RatingStars />
            </div>
            <div className="relative mx-0 w-fit text-base font-bold text-red-600">
              $3,999
              <del className="absolute bottom-0 left-full text-xs text-white">
                $4200
              </del>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 text-xs font-bold lg:justify-normal">
            <button
              onClick={(e) => addProductHandler(e)}
              className="flex w-[100px] items-center justify-center gap-1 rounded-lg bg-mainColor  px-1 py-1 text-white"
            >
              <p>Add To Cart</p>
              <FaCartShopping />
            </button>
            <Link
              to="/"
              className="w-[100px] rounded-lg bg-white px-1 py-1 text-center text-[#201F20]"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
