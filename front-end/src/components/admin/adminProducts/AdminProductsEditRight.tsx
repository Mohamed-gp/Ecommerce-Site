import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaTrash, FaSpinner, FaPlus, FaSave } from "react-icons/fa";
import { motion } from "framer-motion";
import customAxios from "../../../utils/axios/customAxios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

interface Category {
  _id: string;
  name: string;
}

const AdminProductsEditRight = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [removedImageIndices, setRemovedImageIndices] = useState<number[]>([]);

  const [data, setData] = useState({
    name: "",
    category: "",
    description: "",
    promoPercentage: 0,
    price: 0,
    isFeatured: false,
    images: [] as string[],
  });

  const getCategories = async () => {
    try {
      const { data } = await customAxios.get("/categories");
      setCategories(data.data);
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  const getProductById = async () => {
    try {
      setIsLoading(true);
      const { data: responseData } = await customAxios.get(`/products/${id}`);
      const product = responseData.data;

      setData({
        name: product.name,
        category: product.category?._id || "",
        description: product.description,
        promoPercentage: product.promoPercentage,
        price: product.price,
        isFeatured: product.isFeatured,
        images: product.images || [],
      });

      setImagePreviewUrls(product.images || []);
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to load product");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProductById();
    getCategories();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));

    setImagePreviewUrls((prev) => [...prev, ...newPreviewUrls]);
    setNewImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    // If it's an original image, mark it for removal
    if (index < data.images.length) {
      setRemovedImageIndices((prev) => [...prev, index]);
    }

    // Remove from preview URLs
    const updatedPreviewUrls = [...imagePreviewUrls];
    updatedPreviewUrls.splice(index, 1);
    setImagePreviewUrls(updatedPreviewUrls);

    // If it's a newly added image
    if (index >= data.images.length) {
      const newImagesIndex = index - data.images.length;
      const updatedNewImages = [...newImages];
      updatedNewImages.splice(newImagesIndex, 1);
      setNewImages(updatedNewImages);
    }
  };

  const updateProductHandler = async () => {
    try {
      // Require at least one image
      if (imagePreviewUrls.length === 0) {
        return toast.error("Please upload at least one product image");
      }

      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("category", data.category);
      formData.append("description", data.description);
      formData.append("promoPercentage", data.promoPercentage.toString());
      formData.append("price", data.price.toString());
      formData.append("isFeatured", data.isFeatured.toString());

      // Add indices of images to remove
      formData.append(
        "removedImageIndices",
        JSON.stringify(removedImageIndices)
      );

      // Add new images
      for (let i = 0; i < newImages.length; i++) {
        formData.append("newImages", newImages[i]);
      }

      const response = await customAxios.put(`/products/${id}`, formData);
      toast.success(response.data.message);

      // Navigate back to products list
      navigate("/admin/products");
    } catch (error) {
      toast.error("Failed to update product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Discard changes?",
      text: "Any unsaved changes will be lost!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00c2ff",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, discard",
      cancelButtonText: "Continue editing",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/admin/products");
      }
    });
  };

  return (
    <div className="p-6 flex-1 bg-gray-50 overflow-y-auto">
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mainColor"></div>
            <p className="mt-4 text-gray-600">Loading product details...</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
            <span className="text-sm text-gray-500">ID: {id}</span>
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

            {/* Pricing & Settings */}
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
                    value={data.price}
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
                    value={data.promoPercentage}
                    onChange={(e) =>
                      setData({
                        ...data,
                        promoPercentage: parseInt(e.target.value),
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
                    {(data.price * (1 - data.promoPercentage / 100)).toFixed(2)}
                    <span className="ml-2 text-sm text-gray-500 font-normal">
                      ({data.promoPercentage}% off)
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

          {/* Image management section */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
              Product Images
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-4">
              {imagePreviewUrls.map((url, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`relative group ${
                    removedImageIndices.includes(index) ? "opacity-40" : ""
                  }`}
                >
                  <div className="aspect-square rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
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
              <p>• You can upload multiple images for a slider</p>
              <p>• At least one image is required</p>
              <p>• Removing an image will delete it when you save changes</p>
            </div>
          </div>

          {/* Form actions */}
          <div className="flex justify-end border-t pt-6 mt-6">
            <button
              type="button"
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg mr-4 hover:bg-gray-300 transition-colors flex items-center"
              onClick={handleCancel}
            >
              <FaTrash className="mr-2" /> Cancel
            </button>

            <button
              onClick={updateProductHandler}
              disabled={
                !data.name ||
                !data.category ||
                !data.description ||
                imagePreviewUrls.length === 0 ||
                isSubmitting
              }
              className="bg-mainColor text-white px-6 py-2 rounded-lg flex items-center disabled:opacity-60 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin mr-2" /> Updating...
                </>
              ) : (
                <>
                  <FaSave className="mr-2" /> Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductsEditRight;
