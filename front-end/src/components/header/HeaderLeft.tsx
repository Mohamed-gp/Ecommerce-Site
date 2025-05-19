import { Link } from "react-router-dom";
import { FaBagShopping } from "react-icons/fa6";

interface HeaderLeftProps {
  isFooter?: boolean;
}

export default function HeaderLeft({ isFooter }: HeaderLeftProps) {
  return (
    <Link
      to="/"
      className={`text-base sm:text-xl font-bold sm:flex hidden items-center gap-1 ${
        isFooter ? "text-white" : "text-gray-900"
      }`}
    >
      <span
        className={`flex items-center justify-center ${
          isFooter ? "bg-white text-mainColor" : "bg-mainColor text-white"
        } p-2 rounded-xl text-lg`}
      >
        <FaBagShopping />
      </span>
      SwiftBuy
    </Link>
  );
}
