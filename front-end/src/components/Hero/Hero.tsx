import { useEffect, useState } from "react";
import HeroProduct from "./HeroProduct";
import HeroSlider from "./HeroSlider";
import toast from "react-hot-toast";
import customAxios from "../../utils/axios/customAxios";

export default function Hero() {
  const [slideIndex, setslideIndex] = useState<number>(1);
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const { data } = await customAxios.get("/products/featured");
      setProducts(data.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div
      id="hero"
      className="Hero relative bg-bgColorBlack"
      style={{ minHeight: "calc(100vh - 70.94px)" }}
    >
      <HeroSlider slideIndex={slideIndex} setslideIndex={setslideIndex} />
      <div
        className={`flex serbas
         w-[300vw]  text-[white] duration-500 `}
        style={{ transform: `translateX(${-100 * slideIndex}vw)` }}
      >
        {products?.map((product) => (
          <HeroProduct product={product} />
        ))}
      </div>
    </div>
  );
}
