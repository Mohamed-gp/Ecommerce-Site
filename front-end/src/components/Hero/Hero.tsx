import {  useState } from "react";
import HeroProduct from "./HeroProduct";
import HeroSlider from "./HeroSlider";

export default function Hero() {
  const [slideIndex, setslideIndex] = useState<number>(0);
  return (
    <div
      className="Hero relative bg-bgColorBlack"
      style={{ minHeight: "calc(100vh - 70.94px)" }}
    >
      <HeroSlider slideIndex={slideIndex} setslideIndex={setslideIndex} />
      <div
        className="flex
         w-[300vw]  text-[white] duration-500"
        style={{ transform: `translateX(${-100 * slideIndex}vw)` }}
      >
        <HeroProduct />
        <HeroProduct />
        <HeroProduct />
      </div>
    </div>
  );
}
