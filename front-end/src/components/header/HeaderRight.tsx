import { Link } from "react-router-dom";
import { FaCartShopping, FaHeart, FaUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { RiAdminFill } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";

export default function HeaderRight() {
  const user = useSelector((state: IRootState) => state.auth.user);
  return (
    <div className="flex items-center justify-between gap-3 text-sm md:text-lg ">
      <Link to={`/`} className="sm:hidden md:text-xl ">
        <AiFillHome />
      </Link>

      {user?.role != "admin" ? (
        <Link to={user ? `/profile` : `/login`} className=" md:text-xl ">
          <FaUser />
        </Link>
      ) : (
        <Link to="/admin/dashboard" className=" md:text-xl ">
          <RiAdminFill />
        </Link>
      )}
      <div className="border-r-2 py-2 pr-3 ">
        <Link
          to={user?._id ? `/wishlist` : "/login"}
          className=" md:text-xl"
        >
          <FaHeart />
        </Link>
      </div>
      <Link
        to={user?._id ? `/cart` : "/login"}
        className="cart-icon relative md:text-xl"
      >
        <FaCartShopping />
        {user && user?.cart?.length != 0 && (
          <span className="absolute  bg-mainColor -right-1 -top-1 w-[13px] h-[13px] rounded-full"></span>
        )}
      </Link>
    </div>
  );
}
