import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import customAxios from "../../../utils/axios/customAxios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { IRootState } from "../../../redux/store";

const AdminCategoriesRight = () => {
  const user = useSelector((state: IRootState) => state.auth.user);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const getCategories = async () => {
    try {
      setLoading(true);
      const { data } = await customAxios.get("/categories");
      setCategories(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  const createCategoryHandler = async () => {
    try {
      const { data } = await customAxios.post(
        "/categories",
        {
          name: category,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      toast.success(data.message);
      setCategory("");
      getCategories();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const deleteHandler = async (id: string) => {
    try {
      const { data } = await customAxios.delete(`categories/${id}`);
      toast.success(data.message);
      getCategories();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="p-6 flex-1">
      <p className="lg:text-2xl">Categories </p>
      <div
        className="bg-white p-3 mt-2"
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
      >
        <p className="mb-6 border-b-2 pb-2 ">Categories Names</p>
        {categories.map((category) => (
          <div className="flex justify-between mb-4">
            <div className="flex items-center">
              <p className="pl-4">{category?.name}</p>
            </div>
            <div className="flex items-center gap-4 pr-4 ">
              <button
                onClick={() => deleteHandler(category?._id)}
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
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          placeholder="new category"
          className="pl-4 py-2 bg-white focus:outline-none  border-2"
        />
        <button
          onClick={() => createCategoryHandler()}
          disabled={category == "" || loading == true}
          className="bg-mainColor text-white px-6 py-2 rounded-lg  disabled:opacity-50"
        >
          {loading ? "Loading..." : "Add New Category"}
        </button>
      </div>
    </div>
  );
};
export default AdminCategoriesRight;
