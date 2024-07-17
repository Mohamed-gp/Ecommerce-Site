import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import customAxios from "../../utils/axios/customAxios";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { authActions } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";

interface HeroProductProps {
  product: any;
}

export default function HeroProduct({ product }: HeroProductProps) {
  const { user } = useSelector((state: IRootState) => state.auth);
  const dispatch = useDispatch();
  const addToCart = async () => {
    try {
      const { data } = await customAxios.post("/cart/add", {
        userId: user._id,
        productId: product._id,
      });
      dispatch(authActions.setCart(data.data));
      toast.success(data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div
      className="container relative z-50  flex h-full w-[100vw] flex-col-reverse flex-wrap items-center justify-center gap-2 gap-y-6 py-12 lg:flex-row lg:justify-between"
      style={{ minHeight: "calc(100vh - 70.94px)" }}
    >
      <div className="w-full  text-center leading-loose lg:w-1/2 lg:text-left px-16">
        <p className="mb-2 text-xl md:text-5xl font-bold">{product?.name}</p>
        <p className="opacity-60 md:text-base text-sm">
          {product?.description}
        </p>
        <div className="my-2">
          <div className="relative mx-auto w-fit text-3xl text-red-600 lg:mx-0">
            $
            {(product?.price * (1 - product?.promoPercentage / 100)).toFixed(2)}
            <del className="absolute bottom-0 left-full text-sm text-white">
              ${(product?.price).toFixed(2)}
            </del>
          </div>
          <p className="text-sm opacity-60">
            Don't miss this limited time offer.
          </p>
        </div>
        <div className=" flex-wrap my-6 flex items-center justify-center gap-3 font-bold lg:justify-normal">
          <Link
            to={`/product/${product._id}`}
            className="text-center rounded-xl bg-white px-3 py-1 text-[#201F20]"
          >
            Read More
          </Link>
          <button
            onClick={() => {
              addToCart();
            }}
            className="flex   items-center gap-1 rounded-xl bg-mainColor px-3 py-1 text-white"
          >
            <p>Add To Cart</p>
            <FaCartShopping />
          </button>
        </div>
      </div>
      <img src={product?.images[0]} alt="" width={400} height={400} />
    </div>
  );
}
