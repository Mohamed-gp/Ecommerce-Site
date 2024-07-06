import { useSelector } from "react-redux";
import { IRootState } from "../../../redux/store";
import { FaEdit } from "react-icons/fa";

const AdminProductsRight = () => {
  const { user } = useSelector((state: IRootState) => state.auth);
  return (
    <div className="p-6 flex-1">
      <p className="lg:text-2xl">Products</p>
      <div
        className="bg-white p-3 mt-2"
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
      >
        <p className="mb-6 border-b-2 pb-2">Product Title</p>
        <div className="flex">
          <p className="pl-4">Iphone 14 Pro Max</p>
        </div>
        <div className="flex">
          <button>
            <FaEdit/>
            <span></span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default AdminProductsRight;
