import { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaHeart,
  FaList,
  FaRegHeart,
  FaTrash,
  FaTh,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { Product } from "../../interfaces/dbInterfaces";
import ProductComp from "../../components/product/Product";
import { Link } from "react-router-dom";
import customAxios from "../../utils/axios/customAxios";
import { authActions } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";

export default function Wishlist() {
  const { wishlist } = useSelector((state: IRootState) => state.auth.user);
  const user = useSelector((state: IRootState) => state.auth.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("");
  const [displayWishlist, setDisplayWishlist] = useState(wishlist || []);

  const toggleWishListHandler = async (productId: string) => {
    try {
      setIsLoading(true);
      const { data } = await customAxios.post("/products/wishlist", {
        userId: user._id,
        productId,
      });
      dispatch(authActions.setWishlist(data.data));
      toast.success("Item removed from wishlist");
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove item from wishlist");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Apply sorting to wishlist items
    let sorted = [...(wishlist || [])];

    if (sortBy === "price-asc") {
      sorted.sort(
        (a: any, b: any) =>
          a.price * (1 - a.promoPercentage / 100) -
          b.price * (1 - b.promoPercentage / 100)
      );
    } else if (sortBy === "price-desc") {
      sorted.sort(
        (a: any, b: any) =>
          b.price * (1 - b.promoPercentage / 100) -
          a.price * (1 - a.promoPercentage / 100)
      );
    } else if (sortBy === "name-asc") {
      sorted.sort((a: any, b: any) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      sorted.sort((a: any, b: any) => b.name.localeCompare(a.name));
    }

    setDisplayWishlist(sorted);
  }, [wishlist, sortBy]);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Apply fade-in animation after component mounts
    setTimeout(() => {
      setFadeIn(true);
    }, 100);
  }, []);

  const addAllToCart = async () => {
    if (!wishlist || wishlist.length === 0) return;

    setIsLoading(true);
    let successCount = 0;

    for (const product of wishlist) {
      try {
        await customAxios.post("/cart/add", {
          userId: user._id,
          productId: product._id,
        });
        successCount++;
      } catch (error) {
        console.log(error);
      }
    }

    if (successCount > 0) {
      // Refresh cart data
      try {
        const { data } = await customAxios.get(`/users/${user._id}`);
        if (data.data.cart) {
          dispatch(authActions.setCart(data.data.cart));
        }
        toast.success(
          `Added ${successCount} item${successCount > 1 ? "s" : ""} to cart`
        );
      } catch (error) {
        console.log(error);
      }
    }

    setIsLoading(false);
  };

  return (
    <>
      {wishlist && wishlist?.length != 0 ? (
        <div
          className={`container pt-6 mt-6 transition-opacity duration-500 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-wrap justify-between items-center mb-6">
            <div>
              <p className="pl-3 border-l-mainColor border-l-4 font-bold text-2xl">
                Wishlist
              </p>
              <p className="text-gray-600 pl-3 mt-1">
                {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
              </p>
            </div>

            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              {/* View toggle */}
              <div className="flex border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${
                    viewMode === "grid" ? "bg-mainColor text-white" : "bg-white"
                  }`}
                >
                  <FaTh />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${
                    viewMode === "list" ? "bg-mainColor text-white" : "bg-white"
                  }`}
                >
                  <FaList />
                </button>
              </div>

              {/* Sort dropdown */}
              <select
                className="border rounded-lg p-2 focus:outline-none"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Sort by</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A-Z</option>
                <option value="name-desc">Name: Z-A</option>
              </select>

              {/* Add all to cart */}
              <button
                onClick={addAllToCart}
                className="bg-mainColor text-white px-3 py-2 rounded-lg hover:bg-[#00aae6] transition-colors text-sm sm:text-base"
              >
                Add All to Cart
              </button>
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="flex gap-8 flex-wrap my-12 justify-center">
              {displayWishlist?.map((product: Product, index: number) => (
                <div
                  key={product._id}
                  className="relative group animate-fadeIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className="absolute z-10 -right-2 -top-2 w-8 h-8 bg-red-500 rounded-full flex justify-center items-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
                    onClick={() => toggleWishListHandler(product._id)}
                    style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 3px 8px" }}
                  >
                    <FaTrash className="text-white text-sm" />
                  </div>
                  <ProductComp product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4 my-8">
              {displayWishlist?.map((product: Product, index: number) => (
                <div
                  key={product._id}
                  className="flex bg-white rounded-lg p-4 shadow-md animate-fadeIn relative group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-24 h-24 mr-4 flex-shrink-0">
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-grow">
                    <h3 className="font-bold mb-1">{product.name}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-mainColor font-bold">
                        $
                        {(
                          product.price *
                          (1 - product.promoPercentage / 100)
                        ).toFixed(2)}
                      </span>
                      {product.promoPercentage > 0 && (
                        <>
                          <span className="line-through text-gray-400 ml-2">
                            ${product.price.toFixed(2)}
                          </span>
                          <span className="bg-red-500 text-white text-xs px-1 py-0.5 rounded ml-2">
                            {product.promoPercentage}% OFF
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <button
                      onClick={() => toggleWishListHandler(product._id)}
                      className="text-red-500 p-2 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <FaTrash />
                    </button>
                    <Link
                      to={`/product/${product._id}`}
                      className="text-mainColor p-2 hover:bg-mainColor/10 rounded-full transition-colors"
                    >
                      <FaHeart />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-center my-6">
            <Link
              to="/store"
              className="animation-right-arrow-father flex items-center gap-2 rounded-xl bg-mainColor px-6 py-2 text-white transition-all hover:shadow-lg"
            >
              Continue Shopping
              <div className="animation-right-arrow">
                <FaArrowRight />
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div
            className={`container flex flex-col items-center justify-center py-14 transition-opacity duration-500 ${
              fadeIn ? "opacity-100" : "opacity-0"
            }`}
            style={{ minHeight: `calc(100vh - 70.94px)` }}
          >
            <div className="flex h-[150px] w-[150px] items-center justify-center rounded-full bg-[#F0F9F4] hover:bg-[#E0F5EA] transition-colors duration-300">
              <FaRegHeart className="h-1/2 w-1/2 text-mainColor animate-pulse" />
            </div>
            <p className="my-6 mb-2 text-3xl font-bold">
              Your wishlist is empty
            </p>
            <p className="opacity-60 text-center max-w-md">
              You don't have any products in the wishlist yet. You will find a
              lot of interesting products on our Shop page.
            </p>
            <Link
              to="/store"
              className="animation-right-arrow-father mt-6 rounded-xl bg-mainColor px-6 py-2 text-white transition-all hover:shadow-lg hover:bg-[#00aae6] flex items-center gap-2"
            >
              <span>Explore Products</span>
              <div className="animation-right-arrow">
                <FaArrowRight />
              </div>
            </Link>
          </div>
        </>
      )}

      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mainColor mb-4"></div>
            <p>Processing your request...</p>
          </div>
        </div>
      )}
    </>
  );
}
