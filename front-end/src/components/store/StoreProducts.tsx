import { Link } from "react-router-dom";
import Product from "../product/Product";

const StoreProducts = () => {
  return (
    <div className="container pt-6">
      <p className="pl-3 border-l-mainColor border-l-4 font-bold text-2xl">
        Store
      </p>
      <div className="flex gap-8 flex-wrap my-12 justify-center">
        <Product />
        <Product />
        <Product />
        <Product />
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
