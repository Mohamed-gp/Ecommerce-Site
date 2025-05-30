import React from "react";
import customAxios from "../../utils/axios/customAxios";
import toast from "react-hot-toast";

const AdminSettingsRight = () => {
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    siteName: "",
    siteDescription: "",
    contactEmail: "",
    socialLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await customAxios.put("/admin/settings", formData);
      toast.success("Settings updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update settings");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("socialLinks.")) {
      const socialField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="siteName"
              className="block text-sm font-medium text-gray-700"
            >
              Site Name
            </label>
            <input
              type="text"
              id="siteName"
              name="siteName"
              value={formData.siteName}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-mainColor focus:border-mainColor"
            />
          </div>

          <div>
            <label
              htmlFor="siteDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Site Description
            </label>
            <textarea
              id="siteDescription"
              name="siteDescription"
              value={formData.siteDescription}
              onChange={handleInputChange}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-mainColor focus:border-mainColor"
            />
          </div>

          <div>
            <label
              htmlFor="contactEmail"
              className="block text-sm font-medium text-gray-700"
            >
              Contact Email
            </label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-mainColor focus:border-mainColor"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 bg-mainColor text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Settings"}
        </button>
      </form>
    </div>
  );
};

export default AdminSettingsRight;
