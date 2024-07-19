import { Link } from "react-router-dom";
import Product from "../product/Product";
import { useEffect, useState } from "react";
import customAxios from "../../utils/axios/customAxios";

const StoreProducts = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const { data } = await customAxios.get("/products");
      setProducts(data.data.slice(0, 4));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div id="store" className="container pt-6">
      <p className="pl-3 border-l-mainColor border-l-4 font-bold text-2xl">
        Store
      </p>
      <div className="flex gap-8 flex-wrap my-12 justify-center">
        {products.map((product) => (
          <Product product={product} />
        ))}
      </div>
      <div className="flex w-full justify-end">
        <Link
          to="/store"
          className="bg-mainColor text-white px-6  py-2 rounded-lg "
        >
          See All Products
        </Link>
      </div>
    </div>
  );
};
export default StoreProducts;
