import { useState } from "react";
import { useAuthFormFormik } from "../hooks/useAuthFormFormik";
import axios from "axios";
import { CheckCircle } from "lucide-react";

function UpdateProfileModal({ isOpen, onClose, isVerified = true }) {
  const [preview, setPreview] = useState(null);

  const formik = useAuthFormFormik(
    "updateProfile",
    async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
        formData.append("email", values.email);
        formData.append("fullName", values.fullName);
        formData.append("mobile", values.mobile);
        if (values.avatar) {
          formData.append("avatar", values.avatar);
        }

        const res = await axios.put("/api/v1/user/update", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });

        alert(res.data.message || "Profile updated successfully");
        onClose();
      } catch (error) {
        alert(error.response?.data?.message || "Error updating profile");
      } finally {
        setSubmitting(false);
      }
    }
  );

  // 🚨 Nothing should render if modal is closed
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">Edit Profile</h1>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={preview || "/default-avatar.png"}
                alt="avatar"
                className="w-24 h-24 rounded-full object-cover border"
              />
              <label
                htmlFor="avatar"
                className="absolute bottom-0 right-0 bg-blue-600 text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-blue-700 transition"
              >
                Edit
              </label>
              <input
                id="avatar"
                type="file"
                name="avatar"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  formik.setFieldValue("avatar", file);
                  if (file) setPreview(URL.createObjectURL(file));
                }}
              />
            </div>
          </div>

          <div className="relative">
            <label className="input-label">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="John Doe"
              className="input-box w-full"
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <p className="p-error">{formik.errors.fullName}</p>
            )}
          </div>

          <div className="relative">
            <label className="input-label">Email</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="john@john.com"
                className="input-box w-full"
              />
              <div className="flex items-center gap-1 shrink-0">
                <CheckCircle
                  size={18}
                  className={isVerified ? "text-green-500" : "text-gray-400"}
                />
                <span
                  className={`text-sm ${
                    isVerified ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {isVerified ? "Verified" : "Not Verified"}
                </span>
              </div>
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="p-error">{formik.errors.email}</p>
            )}
          </div>

          <div className="relative">
            <label className="input-label">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="9876543210"
              className="input-box w-full"
            />
            {formik.touched.mobile && formik.errors.mobile && (
              <p className="p-error">{formik.errors.mobile}</p>
            )}
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="save-button"
            >
              {formik.isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfileModal;
