import { useEffect, useState } from "react";
import ProductComp from "../../components/product/Product";
import customAxios from "../../utils/axios/customAxios";
import { useLocation, useNavigate } from "react-router-dom";
import { Product } from "../../interfaces/dbInterfaces";

interface Query {
  search: string | null;
  category: string | null;
}

const Store = () => {
  const [products, setProducts] = useState([]);
  const [savedProducts, setSavedProducts] = useState([]);
  const location = useLocation();
  const urlParams = new URLSearchParams(window.location.search);

  const getProducts = async () => {
    try {
      const { data } = await customAxios.get(
        `/products?search=${urlParams.get("search") || ""}`
      );
      setProducts(data.data);
      setSavedProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [location]);

  const [filter, setFilter] = useState({ order: "", category: "" });
  useEffect(() => {
    let sortedProducts = [...savedProducts];
    if (filter.order == "highToLow") {
      sortedProducts.sort(
        (a: Product, b: Product) =>
          b.price * (1 - b.promoPercentage / 100) -
          a.price * (1 - a.promoPercentage / 100)
      );
    } else if (filter.order == "lowToHigh") {
      sortedProducts.sort(
        (a: Product, b: Product) =>
          a.price * (1 - a.promoPercentage / 100) -
          b.price * (1 - b.promoPercentage / 100)
      );
    }
    if (filter.category != "") {
      sortedProducts = sortedProducts.filter(
        (product: Product) => product.category.name == filter.category
      );
    }

    setProducts(sortedProducts);
  }, [filter]);

  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    try {
      const { data } = await customAxios.get("/categories");
      setCategories(data.data);
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  });

  const removeFiltersHandler = async () => {
    try {
      const { data } = await customAxios.get(`/products`);
      setProducts(data.data);
      setSavedProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container pt-6 mt-6">
      <div className="flex justify-between items-center">
        <p className="pl-3 border-l-mainColor border-l-4 font-bold text-2xl">
          Store
        </p>
        <div className="flex gap-2">
          <select
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
            name=""
            id=""
            value={filter.category}
            className=" px-4 py-2 rounded-xl bg-mainColor text-white focus:outline-none"
          >
            <option value="" disabled className="flex ">
              <span>Category</span>
            </option>
            {categories?.map((category: any) => (
              <option value={category.name} className="flex p-6">
                {category.name}
              </option>
            ))}
          </select>{" "}
          <select
            onChange={(e) => setFilter({ ...filter, order: e.target.value })}
            name=""
            id=""
            value={filter.order}
            className=" px-4 focus:outline-none  py-2 rounded-xl bg-mainColor text-white"
          >
            <option value="" disabled className="flex ">
              <span>💵</span>
              <span>Price</span>
            </option>
            <option value="lowToHigh" className="flex p-6">
              <span>📈</span>
              <span>Low To High</span>
            </option>
            <option value="highToLow" className="flex p-6">
              <span>📉</span>
              <span>High To Low</span>
            </option>
          </select>
        </div>
      </div>

      {products.length == 0 ? (
        <div className="flex gap-8 flex-wrap justify-center">
          <div
            className="container flex flex-col  items-center justify-center py-14"
            style={{ minHeight: `calc(100vh - 70.94px)` }}
          >
            <p className="mb-2 text-3xl font-bold text-center">
              There Is No Product Match Your Search :(
            </p>
            <p className="opacity-60">Try Searching For Another Product!</p>
            <button
              onClick={() => removeFiltersHandler()}
              className="my-2 px-6 py-2 rounded-xl bg-mainColor text-white"
            >
              Remove Filters
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-8 flex-wrap my-12 justify-center">
          {products.map((product: Product) => (
            <ProductComp key={product?._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Store;
