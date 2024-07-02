import { useEffect, useState } from "react";
import RatingStars from "../../../components/ratingstars/RatingStars";
import {
  FaBasketShopping,
  FaCartShopping,
  FaRegHeart,
  FaShare,
} from "react-icons/fa6";
import { toast } from "react-hot-toast";
import { MdInsertComment } from "react-icons/md";

export default function ProductInfo() {
  const [quantity, setquantity] = useState(1);
  const productImages = [
    "/618d5bS2lUL._AC_SX466_-removebg-preview.png",
    "/618d5bS2lUL._AC_SX466_-removebg-preview.png",
    "/618d5bS2lUL._AC_SX466_-removebg-preview.png",
    "/618d5bS2lUL._AC_SX466_-removebg-preview.png",
  ];
  const [activeProductImageIndex, setactiveProductImageIndex] = useState(0);
  const copy = () => {
    const input = document.createElement("input");
    input.setAttribute("value", location.href);
    document.body.appendChild(input);
    input.select();
    const result = document.execCommand("copy");
    document.body.removeChild(input);
    toast.success("copied succefuly, share it with your friends");
    return result;
  };
  const promotion = 0.5;
  const originalPrice = 1230;
  const price = originalPrice * (1 - promotion);
  return (
    <>
      {/* product info */}
      <div className="container">
        <div
          style={{ minHeight: "calc(100vh - 80px)" }}
          className=" flex xl:flex-row flex-col  items-center justify-between gap-x-24 py-12 "
        >
          <div className="flex flex-col items-center gap-8">
            <div className="">
              <img
                src={productImages[activeProductImageIndex]}
                alt=""
                width={500}
                height={500}
              />
            </div>
            <div className="flex gap-2">
              {productImages.map((productImage, index) => (
                <div
                  onClick={() => setactiveProductImageIndex(index)}
                  className={`${
                    index == activeProductImageIndex ? "opacity-50" : ""
                  } cursor-pointer`}
                >
                  <img src={productImage} alt="" width={100} height={100} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex justify-between items-center">
              <p className="text-2xl font-bold">MacBook Pro</p>
              <FaShare className="cursor-pointer" onClick={() => copy()} />
            </div>
            <div className="flex items-center gap-1">
              <p className="text-lg ">category: </p>
              <p className="opacity-50"> Digital</p>
            </div>
            <div className="flex items-center gap-1">
              <RatingStars starsNumber={3.2}/>
              <span className="mx-3 h-2 w-2 rounded-full bg-black opacity-25"></span>
              <MdInsertComment />
              <p>0 Reviews</p>
              {/* <span className="mx-3 h-2 w-2 rounded-full bg-black opacity-25"></span> */}
              {/* <FaBasketShopping />
              <p>154 Sold</p> */}
            </div>
            <div className="flex items-center gap-1 font-bold">
              <p className="text-4xl">${price}</p>
              <p className="text-xl opacity-50 line-through ">
                ${originalPrice}
              </p>
              <p className="text-sm text-bgColorDanger ">
                {promotion * 100}%OFF
              </p>
            </div>

            <div className="flex gap-5 items-center border-y-2 py-4 border-mainColor/20">
              <div className="flex  bg-white border-2 border-solid p-2 rounded-3xl items-center gap-2">
                <button
                  onClick={() => setquantity((prev) => prev - 1)}
                  disabled={quantity == 1}
                  className="bg-[#dadada] w-7 h-7 rounded-full flex justify-center items-center disabled:opacity-20"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => {
                    setquantity((prev) => prev + 1);
                  }}
                  className="bg-[#dadada] w-7 h-7  rounded-full flex justify-center items-center"
                >
                  +
                </button>
              </div>
              <button className="flex flex-1 w-1/2 items-center justify-center gap-1 rounded-lg bg-mainColor px-1 py-2  text-white">
                <p>Add To Cart</p>
                <FaCartShopping />
              </button>
              <button className="bg-mainColor/30 w-8 h-8 flex justify-center items-center rounded-full  ">
                <FaRegHeart className="text-mainColor" />
              </button>
              {/* <button
                className="flex w-1/2 items-center justify-center gap-1 rounded-lg bg-white border-1 px-1 py-2 text-mainColor "
                style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
              >
                <p>Add To Wishlist</p>
              </button> */}
            </div>
            <div className="flex items-center gap-2">
              <p>Total:</p>
              <p className=" text-mainColor">
                ${price} * {quantity} = ${price * quantity}
              </p>
            </div>
          </div>
        </div>
        <p className="pl-3 border-l-mainColor border-l-4 font-bold text-2xl">
          Description
        </p>
        <p className="opacity-50 text-lg my-2">
          The MacBook Pro is Apple's high-performance laptop, designed for
          professionals and power users who require robust computing power,
          advanced graphics, and superior display quality. Available in both
          13-inch and 16-inch models, the MacBook Pro combines cutting-edge
          technology with sleek design to offer an unparalleled user experience.
        </p>
        <div className="flex justify-between my-6">
          <p className="pl-3 border-l-mainColor border-l-4 font-bold text-2xl">
            Reviews
          </p>
          <span>0</span>
        </div>
        <p className="text-center my-12 text-xl">There is no reviews</p>
      </div>
      {/* product desciption */}
    </>
  );
}
