import { useEffect, useState } from "react";
import { Product } from "../../interfaces/dbInterfaces";
import customAxios from "../../utils/axios/customAxios";
import ProductComp from "../product/Product";
import { Link } from "react-router-dom";

interface CategoryProductLineProps {
  category: any;
}

export default function CategoryProductLine({
  category,
}: CategoryProductLineProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const getProductsByCategory = async () => {
    try {
      const { data } = await customAxios.get(
        `products?category=${category.name}`
      );
      setProducts(data.data.slice(0, 4));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProductsByCategory();
  }, []);
  return (
    <div className="container py-6">
      <p className="pl-3 border-l-mainColor border-l-4 font-bold text-2xl">
        {category?.name}
      </p>
      <div className="flex gap-8 flex-wrap my-12 justify-center">
        {products.map((product) => (
          <ProductComp product={product} />
        ))}
        <div className="flex w-full justify-end">
          <Link
            // to={`store?category=${category?.name.split(" ").join("+")}`}
            to={`/store`}
            className="bg-mainColor text-white px-6  py-2 rounded-lg "
          >
            See All Products
          </Link>
        </div>
      </div>
    </div>
  );
}
