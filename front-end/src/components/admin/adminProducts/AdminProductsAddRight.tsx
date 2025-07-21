import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import customAxios from "../../../utils/axios/customAxios";
import { FaCloudUploadAlt, FaTrash, FaSpinner, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";

interface Category {
  _id: string;
  name: string;
}

const AdminProductsAddRight = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

  const [data, setData] = useState({
    name: "",
    category: "",
    description: "",
    promotionPercentage: 1,
    price: 0,
    isFeatured: false,
    images: [] as File[],
    loading: false,
  });

  const getCategories = async () => {
    try {
      const { data } = await customAxios.get("/categories");
      setCategories(data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    // Add new images to the existing ones
    const updatedImages = [...data.images, ...files];

    // Generate preview URLs for all images
    const updatedPreviewUrls = updatedImages.map((file) =>
      typeof file === "string" ? file : URL.createObjectURL(file)
    );

    setData({ ...data, images: updatedImages });
    setImagePreviewUrls(updatedPreviewUrls);
  };

  const removeImage = (index: number) => {
    const updatedImages = [...data.images];
    updatedImages.splice(index, 1);

    const updatedPreviewUrls = [...imagePreviewUrls];
    updatedPreviewUrls.splice(index, 1);

    setData({ ...data, images: updatedImages });
    setImagePreviewUrls(updatedPreviewUrls);
  };

  const createProductHandler = async () => {
    try {
      if (data.images.length < 1) {
        return toast.error("Please upload at least one product image");
      }

      setIsSubmitting(true);
      setData({ ...data, loading: true });

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("category", data.category);

      for (let i = 0; i < data.images.length; i++) {
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

      // Reset form after successful submission
      setData({
        name: "",
        category: "",
        description: "",
        promotionPercentage: 1,
        price: 0,
        isFeatured: false,
        images: [],
        loading: false,
      });
      setImagePreviewUrls([]);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsSubmitting(false);
      setData((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="p-6 flex-1 bg-gray-50 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
          <span className="text-sm text-gray-500">
            Fill in the product details below
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
              Basic Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  type="text"
                  placeholder="Enter product name"
                  className="w-full rounded-lg border border-gray-200 p-3 focus:border-mainColor focus:outline-none focus:ring-1 focus:ring-mainColor"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={data.category}
                  onChange={(e) =>
                    setData({ ...data, category: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-200 p-3 focus:border-mainColor focus:outline-none focus:ring-1 focus:ring-mainColor"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories?.map((category) => (
                    <option key={category?._id} value={category?._id}>
                      {category?.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={data.description}
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                  }
                  placeholder="Enter product description"
                  rows={4}
                  className="w-full rounded-lg border border-gray-200 p-3 focus:border-mainColor focus:outline-none focus:ring-1 focus:ring-mainColor"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Images */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
              Pricing & Settings
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={data.price || ""}
                  onChange={(e) =>
                    setData({ ...data, price: parseFloat(e.target.value) })
                  }
                  placeholder="0.00"
                  className="w-full rounded-lg border border-gray-200 p-3 focus:border-mainColor focus:outline-none focus:ring-1 focus:ring-mainColor"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount Percentage (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="99"
                  value={data.promotionPercentage}
                  onChange={(e) =>
                    setData({
                      ...data,
                      promotionPercentage: parseInt(e.target.value),
                    })
                  }
                  placeholder="0"
                  className="w-full rounded-lg border border-gray-200 p-3 focus:border-mainColor focus:outline-none focus:ring-1 focus:ring-mainColor"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price After Discount
                </label>
                <div className="flex items-center px-3 py-2 bg-gray-100 rounded-lg border border-gray-200 text-gray-700 font-semibold">
                  $
                  {(data.price * (1 - data.promotionPercentage / 100)).toFixed(
                    2
                  )}
                  <span className="ml-2 text-sm text-gray-500 font-normal">
                    ({data.promotionPercentage}% off)
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="text-sm font-medium text-gray-700">
                  Featured Product
                </label>
                <div
                  onClick={() =>
                    setData({ ...data, isFeatured: !data.isFeatured })
                  }
                  className="relative cursor-pointer"
                >
                  <div
                    className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                      data.isFeatured ? "bg-mainColor" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full shadow-sm transform transition-transform duration-300 ${
                        data.isFeatured ? "translate-x-6" : ""
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image upload section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
            Product Images
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {imagePreviewUrls.map((url, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative group"
              >
                <div className="aspect-square rounded-lg border border-gray-200 overflow-hidden">
                  <img
                    src={url}
                    alt={`Product image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                  <FaTrash size={12} />
                </button>
              </motion.div>
            ))}

            {/* Add image button */}
            <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-mainColor hover:bg-mainColor/5 transition-all">
              <FaPlus className="text-gray-400 text-2xl mb-2" />
              <span className="text-sm text-gray-500">Add Image</span>
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
            </label>
          </div>

          <div className="text-sm text-gray-500 mb-6">
            <p>• Upload at least one product image</p>
            <p>
              • You can upload multiple images for a slider (recommended: 2-6
              images)
            </p>
            <p>• Recommended size: 800x800 pixels</p>
            <p>• Maximum size: 5MB per image</p>
          </div>
        </div>

        {/* Form actions */}
        <div className="flex justify-end border-t pt-6 mt-6">
          <button
            type="button"
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg mr-4 hover:bg-gray-300 transition-colors"
            onClick={() => {
              setData({
                name: "",
                category: "",
                description: "",
                promotionPercentage: 1,
                price: 0,
                isFeatured: false,
                images: [],
                loading: false,
              });
              setImagePreviewUrls([]);
            }}
          >
            Cancel
          </button>

          <button
            onClick={createProductHandler}
            disabled={
              !data.name ||
              !data.category ||
              !data.description ||
              data.images.length === 0 ||
              isSubmitting
            }
            className="bg-mainColor text-white px-6 py-2 rounded-lg flex items-center disabled:opacity-60 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin mr-2" /> Creating...
              </>
            ) : (
              <>
                <FaCloudUploadAlt className="mr-2" /> Create Product
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductsAddRight;
