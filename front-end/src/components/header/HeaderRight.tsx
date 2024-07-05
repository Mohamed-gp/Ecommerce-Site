import { Link } from "react-router-dom";
import { FaCartShopping, FaHeart, FaUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { useState } from "react";
import { MdAdminPanelSettings } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";

export default function HeaderRight() {
  const user: any = useSelector((state: IRootState) => state.auth.user);
  const [isCartEmpty, setisCartEmpty] = useState(false);
  return (
    <div className="flex items-center justify-between gap-3 text-sm md:text-lg ">
      {user?.role != "admin" ? (
        <Link
          to={user?._id ? `/profile/${user._id}` : `/register`}
          className=" md:text-xl "
        >
          <FaUser />
        </Link>
      ) : (
        <Link to="/admin" className=" md:text-xl ">
          <RiAdminFill />
        </Link>
      )}
      <div className="border-r-2 py-2 pr-3 ">
        <Link
          to={user?._id ? `/wishlist/${user._id}` : "/register"}
          className=" md:text-xl "
        >
          <FaHeart />
        </Link>
      </div>
      <Link
        to={user?._id ? `/cart/${user?._id}` : "/register"}
        className="cart-icon relative md:text-xl"
      >
        <FaCartShopping />
        {!isCartEmpty && (
          <span className="absolute  bg-mainColor -right-1 -top-1 w-[13px] h-[13px] rounded-full"></span>
        )}
      </Link>
    </div>
  );
}
