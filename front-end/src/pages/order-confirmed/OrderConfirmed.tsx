import { FaRegHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";

const OrderConfirmed = () => {
  return (
    <div
      className="container flex flex-row gap-x-12  items-center justify-center py-14"
      style={{ minHeight: `calc(100vh - 70.94px)` }}
    >
      <div className="img">
        <img src="/order.png" alt="" />
      </div>
    </div>
  );
};
export default OrderConfirmed;
