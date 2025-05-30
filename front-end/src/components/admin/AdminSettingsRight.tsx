const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const { data } = await customAxios.put("/admin/settings", formData);
    toast.success("Settings updated successfully!");
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to update settings");
  } finally {
    setLoading(false);
  }
};
