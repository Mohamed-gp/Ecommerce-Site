import { useEffect, useState } from "react";
import Product from "../../components/product/Product";
import customAxios from "../../utils/axios/customAxios";

interface Query {
  search: string | null;
  category: string | null;
}
const Store = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState<Query>({ search: "", category: "" });
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.get("search")
      ? setQuery({ ...query, search: urlParams.get("search") })
      : setQuery({ ...query, search: "" });
    urlParams.get("category")
      ? setQuery({ ...query, category: urlParams.get("category") })
      : setQuery({ ...query, category: "" });
  }, [location]);
  useEffect(() => {
    console.log(location.href);
    getProducts();
    scrollTo(0, 0);
  }, [location]);

  const getProducts = async () => {
    try {
      const { data } = await customAxios.get(
        `/products?search=${query.search}&category=${query.category}`
      );
      console.log(
        `/products?search=${query.search}&category=${query.category}`
      );
      setProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container pt-6 mt-6">
      <p className="pl-3 border-l-mainColor border-l-4 font-bold text-2xl">
        {query.category != "" ? query.category : "Store"}
      </p>
      <div className="flex gap-8 flex-wrap my-12 justify-center">
        {products.map((product) => (
          <Product product={product} />
        ))}
      </div>
    </div>
  );
};
export default Store;
