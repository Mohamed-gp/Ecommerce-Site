const submitHandler = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price.toString());
    formData.append("promoPercentage", productData.promoPercentage.toString());
    formData.append("category", productData.category);
    formData.append("stock", productData.stock.toString());
    formData.append("featured", productData.featured.toString());

    productData.images.forEach((image) => {
      formData.append("images", image);
    });

    const { data } = await customAxios.post("/admin/products", formData, {
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
      images: [],
      featured: false,
    });
    setImagePreviews([]);
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to create product");
  } finally {
    setLoading(false);
  }
};
