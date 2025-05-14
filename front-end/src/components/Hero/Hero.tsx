import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import customAxios from "../../utils/axios/customAxios";
import HeroProduct from "./HeroProduct";
import { Product } from "../../interfaces/dbInterfaces";

const Hero = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getFeaturedProducts = async () => {
    try {
      setIsLoading(true);
      const { data } = await customAxios.get("/products/featured");
      setFeaturedProducts(data.data);
    } catch (error) {
      console.error("Error fetching featured products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFeaturedProducts();
  }, []);

  if (isLoading) {
    return (
      <section className="relative h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mainColor"></div>
      </section>
    );
  }

  if (featuredProducts.length === 0) {
    return (
      <section className="relative h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Welcome to SwiftBuy
          </h2>
          <p className="text-white/80 mb-6">
            Discover amazing products in our store
          </p>
          <Link
            to="/store"
            className="mt-6 inline-flex items-center gap-2 bg-mainColor text-white px-8 py-3 rounded-full hover:bg-[#00aae6] transition-all duration-300"
          >
            Browse Products
            <FaArrowRight />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen bg-black">
      <Swiper
        className="h-full w-full"
        modules={[Pagination, Navigation, Autoplay, EffectFade]}
        slidesPerView={1}
        effect="fade"
        loop={true}
        pagination={{
          clickable: true,
          renderBullet: function (_, className) {
            return '<span class="' + className + ' !bg-mainColor"></span>';
          },
          el: '.hero-pagination'
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {featuredProducts.map((product) => (
          <SwiperSlide key={product._id}>
            <div className="relative w-full h-full bg-gradient-to-r from-black to-gray-900">
              <div className="absolute inset-0 opacity-40">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <HeroProduct product={product} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="hero-pagination absolute bottom-8 left-0 w-full z-[5] flex justify-center gap-2"></div>
      <div className="swiper-button-prev !text-white hover:!text-mainColor transition-colors duration-300" />
      <div className="swiper-button-next !text-white hover:!text-mainColor transition-colors duration-300" />
    </section>
  );
};

export default Hero;
