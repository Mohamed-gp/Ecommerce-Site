import React from "react";
import customAxios from "../../utils/axios/customAxios";
import toast from "react-hot-toast";

const AdminProductsAddRight = () => {
  const [loading, setLoading] = React.useState(false);
  const [productData, setProductData] = React.useState({
    name: "",
    description: "",
    price: 0,
    promoPercentage: 0,
    category: "",
    stock: 0,
    featured: false,
    images: [] as File[],
  });
  const [, setImagePreviews] = React.useState<string[]>([]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price.toString());
    formData.append("promoPercentage", productData.promoPercentage.toString());
    formData.append("category", productData.category);
    formData.append("stock", productData.stock.toString());
    formData.append("featured", productData.featured.toString());

    productData.images.forEach((image: File) => {
      formData.append("images", image);
    });

    try {
      await customAxios.post("/admin/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Product created successfully!");

      // Reset form
      setProductData({
        name: "",
        description: "",
        price: 0,
        promoPercentage: 0,
        category: "",
        stock: 0,
        featured: false,
        images: [],
      });
      setImagePreviews([]);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={submitHandler}>
        <button
          type="submit"
          disabled={loading}
          className="bg-mainColor text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default AdminProductsAddRight;
