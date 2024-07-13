import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import customAxios from "../../../utils/axios/customAxios";
import ZoomedImageStatic from "../../zooomedImage/ZoomedImageStatic";

const AdminProductsAddRight = () => {
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    try {
      const { data } = await customAxios.get("/categories");
      setCategories(data.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    getCategories();
  });

  const [data, setData] = useState({
    name: "",
    category: "",
    description: "",
    promotionPercentage: 1,
    price: 0,
    isFeatured: false,
    images: [],
    loading: false,
  });
  const createProductHandler = async () => {
    try {
      setData({ ...data, loading: true });
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("category", data.category);
      if (data.images.length != 4) {
        setData({ ...data, loading: false });
        return toast.error("you must enter 4 images of the product");
      }
      for (let i = 0; i < data.images?.length; i++) {
        formData.append("images", data.images[i]);
      }
      formData.append("description", data.description);
      formData.append(
        "promotionPercentage",
        data.promotionPercentage.toString()
      );
      formData.append("price", data.price.toString());
      formData.append("isFeatured", data.isFeatured.toString());
      const response = await customAxios.post("/products", formData);
      console.log(response.data);
      toast.success(response.data.message);
      setData({ ...data, loading: false });
    } catch (error: any) {
      setData({ ...data, loading: false });
      console.log(error);
      toast.error(error.response.data.message);
    }
  };



  return (
    <div className="p-6 flex-1">
      <p className="lg:text-2xl">Add A New Product</p>
      <div className="my-3">
        <p>Product Name</p>
        <input
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          type="text"
          placeholder="Enter Your Product Name"
          className="w-full pl-4 py-2 bg-white focus:outline-none my-2 border-2"
        />
      </div>
      <div className="my-3">
        <p>Category</p>
        <select
          name=""
          id=""
          defaultValue={data.category}
          onChange={(e) => setData({ ...data, category: e.target.value })}
          className="w-full pl-4 py-2 bg-white focus:outline-none my-2 border-2"
        >
          <option
            value={""}
            selected={data.category == ""}
            className="disabled:opacity-50"
            disabled
          >
            Enter The Category That Match Your Product
          </option>
          {categories?.map((category) => (
            <option value={category?._id}>{category?.name}</option>
          ))}
        </select>
      </div>
      <div className="my-3">
        <p>Images</p>

        <div className="flex gap-2 justify-between my-4">
          {Array.from(data.images).map((image) => (
            <>{image ? <ZoomedImageStatic imageSrc={image} /> : null}</>
          ))}
        </div>
      </div>
      <div className="flex w-full justify-end">
        <label
          htmlFor="admin-products-add"
          className="w-full text-center border-2  py-6  rounded-lg cursor-pointer "
        >
          You Must Enter 4 Images Of Your Product
        </label>
        <input
          multiple
          onChange={(e) => {
            if (e.target.files != null) {
              setData({ ...data, images: e.target.files as any });
            }
          }}
          className="hidden"
          type="file"
          name=""
          id="admin-products-add"
        />
      </div>
      <div className="my-3">
        <p>Description</p>
        <textarea
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          placeholder="enter the description of your new product"
          className="w-full px-4 py-2 bg-white focus:outline-none my-2 border-2"
        />
      </div>
      <div className="my-3">
        <p>Promotion Percentage</p>
        <input
          type="number"
          value={data.promotionPercentage}
          onChange={(e) =>
            setData({ ...data, promotionPercentage: +e.target.value })
          }
          min={1}
          max={99}
          placeholder="must be a number between 1 and 99"
          className="w-full  pl-4 py-2 bg-white focus:outline-none my-2 border-2"
        />
      </div>
      <div className="my-3">
        <p>Price</p>
        <input
          onChange={(e) => setData({ ...data, price: +e.target.value })}
          type="text"
          placeholder="$1200"
          className="w-full pl-4 py-2 bg-white focus:outline-none my-2 border-2"
        />
      </div>
      <div className="my-3">
        <p>Price After Discount</p>
        <input
          disabled
          value={(+data.price * (1 - +data.promotionPercentage / 100)).toFixed(
            2
          )}
          type="text"
          placeholder="$900"
          className="w-full opacity-50 cursor-not-allowed pl-4 py-2 bg-white focus:outline-none my-2 border-2"
        />
      </div>
      <div className="my-3 mt-6 flex justify-between items-center">
        <p className="">Is Featured</p>
        <div
          onClick={() => setData({ ...data, isFeatured: !data.isFeatured })}
          className={`relative justify-center items-center ${
            data.isFeatured ? "bg-mainColor" : "bg-mainColor/20"
          } w-[70px] h-[30px] rounded-xl py-1`}
        >
          <span
            className={`w-4 h-4 rounded-full absolute ${
              data.isFeatured ? "right-2" : "right-10"
            } top-1/2 -translate-y-1/2 ${
              data.isFeatured ? "bg-white" : "bg-mainColor"
            } duration-300`}
          ></span>
        </div>
      </div>
      <div className="flex w-full justify-end">
        <button
          disabled={
            data.category == "" ||
            data.description == "" ||
            data.images.length != 4 ||
            data.loading
          }
          onClick={() => createProductHandler()}
          className="bg-mainColor disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg mt-4 "
        >
          {data.loading == true ? "Loading..." : "Add Product"}
        </button>
      </div>
    </div>
  );
};
export default AdminProductsAddRight;
