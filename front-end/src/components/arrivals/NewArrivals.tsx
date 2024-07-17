import { useEffect, useState } from "react";
import Product from "../product/Product";
import customAxios from "../../utils/axios/customAxios";
import { Link } from "react-router-dom";

export default function NewArrivals() {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const { data } = await customAxios.get("/products?newArrivals=true");
      setProducts(data.data.slice(0,4));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    scrollTo(0, 0);
    getProducts();
  }, []);
  return (
    <div className="container pt-6" id="newArrivals">
      <p className="pl-3  border-l-mainColor border-l-4 font-bold text-2xl">
        New Arrivals
      </p>
      <div className="flex gap-8 flex-wrap my-12 justify-center">
        {products.map((product) => (
          <Product product={product} />
        ))}
      </div>

    </div>
  );
}
