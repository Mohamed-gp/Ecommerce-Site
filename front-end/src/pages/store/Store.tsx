import { useEffect, useState } from "react";
import Product from "../../components/product/Product";
import customAxios from "../../utils/axios/customAxios";
import { useLocation, useNavigate } from "react-router-dom";

interface Query {
  search: string | null;
  category: string | null;
}

const Store = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState<Query>({ search: "", category: "" });
  const location = useLocation();
  const urlParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    const searchParam = urlParams.get("search") || "";
    const categoryParam = urlParams.get("category") || "";

    setQuery({
      ...query,
      search: searchParam,
      category: categoryParam,
    });
  }, [urlParams]);

  const getProducts = async () => {
    try {
      const { data } = await customAxios.get(
        `/products?search=${query.search}&category=${query.category}`
      );
      setProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [query]);

  return (
    <div className="container pt-6 mt-6">
      <p className="pl-3 border-l-mainColor border-l-4 font-bold text-2xl">
        {query.category !== "" ? query.category : "Store"}
      </p>
      <div className="flex gap-8 flex-wrap my-12 justify-center">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Store;
