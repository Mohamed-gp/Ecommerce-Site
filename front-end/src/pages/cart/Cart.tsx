import { useState } from "react";
import { FaArrowRight, FaTrash, FaXmark } from "react-icons/fa6";

export default function Cart() {
  const [state, setstate] = useState<boolean>(false);
  return (
    <>
      {state ? (
        <>
          <div>
            <p className="my-6 mt-12 text-center text-xl font-bold">
              My Shopping Cart 
            </p>
            <table className="mb-24 mt-12 w-screen ">
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
                <tr className="relative">
                  <td>
                    <div className="mx-auto w-fit">
                      <img
                        src="/618d5bS2lUL._AC_SX466_-removebg-preview.png"
                        alt="mac"
                        width={100}
                        height={100}
                      />
                    </div>
                  </td>
                  <td>
                    <p>MacBook Pro 16</p>
                  </td>
                  <td>$3990</td>
                  <td>2</td>
                  <td>${3990 * 2}</td>
                  <td>
                    <div className="mx-auto w-fit cursor-pointer  text-bgColorDanger">
                      <FaTrash />
                    </div>
                  </td>
                </tr>
                <tr className="relative">
                  <td>
                    <div className="mx-auto w-fit">
                      <img
                        src="/618d5bS2lUL._AC_SX466_-removebg-preview.png"
                        alt="mac"
                        width={100}
                        height={100}
                      />
                    </div>
                  </td>
                  <td>
                    <p>MacBook Pro 16</p>
                  </td>
                  <td>$3990</td>
                  <td>2</td>
                  <td>${3990 * 2}</td>
                  <td>
                    <div className="mx-auto w-fit cursor-pointer  text-bgColorDanger">
                      <FaTrash />
                    </div>
                  </td>
                </tr>
                <tr className="relative">
                  <td>
                    <div className="mx-auto w-fit">
                      <img
                        src="/618d5bS2lUL._AC_SX466_-removebg-preview.png"
                        alt="mac"
                        width={100}
                        height={100}
                      />
                    </div>
                  </td>
                  <td>
                    <p>MacBook Pro 16</p>
                  </td>
                  <td>$3990</td>
                  <td>2</td>
                  <td>${3990 * 2}</td>
                  <td>
                    <div className=" mx-auto w-fit cursor-pointer text-bgColorDanger">
                      <FaTrash />
                    </div>
                  </td>
                </tr>
                <tr className="relative">
                  <td>
                    <div className="flex items-center justify-center">
                      <img
                        src="/618d5bS2lUL._AC_SX466_-removebg-preview.png"
                        alt="mac"
                        width={100}
                        height={100}
                      />
                    </div>
                  </td>
                  <td>
                    <p>MacBook Pro 16</p>
                  </td>
                  <td>$3990</td>
                  <td>2</td>
                  <td>${3990 * 2}</td>
                  <td>
                    <div className="mx-auto w-fit cursor-pointer text-bgColorDanger">
                      <FaTrash />
                    </div>
                  </td>
                </tr>
                <tr className="relative">
                  <td>
                    <div className="mx-auto w-fit">
                      <img
                        src="/618d5bS2lUL._AC_SX466_-removebg-preview.png"
                        alt="mac"
                        width={100}
                        height={100}
                      />
                    </div>
                  </td>
                  <td>
                    <p>MacBook Pro 16</p>
                  </td>
                  <td>$3990</td>
                  <td>2</td>
                  <td>${3990 * 2}</td>
                  <td>
                    <div className="mx-auto w-fit cursor-pointer text-bgColorDanger">
                      <FaTrash />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-bgColorCartFooter py-6">
            <div className="container my-6 flex items-center justify-between ">
              <div className="flex flex-col">
                <p className="text-xl font-bold">Discount Codes</p>
                <p className="opacity-60">
                  Enter your coupon code if you have one
                </p>
                <div className="my-2 flex border-solid border-mainColor">
                  <input
                    placeholder="enter your coupon"
                    className="rounded-l-xl py-2 pl-3 focus:outline-none"
                    type="text"
                  />
                  <button className="rounded-r-xl bg-mainColor px-4 text-white">
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
                    <p>$2012 </p>
                    <p className="">Free</p>
                    <p>$2012</p>
                  </div>
                </div>
              </div>
            </div>
            <button className="animation-right-arrow-father mx-auto flex items-center gap-2 rounded-xl bg-mainColor px-4 py-2 text-sm text-white">
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
              src="/cart-empty-photo (copy).png"
              alt="cart-empty"
              width={300}
              height={300}
            />
            <p className="my-6 mb-2 text-3xl font-bold">
              Your cart is empty and sad :(
            </p>
            <p className="opacity-60">Add something to make it happy!</p>
            <button className="mt-6 rounded-xl bg-mainColor px-6 py-2  text-white">
              Continue Shoping
            </button>
          </div>
        </>
      )}
    </>
  );
}
