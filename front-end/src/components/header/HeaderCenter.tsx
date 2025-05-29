import { useEffect, useRef, useState } from "react";
import { FaMagnifyingGlass, FaSpinner } from "react-icons/fa6";
import customAxios from "../../utils/axios/customAxios";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "../../interfaces/dbInterfaces";
import toast from "react-hot-toast";

export default function HeaderCenter() {
  const [search, setSearch] = useState("");
  const [changeHandlerProducts, setChangeHandlerProduct] = useState<Product[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Handle click outside dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const searchHandler = () => {
    try {
      navigate(`/store?search=${search.split(" ").join("+")}`);
      setSearch("");
      setShowDropdown(false);
    } catch (error) {
      toast.error("Failed to search. Please try again.");
    }
  };

  const onChangeHandler = async () => {
    setLoading(true);
    try {
      const { data } = await customAxios.get(`/products?search=${search}`);
      setChangeHandlerProduct(data.data.slice(0, 4));
    } catch (error) {
      toast.error("Error fetching products");
      setChangeHandlerProduct([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search !== "") {
      onChangeHandler();
      setShowDropdown(true);
    } else {
      setChangeHandlerProduct([]);
      setShowDropdown(false);
    }
  }, [search]);

  return (
    <div className="flex items-center rounded-2xl border-2 border-solid border-[#dddddd] text-base md:text-lg relative">
      <div className="flex items-center justify-center rounded-l-xl p-2">
        <FaMagnifyingGlass />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchHandler();
        }}
        className="relative w-full"
        autoComplete="off"
      >
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[50px] pl-1 relative placeholder:text-[0px] focus:outline-none sm:w-[200px] sm:placeholder:text-sm md:w-[300px]"
          placeholder="Search for products"
          onFocus={() => search && setShowDropdown(true)}
          aria-label="Search for products"
        />
        {/* Dropdown */}
        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute left-0 top-12 w-full bg-white rounded-xl shadow-lg z-50 border border-gray-100 animate-fadeIn"
            tabIndex={-1}
          >
            {loading ? (
              <div className="flex items-center justify-center py-6">
                <FaSpinner className="animate-spin text-mainColor text-2xl" />
                <span className="ml-2 text-gray-500">Searching...</span>
              </div>
            ) : search && changeHandlerProducts.length === 0 ? (
              <div className="py-6 text-center text-gray-400">
                No results found
              </div>
            ) : (
              changeHandlerProducts.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-mainColor/10 transition-colors cursor-pointer border-b last:border-b-0"
                  onClick={() => {
                    setShowDropdown(false);
                    setSearch("");
                  }}
                >
                  <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50 border">
                    <img
                      src={product.images?.[0] || "/not-found-page.png"}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{product.name}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {product.description?.slice(0, 40)}
                      {product.description?.length > 40 ? "..." : ""}
                    </p>
                  </div>
                  {product.price && (
                    <span className="text-mainColor font-bold text-sm ml-2">
                      ${product.price}
                    </span>
                  )}
                </Link>
              ))
            )}
          </div>
        )}
      </form>
      <button
        onClick={searchHandler}
        disabled={search === ""}
        className="bg-mainColor disabled:opacity-50 h-full rounded-r-xl px-3 py-2 text-sm text-white hover:opacity-90 duration-300"
        aria-label="Search"
      >
        Search
      </button>
    </div>
  );
}
