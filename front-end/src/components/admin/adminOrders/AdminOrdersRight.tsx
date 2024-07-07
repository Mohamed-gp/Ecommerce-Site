import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";

const AdminOrdersRight = () => {
  return (
    <div className="p-6 flex-1">
      <p className="lg:text-2xl">Products</p>
      <table className="w-full">
        <thead>
          <tr>
            <td>DATE</td>
            <td>PAID</td>
            <td>RECIPIENT</td>
            <td>PRODUCTS</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{new Date().toUTCString().slice(0, 16)}</td>
            <td className="text-red-500">NO</td>
            <td>John Doe</td>
            <td>
              <div className="flex flex-col">
                <p>macbook 13 <span className="text-red-500">x1</span></p>
                <p>iphone 15 pro max <span className="text-red-500">x1</span></p>
                <p>redmi note 10 pro <span className="text-red-500">x1</span></p>
                <p>redmi note 11 <span className="text-red-500">x1</span></p>
              </div>
            </td>
          </tr>
          <tr>
            <td>{new Date().toUTCString().slice(0, 16)}</td>
            <td className="text-red-500">NO</td>
            <td>John Doe</td>
            <td>
              <div className="flex flex-col">
                <p>macbook 13 <span className="text-red-500">x1</span></p>
                <p>iphone 15 pro max <span className="text-red-500">x1</span></p>
                <p>redmi note 10 pro <span className="text-red-500">x1</span></p>
                <p>redmi note 11 <span className="text-red-500">x1</span></p>
              </div>
            </td>
          </tr>
          <tr>
            <td>{new Date().toUTCString().slice(0, 16)}</td>
            <td className="text-red-500">NO</td>
            <td>John Doe</td>
            <td>
              <div className="flex flex-col">
                <p>macbook 13 <span className="text-red-500">x1</span></p>
                <p>iphone 15 pro max <span className="text-red-500">x1</span></p>
                <p>redmi note 10 pro <span className="text-red-500">x1</span></p>
                <p>redmi note 11 <span className="text-red-500">x1</span></p>
              </div>
            </td>
          </tr>
          <tr>
            <td>{new Date().toUTCString().slice(0, 16)}</td>
            <td className="text-red-500">NO</td>
            <td>John Doe</td>
            <td>
              <div className="flex flex-col">
                <p>macbook 13 <span className="text-red-500">x1</span></p>
                <p>iphone 15 pro max <span className="text-red-500">x1</span></p>
                <p>redmi note 10 pro <span className="text-red-500">x1</span></p>
                <p>redmi note 11 <span className="text-red-500">x1</span></p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default AdminOrdersRight;
