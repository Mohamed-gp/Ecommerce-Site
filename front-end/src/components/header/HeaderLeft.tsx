import { Link } from "react-router-dom";
import { FaBagShopping, FaShop, FaStore } from "react-icons/fa6";

export default function HeaderLeft() {
  return (
    <Link to="/" className="text-base sm:text-xl font-bold sm:flex  hidden   items-center gap-1">
      {/* <img src="/logo-symbol.png" alt="logo" width={20} height={20}/> */}
      <span className="flex items-center justify-center text-white bg-mainColor p-2  rounded-xl text-lg">
        <FaBagShopping/>  
      </span>
      SwiftBuy
    </Link>
  );
}
