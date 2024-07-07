import { useSelector } from "react-redux";
import { IRootState } from "../../../redux/store";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";

const AdminProductsRight = () => {
  const { user } = useSelector((state: IRootState) => state.auth);
  return (
    <div className="p-6 flex-1">
      <p className="lg:text-2xl">Products</p>
      <div
        className="bg-white p-3 mt-2"
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
      >
        <p className="mb-6 border-b-2 pb-2 ">Product Title</p>
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <p className="pl-4">Iphone 14 Pro Max</p>
          </div>
          <div className="flex items-center gap-4 pr-4 ">
            <Link to="/admin/products/edit/idofproducttoedit"
              className="flex items-center gap-2  py-2 px-4  "
              style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
            >
              <FaEdit />
              <span>Edit</span>
            </Link>
            <button
              className="flex items-center gap-2 bg-red-500 py-2 px-4 text-white"
              style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
            >
              <FaTrash />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-end">
        <Link to="/admin/products/add" className="bg-mainColor text-white px-6 py-2 rounded-lg mt-4 ">
          Add New Product
        </Link>
      </div>
    </div>
  );
};
export default AdminProductsRight;
