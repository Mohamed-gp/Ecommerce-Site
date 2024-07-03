import {Link} from "react-router-dom";
import HeaderLeft from "../header/HeaderLeft";
import { FaApplePay, FaCcVisa } from "react-icons/fa6";

export default function Footer() {
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
          <p>info@kinbo.com</p>
        </div>
        <div className="flex w-[30%] flex-col gap-2 text-white">
          <p>Quick Links</p>
          <Link
            to=""
            className="cursor-pointer opacity-30 duration-1000 hover:opacity-100"
          >
            New Arrivals
          </Link>
          <Link
            to=""
            className="cursor-pointer opacity-30 duration-1000 hover:opacity-100"
          >
            Phones
          </Link>
          <Link
            to=""
            className="cursor-pointer opacity-30 duration-1000 hover:opacity-100"
          >
            Daily
          </Link>
        </div>
        <div className="flex w-[30%] flex-col gap-2 text-white">
          <p>Pages</p>
          <Link
            to=""
            className="cursor-pointer opacity-30 duration-1000 hover:opacity-100"
          >
            My Account
          </Link>
          <Link
            to=""
            className="cursor-pointer opacity-30 duration-1000 hover:opacity-100"
          >
            Shoping Cart
          </Link>
          <Link
            to=""
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
