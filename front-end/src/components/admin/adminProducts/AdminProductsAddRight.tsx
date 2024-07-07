const AdminProductsAddRight = () => {
  return (
    <div className="p-6 flex-1">
      <p className="lg:text-2xl">Add A New Product</p>
      <div className="my-3">
        <p>Product Name</p>
        <input
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
          className="w-full pl-4 py-2 bg-white focus:outline-none my-2 border-2"
        >
          <option value="" className="disabled:opacity-50" disabled selected>
            Enter The Category That Match Your Product
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
        <input className="hidden" type="file" name="" id="admin-products-add" />
      </div>
      <div className="my-3">
        <p>Description</p>
        <input
          type="text"
          placeholder="enter the description of your new product"
          className="w-full pl-4 py-2 bg-white focus:outline-none my-2 border-2"
        />
      </div>
      <div className="my-3">
        <p>Promotion Percentage</p>
        <input
          type="number"
          min={1}
          max={99}
          placeholder="must be a number between 1 and 99"
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
          disabled
          type="text"
          placeholder="$900"
          className="w-full pl-4 py-2 bg-white focus:outline-none my-2 border-2"
        />
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
export default AdminProductsAddRight;
