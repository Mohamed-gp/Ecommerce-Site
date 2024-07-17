import { useEffect, useState } from "react";
import customAxios from "../../../utils/axios/customAxios";
import toast from "react-hot-toast";

const AdminCount = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const getUsersCountHandler = async () => {
    try {
      const { data } = await customAxios.get("/admin/users/count");
      setUsersCount(data.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const getProductsCountHandler = async () => {
    try {
      const { data } = await customAxios.get("/admin/products/count");
      setProductsCount(data.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const getCategoriesCountHandler = async () => {
    try {
      const { data } = await customAxios.get("/admin/categories/count");
      setCategoriesCount(data.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const getCommentsCountHandler = async () => {
    try {
      const { data } = await customAxios.get("/admin/comments/count");
      setCommentsCount(data.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    getUsersCountHandler();
    getProductsCountHandler();
    getCategoriesCountHandler();
    getCommentsCountHandler();
  }, []);
  return (
    <>
      <p className="mt-6 mb-2 font-bold">Dashboard</p>
      <div className="flex mt-4 justify-between lg:flex-row  flex-col gap-y-3 flex-wrap gap-1">
        <div
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          className="flex bg-white flex-col justify-center items-center p-6 rounded-lg lg:w-[49%] w-full"
        >
          <p>Users</p>
          <p className="text-mainColor text-xl  my-2">{usersCount}</p>
        </div>
        <div
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          className="flex bg-white flex-col justify-center items-center p-6 rounded-lg lg:w-[49%] w-full"
        >
          <p>Categories</p>
          <p className="text-mainColor text-xl  my-2">{categoriesCount}</p>
        </div>
        <div
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          className="flex bg-white flex-col justify-center items-center p-6 rounded-lg lg:w-[49%] w-full"
        >
          <p>Products</p>
          <p className="text-mainColor text-xl  my-2">{productsCount}</p>
        </div>
        <div
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          className="flex bg-white flex-col justify-center items-center p-6 rounded-lg lg:w-[49%] w-full"
        >
          <p>Comments</p>
          <p className="text-mainColor text-xl  my-2">{commentsCount}</p>
        </div>
      </div>
    </>
  );
};
export default AdminCount;
