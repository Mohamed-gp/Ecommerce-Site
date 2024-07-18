import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import customAxios from "../../../utils/axios/customAxios";
import toast from "react-hot-toast";

const AdminCouponsRight = () => {
  const [coupons, setCoupons] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(false);
  const getCategories = async () => {
    try {
      setLoading(true);
      const { data } = await customAxios.get("/categories");
      setCoupons(data.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const createCategoryHandler = async () => {
    try {
      const { data } = await customAxios.post("/categories", {
        name: coupon,
      });
      toast.success(data.message);
      setCoupon("");
      getCategories();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const deleteHandler = async (id: string) => {
    try {
      const { data } = await customAxios.delete(`categories/${id}`);
      toast.success(data.message);
      getCategories();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="p-6 flex-1">
      <p className="lg:text-2xl">Coupons </p>
      <div
        className="bg-white p-3 mt-2"
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
      >
        <p className="mb-6 border-b-2 pb-2 ">Coupons Names</p>
        {coupons.map((coupon) => (
          <div className="flex justify-between mb-4">
            <div className="flex items-center">
              <p className="pl-4">{coupon?.name}</p>
            </div>
            <div className="flex items-center gap-4 pr-4 ">
              <button
                onClick={() => deleteHandler(coupon?._id)}
                className="flex items-center gap-2 bg-red-500 py-2 px-4 text-white"
                style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
              >
                <FaTrash />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-full  items-center mt-4 justify-between">
        <input
          type="text"
          value={coupon}
          onChange={(e) => {
            setCoupon(e.target.value);
          }}
          placeholder="new coupon"
          className="pl-4 py-2 bg-white focus:outline-none  border-2"
        />
        <button
          onClick={() => createCategoryHandler()}
          disabled={coupon == "" || loading == true}
          className="bg-mainColor text-white px-6 py-2 rounded-lg  disabled:opacity-50"
        >
          {loading ? "Loading..." : "Add New Coupon"}
        </button>
      </div>
    </div>
  );
};
export default AdminCouponsRight;
