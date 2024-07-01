import RatingStars from "../../../components/ratingstars/RatingStars";
import { FaBasketShopping, FaCartShopping, FaHeart } from "react-icons/fa6";
import { MdInsertComment } from "react-icons/md";

export default function ProductInfo() {
  return (
    <>
      {/* product info */}
      <div>
        <div className="container flex h-screen items-center justify-between gap-x-24 py-12">
          <div className="flex flex-col items-center gap-8">
            <div className="">
              <img
                src="/618d5bS2lUL._AC_SX466_-removebg-preview.png"
                alt=""
                width={500}
                height={500}
              />
            </div>
            <div className="flex gap-2">
              <div className="opacity-50">
                <img
                  src="/618d5bS2lUL._AC_SX466_-removebg-preview.png"
                  alt=""
                  width={100}
                  height={100}
                />
              </div>
              <div className="">
                <img
                  src="/618d5bS2lUL._AC_SX466_-removebg-preview.png"
                  alt=""
                  width={100}
                  height={100}
                />
              </div>
              <div className="">
                <img
                  src="/618d5bS2lUL._AC_SX466_-removebg-preview.png"
                  alt=""
                  width={100}
                  height={100}
                />
              </div>
              <div className="">
                <img
                  src="/618d5bS2lUL._AC_SX466_-removebg-preview.png"
                  alt=""
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </div>
          <div className="flex w-1/2 flex-col gap-2">
            <p className="text-2xl font-bold">MacBook Pro</p>
            <div className="flex items-center gap-1">
              <RatingStars />
              <span className="mx-3 h-2 w-2 rounded-full bg-black opacity-25"></span>
              <MdInsertComment />
              <p>32 Reviews</p>
              <span className="mx-3 h-2 w-2 rounded-full bg-black opacity-25"></span>
              <FaBasketShopping />
              <p>154 Sold</p>
            </div>
            <div className="flex items-center gap-1 font-bold">
              <p className="text-4xl">$54.69</p>
              <p className="text-xl opacity-50">$78.66</p>
              <p className="text-sm text-bgColorDanger">50%OFF</p>
            </div>
            <div className="flex items-center">
              <p>Quantity: </p>
              <input type="number" name="" className="bg-gray-400" id="" />
            </div>
            <div className="flex gap-5 ">
              <button className="flex w-1/2 items-center justify-center gap-1 rounded-lg bg-mainColor px-1  py-1 py-2 text-white">
                <p>Add To Cart</p>
                <FaCartShopping />
              </button>
              <button className="flex w-1/2 items-center justify-center gap-1 rounded-lg bg-[#e8e8e8] px-1 py-1 text-mainColor ">
                <p>Add To Wishlist</p>
                <FaHeart />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* product desciption */}
    </>
  );
}
