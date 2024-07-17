import { useState } from "react";
import { FaArrowRight, FaRegHeart, FaTrash, FaXmark } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { Product } from "../../interfaces/dbInterfaces";
import ProductComp from "../../components/product/Product";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { wishlist } = useSelector((state: IRootState) => state.auth.user);

  return (
    <>
      {wishlist && wishlist?.length != 0 ? (
        <div className="container pt-6 mt-6">
          <p className="pl-3 border-l-mainColor border-l-4 font-bold text-2xl">
            Wishlist
          </p>
          <div className="flex gap-8 flex-wrap my-12 justify-center">
            {wishlist?.map((product: Product) => (
              <ProductComp product={product} />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div
            className="container flex flex-col  items-center justify-center py-14"
            style={{ minHeight: `calc(100vh - 70.94px)` }}
          >
            <div className="flex h-[130px] w-[130px] items-center justify-center rounded-full bg-[#F0F9F4]">
              <FaRegHeart className="h-1/2 w-1/2 text-mainColor" />
            </div>
            <p className="my-6 mb-2 text-3xl font-bold">
              Your wishlist is empty
            </p>
            <p className="opacity-60">
              You don’t have any products in the wishlist yet. You will find a
              lot of interesting products on our Shop page.
            </p>
            <Link to="/store" className="mt-6 rounded-xl bg-mainColor px-6 py-2  text-white">
              Continue Shoping
            </Link>
          </div>
        </>
      )}
    </>
  );
}
