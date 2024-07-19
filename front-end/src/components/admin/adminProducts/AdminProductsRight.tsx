import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import customAxios from "../../../utils/axios/customAxios";
import toast from "react-hot-toast";
import { Product } from "../../../interfaces/dbInterfaces";

const AdminProductsRight = () => {
  const [products, setProducts] = useState<Product[]>();
  const getAllProducts = async () => {
    try {
      const { data } = await customAxios.get("/products");
      setProducts(data.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  const deleteHandler = async (id: string) => {
    try {
      const { data } = await customAxios.delete(`/products/${id}`);
      getAllProducts();
      toast.success(data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="p-6 flex-1">
      <p className="lg:text-2xl">Products</p>
      <div
        className="bg-white p-3 mt-2"
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
      >
        <p className="mb-6 border-b-2 pb-2 ">Product Title</p>
        {products?.map((product) => (
          <div className="flex justify-between mb-4">
            <div className="flex items-center">
              <p className="pl-4">{product?.name}</p>
            </div>
            <div className="flex items-center gap-4 pr-4 ">
              {/* <Link
                to={`/admin/products/edit/${product?._id}`}
                className="flex items-center gap-2  py-2 px-4  "
                style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
              >
                <FaEdit />
                <span>Edit</span>
              </Link> */}
              <button
                onClick={() => deleteHandler(product._id)}
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
      <div className="flex w-full justify-end">
        <Link
          to="/admin/products/add"
          className="bg-mainColor text-white px-6 py-2 rounded-lg mt-4 "
        >
          Add New Product
        </Link>
      </div>
    </div>
  );
};
export default AdminProductsRight;
