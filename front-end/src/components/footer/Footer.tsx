import { Link } from "react-router-dom";
import HeaderLeft from "../header/HeaderLeft";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { HashLink } from "react-router-hash-link";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  const { user } = useSelector((state: IRootState) => state.auth);

  return (
    <footer className="bg-bgColorBlack">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex justify-center lg:justify-start">
              <HeaderLeft isFooter={true} />
            </div>
            <div className="space-y-4 text-gray-400">
              <div className="flex items-start space-x-3 group">
                <FaMapMarkerAlt className="mt-1 text-mainColor group-hover:scale-110 transition-transform" />
                <p className="hover:text-mainColor transition-colors">
                  4517 Washington Ave.
                  <br />
                  Manchester, Kentucky 39495
                </p>
              </div>
              <div className="flex items-center space-x-3 group">
                <FaPhone className="text-mainColor group-hover:scale-110 transition-transform" />
                <p className="hover:text-mainColor transition-colors">
                  (629) 555-0129
                </p>
              </div>
              <div className="flex items-center space-x-3 group">
                <FaEnvelope className="text-mainColor group-hover:scale-110 transition-transform" />
                <p className="hover:text-mainColor transition-colors">
                  SwiftBuy@kinbo.com
                </p>
              </div>
            </div>
            <div className="flex space-x-4 justify-center lg:justify-start">
              <a
                href="#"
                className="text-gray-400 hover:text-mainColor transition-colors"
              >
                <FaFacebook className="text-xl hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-mainColor transition-colors"
              >
                <FaTwitter className="text-xl hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-mainColor transition-colors"
              >
                <FaInstagram className="text-xl hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-mainColor transition-colors"
              >
                <FaLinkedin className="text-xl hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center lg:text-left">
            <h3 className="text-white font-semibold text-lg mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <HashLink
                  smooth
                  to="/#hero"
                  className="text-gray-400 hover:text-mainColor transition-colors inline-block"
                >
                  Hero
                </HashLink>
              </li>
              <li>
                <HashLink
                  smooth
                  to="/#newArrivals"
                  className="text-gray-400 hover:text-mainColor transition-colors inline-block"
                >
                  New Arrivals
                </HashLink>
              </li>
              <li>
                <HashLink
                  smooth
                  to="/#store"
                  className="text-gray-400 hover:text-mainColor transition-colors inline-block"
                >
                  Store
                </HashLink>
              </li>
            </ul>
          </div>

          {/* Pages */}
          <div className="text-center lg:text-left">
            <h3 className="text-white font-semibold text-lg mb-6">Pages</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-mainColor transition-colors inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={user?._id ? `/profile` : `/register`}
                  className="text-gray-400 hover:text-mainColor transition-colors inline-block"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  to={user?._id ? `/cart` : "/register"}
                  className="text-gray-400 hover:text-mainColor transition-colors inline-block"
                >
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link
                  to={user?._id ? `/wishlist` : "/register"}
                  className="text-gray-400 hover:text-mainColor transition-colors inline-block"
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  to="/aboutus"
                  className="text-gray-400 hover:text-mainColor transition-colors inline-block"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div className="text-center lg:text-left">
            <h3 className="text-white font-semibold text-lg mb-6">
              Payment Methods
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/Method=Visa.png"
                alt="Visa"
                className="hover:scale-105 transition-transform"
              />
              <img
                src="/Method=Mastercard.png"
                alt="Mastercard"
                className="hover:scale-105 transition-transform"
              />
              <img
                src="/Method=ApplePay.png"
                alt="Apple Pay"
                className="hover:scale-105 transition-transform"
              />
              <img
                src="/Method=Discover.png"
                alt="Discover"
                className="hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-center md:text-left">
              SwiftBuy eCommerce © {new Date().getFullYear()}. All Rights
              Reserved
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-mainColor transition-colors text-sm"
              >
                Privacy Policy
              </a>
              <span className="text-gray-600">•</span>
              <a
                href="#"
                className="text-gray-400 hover:text-mainColor transition-colors text-sm"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
