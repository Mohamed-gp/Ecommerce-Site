import { useEffect, useState } from "react";
import ZoomedImageStatic from "../../zooomedImage/ZoomedImageStatic";
import { Product } from "../../../interfaces/dbInterfaces";

const AdminProductsEditRight = () => {
  const [isFeatured, setIsFeatured] = useState(false);
  const [product, setProduct] = useState<Product>();
  useEffect(() => {}, []);
  return (
    <div className="p-6 flex-1">
      <p className="lg:text-2xl">Edit Product</p>
      <div className="my-3">
        <p>Product Name</p>
        <input
          type="text"
          placeholder="Iphone 15 Pro Max"
          className="w-full pl-4 py-2 bg-white focus:outline-none my-2 border-2"
        />
      </div>
      <div className="my-3">
        <p>Category</p>
        <select
          name=""
          id=""
          className="w-full pl-4 py-2 bg-white focus:outline-none my-2 border-2"
        >
          <option value="" className="disabled:opacity-50" disabled>
            You can enter the valid category
          </option>
          <option value="">Electronics and Gadgets</option>
          <option value="" selected>
            Degital
          </option>
          <option value="">Books and Stationery</option>
          <option value="">Sports and Fitness</option>
          <option value="">Home and Kitchen</option>
          <option value="">Toys and Games</option>
        </select>
      </div>
      <div className="my-3">
        <p>Images</p>
        <div className="flex gap-2 justify-between my-4">
          <ZoomedImageStatic imageSrc="/iphone-15-pro-finish-select-202309-6-7inch_AV1.webp" />
          <ZoomedImageStatic imageSrc="/iphone-15-pro-finish-select-202309-6-7inch_AV2_GEO_US.webp" />
          <ZoomedImageStatic imageSrc="/iphone-15-pro-finish-select-202309-6-7inch_AV3.webp" />
          <ZoomedImageStatic imageSrc="/iphone-15-pro-finish-select-202309-6-7inch_AV4.webp" />
        </div>
      </div>
      <div className="flex w-full justify-end">
        <button className="bg-mainColor text-white px-6 py-2 rounded-lg mt-4 ">
          Edit Images
        </button>
      </div>
      <div className="my-3">
        <p>Description</p>
        <input
          type="text"
          placeholder="Iphone 15 Pro Max"
          className="w-full pl-4 py-2 bg-white focus:outline-none my-2 border-2"
        />
      </div>
      <div className="my-3">
        <p>Promotion Percentage</p>
        <input
          type="number"
          min={1}
          max={99}
          placeholder="50"
          className="w-full  pl-4 py-2 bg-white focus:outline-none my-2 border-2"
        />
      </div>
      <div className="my-3">
        <p>Original Price</p>
        <input
          type="text"
          placeholder="$1200"
          className="w-full pl-4 py-2 bg-white focus:outline-none my-2 border-2"
        />
      </div>
      <div className="my-3">
        <p>Price</p>
        <input
          type="text"
          placeholder="$900"
          className="w-full pl-4 py-2 bg-white focus:outline-none my-2 border-2"
        />
      </div>
      <div className="my-3 flex justify-between items-center">
        <p className="mt-6">Is Featured</p>
        <div
          onClick={() => setIsFeatured((prev) => !prev)}
          className={`relative justify-center items-center ${
            isFeatured ? "bg-mainColor" : "bg-mainColor/20"
          } w-[70px] h-[30px] rounded-xl py-1`}
        >
          <span
            className={`w-4 h-4 rounded-full absolute ${
              isFeatured ? "right-2" : "right-10"
            } top-1/2 -translate-y-1/2 ${
              isFeatured ? "bg-white" : "bg-mainColor"
            } duration-300`}
          ></span>
        </div>
      </div>
      <div className="flex w-full justify-end">
        <button
          disabled
          className="bg-mainColor disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg mt-4 "
        >
          Edit Product
        </button>
      </div>
    </div>
  );
};
export default AdminProductsEditRight;
