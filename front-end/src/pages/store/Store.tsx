import { useEffect, useState, useCallback } from "react";
import { FaSearch, FaStar, FaSpinner, FaFilter } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ReactSlider from "react-slider";
import { toast } from "react-hot-toast";
import customAxios from "../../utils/axios/customAxios";
import { Product as ProductInterface } from "../../interfaces/dbInterfaces";
import Product from "../../components/product/Product";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

interface Category {
  _id: string;
  name: string;
}

interface ProductWithRating extends ProductInterface {
  avgRating?: number;
}

export default function Store() {
  const location = useLocation();

  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [sortBy, setSortBy] = useState("newest");
  const [selectedRating, setSelectedRating] = useState(0);

  // Get URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    if (category) {
      setSelectedCategory(category);
    }
  }, [location]);

  const getCategories = async () => {
    try {
      const { data } = await customAxios.get("/categories");
      setCategories(data.data);
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  const getProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      let url = "/products?";

      if (selectedCategory) {
        url += `category=${selectedCategory}&`;
      }
      if (searchTerm) {
        url += `search=${searchTerm}&`;
      }
      if (priceRange.min > 0 || priceRange.max < 10000) {
        url += `minPrice=${priceRange.min}&maxPrice=${priceRange.max}&`;
      }
      if (selectedRating > 0) {
        url += `minRating=${selectedRating}&`;
      }
      if (sortBy) {
        url += `sort=${sortBy}`;
      }

      const { data } = await customAxios.get(url);
      const filteredProducts = data.data;

      // Client-side sorting
      switch (sortBy) {
        case "price-low":
          filteredProducts.sort(
            (a: ProductInterface, b: ProductInterface) =>
              a.price * (1 - a.promoPercentage / 100) -
              b.price * (1 - b.promoPercentage / 100)
          );
          break;
        case "price-high":
          filteredProducts.sort(
            (a: ProductInterface, b: ProductInterface) =>
              b.price * (1 - b.promoPercentage / 100) -
              a.price * (1 - a.promoPercentage / 100)
          );
          break;
        case "rating":
          filteredProducts.sort((a: ProductInterface, b: ProductInterface) => {
            const aRating = (a as ProductWithRating).avgRating || 0;
            const bRating = (b as ProductWithRating).avgRating || 0;
            return bRating - aRating;
          });
          break;
        // "newest" is default from backend
      }

      setProducts(filteredProducts);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, searchTerm, priceRange, selectedRating, sortBy]);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    getProducts();
  };

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-mainColor to-blue-600 py-16 text-white">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Store</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Discover the latest products with amazing quality and unbeatable
            prices
          </p>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        {/* Mobile Filter Toggle */}
        <button
          className="md:hidden w-full mb-4 flex items-center justify-center gap-2 bg-mainColor text-white py-2 rounded-lg"
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        >
          <FaFilter /> {isMobileFilterOpen ? "Hide Filters" : "Show Filters"}
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div
            className={`md:w-64 flex-shrink-0 ${
              isMobileFilterOpen ? "block" : "hidden md:block"
            }`}
          >
            <div className="bg-white rounded-xl p-4 shadow-sm">
              {/* Search */}
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-mainColor focus:ring-1 focus:ring-mainColor"
                  />
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </form>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="all"
                      name="category"
                      checked={selectedCategory === ""}
                      onChange={() => setSelectedCategory("")}
                      className="w-4 h-4 text-mainColor border-gray-300 focus:ring-mainColor"
                    />
                    <label htmlFor="all" className="ml-2 text-gray-700">
                      All Categories
                    </label>
                  </div>
                  {categories.map((category: Category) => (
                    <div key={category._id} className="flex items-center">
                      <input
                        type="radio"
                        id={category._id}
                        name="category"
                        checked={selectedCategory === category.name}
                        onChange={() => setSelectedCategory(category.name)}
                        className="w-4 h-4 text-mainColor border-gray-300 focus:ring-mainColor"
                      />
                      <label
                        htmlFor={category._id}
                        className="ml-2 text-gray-700"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="px-2 py-4">
                  <ReactSlider
                    className="h-1 bg-gray-200 rounded-md"
                    thumbClassName="w-4 h-4 bg-mainColor rounded-full -mt-1.5 focus:outline-none focus:ring-2 focus:ring-mainColor/30"
                    trackClassName="h-1 bg-mainColor rounded-md"
                    value={[priceRange.min, priceRange.max]}
                    min={0}
                    max={10000}
                    onChange={([min, max]: [number, number]) =>
                      setPriceRange({ min, max })
                    }
                    pearling
                    minDistance={10}
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>${priceRange.min}</span>
                    <span>${priceRange.max}</span>
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Rating</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <input
                        type="radio"
                        id={`rating-${rating}`}
                        name="rating"
                        checked={selectedRating === rating}
                        onChange={() => setSelectedRating(rating)}
                        className="w-4 h-4 text-mainColor border-gray-300 focus:ring-mainColor"
                      />
                      <label
                        htmlFor={`rating-${rating}`}
                        className="ml-2 flex items-center text-gray-700"
                      >
                        {[...Array(rating)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-400 text-sm" />
                        ))}
                        {[...Array(5 - rating)].map((_, i) => (
                          <FaStar key={i} className="text-gray-300 text-sm" />
                        ))}
                        <span className="ml-1">& up</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Options */}
            <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">
                  {products.length} Products found
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-1.5 focus:border-mainColor focus:ring-1 focus:ring-mainColor"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <FaSpinner className="animate-spin text-mainColor text-3xl" />
              </div>
            ) : products.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {products.map((product) => (
                  <motion.div key={product._id} variants={itemVariants}>
                    <Product product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
