import { useEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import NewArrivals from "../../components/arrivals/NewArrivals";
import CategoryProductLine from "../../components/categoryProductLine/CategoryProductLine";
import StoreProducts from "../../components/store/StoreProducts";
import customAxios from "../../utils/axios/customAxios";

export default function Home() {
  useEffect(() => {
    scrollTo(0, 0);
    getAllCategories();
  }, []);
  const [categories, setCategories] = useState([]);
  const getAllCategories = async () => {
    try {
      const { data } = await customAxios.get("/categories");
      console.log(data);
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* disabled */}
      <Hero />
      <div className="bg-bgColorWhite">
        {/* new arrivals */}
        <NewArrivals />
        {/* store */}
        <StoreProducts />
        {/* Electronics and Gadgets */}
        {/* Books and Stationery */}
        {/* Sports and Fitness */}
        {/* Toys and Gamess */}
        {/* Home and Kitchen */}
        {categories?.map((category) => (
          <CategoryProductLine category={category} />
        ))}
      </div>
    </>
  );
}
