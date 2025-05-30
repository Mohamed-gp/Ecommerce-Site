const getOrders = async () => {
  try {
    const { data } = await customAxios.get("/admin/orders");
    setOrders(data.data);
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to load orders");
  } finally {
    setLoading(false);
  }
};
