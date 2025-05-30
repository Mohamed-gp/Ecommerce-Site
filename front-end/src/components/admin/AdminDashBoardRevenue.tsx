const getRevenue = async () => {
  try {
    const { data } = await customAxios.get("/admin/revenue");
    setRevenue(data.data);
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to load revenue data");
  } finally {
    setLoading(false);
  }
};
