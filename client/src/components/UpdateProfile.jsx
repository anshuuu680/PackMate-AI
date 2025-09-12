import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { useAuthFormFormik } from "../hooks/useAuthFormFormik";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
        if (values.avatar) formData.append("avatar", values.avatar);

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Avatar */}
          <div className="flex justify-center">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={preview || "/default-avatar.png"} />
                <AvatarFallback>AP</AvatarFallback>
              </Avatar>
              <label
                htmlFor="avatar"
                className="absolute bottom-0 right-0 bg-blue-600 text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-blue-700 transition"
              >
                Edit
              </label>
              <input
                id="avatar"
                type="file"
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

          {/* Full Name */}
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="John Doe"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full"
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <p className="text-sm text-destructive">
                {formik.errors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="flex items-center gap-2">
              <Input
                id="email"
                type="text"
                placeholder="john@john.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full"
              />
              <div className="flex items-center gap-1">
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
              <p className="text-sm text-destructive">{formik.errors.email}</p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <Label htmlFor="mobile">Mobile</Label>
            <Input
              id="mobile"
              type="text"
              placeholder="9876543210"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full"
            />
            {formik.touched.mobile && formik.errors.mobile && (
              <p className="text-sm text-destructive">{formik.errors.mobile}</p>
            )}
          </div>

          {/* Footer Buttons */}
          <DialogFooter className="flex justify-end gap-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateProfileModal;
