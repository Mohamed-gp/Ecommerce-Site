import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import customAxios from "../../../utils/axios/customAxios";

const AdminProductsAddRight = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    images: "" as any,
    description: "",
    promotionPercentage: 1,
    price: 0,
    isFeatured: false,
  });
  useEffect(() => {
    console.log(data.images);
    console.log(data.category);
  }, [data]);
  const createProductHandler = async () => {
    try {
      const response = await customAxios.post("/products", data);
      console.log(response.data);
    } catch (error: any) {
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
          // value={data.name}
          onChange={(e) => console.log(e.target.value)}
          className="w-full pl-4 py-2 bg-white focus:outline-none my-2 border-2"
        >
          <option value="disabled" className="disabled:opacity-50" disabled>
            Enter The Category That Match Your Product
          </option>
          <option value="Electronics and Gadgets">
            Electronics and Gadgets
          </option>
          <option value="Degital">Degital</option>
          <option value="Books and Stationery">Books and Stationery</option>
          <option value="Sports and Fitness">Sports and Fitness</option>
          <option value="Home and Kitchen">Home and Kitchen</option>
          <option value="Toys and Games">Toys and Games</option>
        </select>
      </div>
      <div className="my-3">
        <p>Images</p>

        {/* <div className="flex gap-2 justify-between my-4">
          <ZoomedImageStatic imageSrc="/iphone-15-pro-finish-select-202309-6-7inch_AV1.webp" />
          <ZoomedImageStatic imageSrc="/iphone-15-pro-finish-select-202309-6-7inch_AV2_GEO_US.webp" />
          <ZoomedImageStatic imageSrc="/iphone-15-pro-finish-select-202309-6-7inch_AV3.webp" />
          <ZoomedImageStatic imageSrc="/iphone-15-pro-finish-select-202309-6-7inch_AV4.webp" />
        </div> */}
      </div>
      <div className="flex w-full justify-end">
        <label
          htmlFor="admin-products-add"
          className="w-full text-center border-2  py-6  rounded-lg cursor-pointer "
        >
          Add 4 Images Of Your Product
        </label>
        <input
          multiple
          onChange={(e) => setData({ ...data, images: e.target.files })}
          className="hidden"
          type="file"
          name=""
          id="admin-products-add"
        />
      </div>
      <div className="my-3">
        <p>Description</p>
        <input
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          type="text"
          placeholder="enter the description of your new product"
          className="w-full pl-4 py-2 bg-white focus:outline-none my-2 border-2"
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
          value={+data.price * (1 - +data.promotionPercentage / 100)}
          type="text"
          placeholder="$900"
          className="w-full pl-4 py-2 bg-white focus:outline-none my-2 border-2"
        />
      </div>
      <div className="my-3 flex justify-between items-center">
        <p className="mt-6">Is Featured</p>
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
          disabled={data.name == "" || data.category == ""}
          onClick={() => createProductHandler()}
          className="bg-mainColor disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg mt-4 "
        >
          Add Product
        </button>
      </div>
    </div>
  );
};
export default AdminProductsAddRight;
