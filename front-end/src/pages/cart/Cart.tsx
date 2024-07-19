import { useEffect, useState } from "react";
import { FaArrowRight, FaTrash, FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { authActions } from "../../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import customAxios from "../../utils/axios/customAxios";
import toast from "react-hot-toast";
import ZoomedImageStatic from "../../components/zooomedImage/ZoomedImageStatic";

export default function Cart() {
  const cart: any[] = useSelector((state: IRootState) => state.auth.user?.cart);
  const user = useSelector((state: IRootState) => state.auth.user);
  const dispatch = useDispatch();
  const [coupon, setCoupon] = useState("");
  const removeFromCartHandler = async (userId: string, productId: string) => {
    try {
      const { data } = await customAxios.delete(
        `/cart/delete/${userId}/${productId}`
      );
      dispatch(authActions.setCart(data.data));
      toast.success(data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const checkoutHandler = async () => {
    try {
      const { data } = await customAxios.post("/checkout", { cart });
      // window.open(data.data, "_blank");
      window.open(data.data, "_self");
      // dispatch(authActions.setCart([]));
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const addToCart = async (quantity: number, productId: string) => {
    try {
      const { data } = await customAxios.post("/cart/add", {
        userId: user._id,
        productId: productId,
        quantity,
      });
      dispatch(authActions.setCart(data.data));
      toast.success(data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const couponHandler = () => {
    toast.error("invalid copoun");
    setCoupon("");
  };

  return (
    <>
      {cart?.length != 0 ? (
        <>
          <div>
            <p className="my-6 mt-12 text-center text-xl font-bold">
              My Shopping Cart
            </p>
            <div className="w-[400px] sm:w-screen mx-auto overflow-auto">
              <table className=" mb-24 mt-12 w-screen ">
                <thead className="bg-mainColor py-2 text-white">
                  <tr className="">
                    <th>Product Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quanity</th>
                    <th>Subtotal</th>
                    <th className="">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart?.map((ele) => (
                    <tr className="relative">
                      <td>
                        <div className="mx-auto w-fit">
                          {/* <ZoomedImageStatic imageSrc={ele?.product?.images[0]} /> */}
                          <img
                            src={ele?.product?.images[0]}
                            alt="mac"
                            width={100}
                            height={100}
                          />
                        </div>
                      </td>
                      <td>
                        <p>{ele?.product?.name}</p>
                      </td>
                      <td>
                        $
                        {(
                          ele?.product?.price *
                          (1 - ele?.product?.promoPercentage / 100)
                        ).toFixed(2)}
                      </td>

                      <td className="">
                        <div className="flex w-fit mx-auto  bg-white border-2 border-solid p-2 rounded-3xl items-center gap-2">
                          <button
                            onClick={() =>
                              addToCart(ele.quantity - 1, ele?.product?._id)
                            }
                            disabled={ele?.quantity == 1}
                            className="bg-[#dadada] w-7 h-7 disabled:cursor-not-allowed  rounded-full flex justify-center items-center disabled:opacity-20"
                          >
                            -
                          </button>
                          <span>{ele?.quantity}</span>
                          <button
                            onClick={() =>
                              addToCart(ele.quantity + 1, ele?.product?._id)
                            }
                            className="bg-[#dadada] w-7 h-7  rounded-full flex justify-center items-center"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        $
                        {(
                          ele?.product?.price *
                          (1 - ele?.product?.promoPercentage / 100) *
                          ele?.quantity
                        ).toFixed(2)}
                      </td>
                      <td>
                        <div className="mx-auto w-fit cursor-pointer  text-bgColorDanger">
                          <FaTrash
                            onClick={() =>
                              removeFromCartHandler(
                                user?._id,
                                ele?.product?._id
                              )
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-bgColorCartFooter py-6">
            <div className="container my-6 flex lg:flex-row flex-col items-center gap-y-8 justify-between ">
              <div className="flex flex-col text-center ">
                <p className="text-xl font-bold">Discount Codes</p>
                <p className="opacity-60">
                  Enter your coupon code if you have one
                </p>
                <div className="my-2 flex border-solid border-mainColor">
                  <input
                    placeholder="enter your coupon"
                    className="rounded-l-xl  py-2 pl-3 focus:outline-none"
                    type="text"
                    onChange={(e) => setCoupon(e.target.value)}
                    value={coupon}
                  />
                  <button
                    disabled={coupon == ""}
                    onClick={() => couponHandler()}
                    className="rounded-r-xl disabled:opacity-50 disabled:cursor-not-allowed bg-mainColor px-4 text-sm sm:text-base text-white"
                  >
                    Apply Coupon
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-center gap-5 rounded-xl border-2 border-mainColor px-9 py-3">
                <p className="font-bold">Order Summary</p>
                <div className="flex flex-row gap-3">
                  <div className="flex flex-col gap-2">
                    <p>Sub Total </p>
                    <p>Shipping</p>
                    <p>Grand Total</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>
                      $
                      {cart
                        ?.reduce(
                          (acc, curr) =>
                            curr?.product?.price *
                              (1 - curr?.product?.promoPercentage / 100) *
                              curr?.quantity +
                            acc,
                          0
                        )
                        .toFixed(2)}{" "}
                    </p>
                    <p className="">Free</p>
                    <p>
                      $
                      {cart
                        ?.reduce(
                          (acc, curr) =>
                            curr?.product?.price *
                              (1 - curr?.product?.promoPercentage / 100) *
                              curr?.quantity +
                            acc,
                          0
                        )
                        .toFixed(2) - 0}{" "}
                      {/* minus 0 becase the shiping is free*/}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => checkoutHandler()}
              className="animation-right-arrow-father mx-auto flex items-center gap-2 rounded-xl bg-mainColor px-4 py-2 text-sm text-white"
            >
              <p>Proceed To Checkout</p>
              <div className="animation-right-arrow">
                <FaArrowRight />
              </div>
            </button>
          </div>
        </>
      ) : (
        <>
          <div
            className="container flex flex-col  items-center justify-center py-14"
            style={{ minHeight: `calc(100vh - 70.94px)` }}
          >
            <img
              src="/cart-empty-photo.png"
              alt="cart-empty"
              width={300}
              height={300}
            />
            <p className="my-6 mb-2 text-3xl font-bold">
              Your cart is empty and sad :(
            </p>
            <p className="opacity-60">Add something to make it happy!</p>
            <Link
              to="/store"
              className="mt-6 rounded-xl bg-mainColor px-6 py-2  text-white"
            >
              Continue Shoping
            </Link>
          </div>
        </>
      )}
    </>
  );
}
