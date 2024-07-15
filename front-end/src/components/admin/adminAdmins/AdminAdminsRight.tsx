import { FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import customAxios from "../../../utils/axios/customAxios";
import toast from "react-hot-toast";

const AdminAdminsRight = () => {
  const [admins, setAdmins] = useState([]);
  const [adminEmail, setAdminEmail] = useState("");
  const getAdmins = async () => {
    try {
      const { data } = await customAxios.get("/admin/admins");
      setAdmins(data.data);
      
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const addAdminHandler = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const { data } = await customAxios.post("/admin/admins", {
        adminEmail,
      });
      toast.success(data.message);
      setAdminEmail("");
      getAdmins();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const deleteHandler = async (id: string) => {
    try {
      
      const { data } = await customAxios.delete(`/admin/admins/${id}`);
      toast.success(data.message);
      getAdmins();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    getAdmins();
  }, []);
  return (
    <div className="p-6 flex-1">
      <p className="lg:text-2xl">Admins </p>
      <div
        className="bg-white p-3 mt-2"
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
      >
        <p className="mb-6 border-b-2 pb-2 ">Admines Emails</p>
        {admins?.map((admin) => (
          <div className="flex justify-between mb-4">
            <div className="flex items-center">
              <p className="pl-4">{admin?.email}</p>
            </div>
            <div className="flex items-center gap-4 pr-4 ">
              <button
                onClick={() => deleteHandler(admin?._id)}
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
      <form
        onSubmit={(e) => addAdminHandler(e)}
        className="flex w-full  items-center mt-4 justify-between"
      >
        <input
          type="email"
          value={adminEmail}
          onChange={(e) => {
            setAdminEmail(e.target.value);
          }}
          placeholder="new admin email"
          className="pl-4 py-2 bg-white focus:outline-none  border-2"
        />
        <button
          type="submit"
          disabled={adminEmail == ""}
          className="bg-mainColor text-white px-6 py-2 rounded-lg  disabled:opacity-50"
        >
          Add New Admin
        </button>
      </form>
    </div>
  );
};
export default AdminAdminsRight;
