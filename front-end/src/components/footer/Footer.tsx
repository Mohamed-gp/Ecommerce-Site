import { Link } from "react-router-dom";
import HeaderLeft from "../header/HeaderLeft";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { HashLink } from "react-router-hash-link";

export default function Footer() {
  const { user } = useSelector((state: IRootState) => state.auth);
  return (
    <footer className="bg-bgColorBlack text-center">
      <div className="container flex flex-wrap justify-between border-b-2 py-12">
        <div className="flex mb-8 flex-wrap w-[100%] sm:w-[30%] flex-col gap-2 text-white">
          <div className="mx-auto">
            <HeaderLeft />
          </div>
          <p className="opacity-30 duration-1000 hover:opacity-100">
            Customer Supports:
          </p>
          <p>(629) 555-0129</p>
          <p className="opacity-30 duration-1000 hover:opacity-100 ">
            4517 Washington Ave.
          </p>
          <p className="opacity-30 duration-1000 hover:opacity-100 ">
            Manchester, Kentucky 39495
          </p>
          <p>SwiftBuy@kinbo.com</p>
        </div>
        <div className="flex w-[30%] flex-col gap-2 text-white">
          <p>Quick Links</p>
          <HashLink
            smooth
            to="/#hero"
            className="cursor-pointer opacity-30 duration-1000 hover:opacity-100"
          >
            Hero
          </HashLink>
          <HashLink
            smooth
            to="/#newArrivals"
            className="cursor-pointer opacity-30 duration-1000 hover:opacity-100"
          >
            New Arrivals
          </HashLink>
          {}
          <HashLink
            smooth
            to="/#store"
            className="cursor-pointer opacity-30 duration-1000 hover:opacity-100"
          >
            Store
          </HashLink>
        </div>
        <div className="flex w-[30%] flex-col gap-2 text-white">
          <p>Pages</p>
          <Link
            to="/"
            className="cursor-pointer opacity-30 duration-1000 hover:opacity-100"
          >
            Home
          </Link>
          <Link
            to={user?._id ? `/profile` : `/register`}
            className="cursor-pointer opacity-30 duration-1000 hover:opacity-100"
          >
            My Account
          </Link>
          <Link
            to={user?._id ? `/cart` : "/register"}
            className="cursor-pointer opacity-30 duration-1000 hover:opacity-100"
          >
            Shoping Cart
          </Link>
          <Link
            to={user?._id ? `/wishlist` : "/register"}
            className="cursor-pointer opacity-30 duration-1000 hover:opacity-100"
          >
            Wishlist
          </Link>
          <Link
            to="/aboutus"
            className="cursor-pointer opacity-30 duration-1000 hover:opacity-100"
          >
            About Us
          </Link>
        </div>
      </div>
      <div className="container flex flex-col items-center justify-between gap-2 py-6 text-white md:flex-row">
        <p className="opacity-30 duration-1000 hover:opacity-100">
          SwiftBuy eCommerce © {new Date().getFullYear()}. All Rights Reserved
        </p>
        <div className="flex gap-2 text-3xl">
          <img
            src="/Method=Visa.png"
            alt="/Method=Visa.png"
            width={41.98}
            height={31.97}
          />
          <img
            src="/Method=Mastercard.png"
            alt="Mastercard.png"
            width={40.97}
            height={38.97}
          />
          <img
            src="/Method=ApplePay.png"
            alt="ApplePay.png"
            width={42.97}
            height={34.97}
          />
        </div>
      </div>
    </footer>
  );
}
