import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { useAuthFormFormik } from "../../hooks/useAuthFormFormik.js";
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
import { useNavigate } from "react-router-dom";

function UpdateProfileModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [base64Avatar, setBase64Avatar] = useState(null);

  const formik = useAuthFormFormik(
    "updateProfile",
    async (values, { setSubmitting }) => {
      try {
        const token = localStorage.getItem("token");

        const payload = {
          email: values.email,
          fullName: values.fullName,
          mobile: values.mobile,
          isVerified: values.isVerified,
          avatar: base64Avatar,
        };

        const res = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/user/update-user`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        localStorage.setItem(
          "user",
          JSON.stringify({
            ...values,
            avatarUrl: preview || "/default-avatar.png",
          })
        );

        alert(res.data.message || "Profile updated successfully");
        onClose();
      } catch (error) {
        alert(error.response?.data?.message || "Error updating profile");
      } finally {
        setSubmitting(false);
      }
    }
  );

  // Load stored user data when modal opens
  useEffect(() => {
    if (isOpen) {
      const storedUser = JSON.parse(localStorage.getItem("user")) || {};
      formik.setFieldValue("fullName", storedUser.fullName || "");
      formik.setFieldValue("email", storedUser.email || "");
      formik.setFieldValue("mobile", storedUser.mobile || "");
      formik.setFieldValue("isVerified", storedUser.isVerified || false);
      setBase64Avatar(null);
      if (storedUser.avatarUrl) setPreview(storedUser.avatarUrl);
    }
  }, [isOpen]);

  // Convert avatar file to Base64
  const handleAvatarChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64Avatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle email verification
  const handleVerifyEmail = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/verify-email`,
        { email: formik.values.email },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (res?.data?.statusCode === 200) {
        navigate("/auth/verify-otp", {
          state: { email: formik.values.email, mode: "verify-email" },
        });
      }
    } catch (error) {
      alert(
        error.response?.data?.message || "Error sending verification email"
      );
    } finally {
      setLoading(false);
    }
  };

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
                  if (file) {
                    formik.setFieldValue("avatar", file);
                    setPreview(URL.createObjectURL(file));
                    handleAvatarChange(file);
                  }
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
              {...formik.getFieldProps("fullName")}
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
                disabled
                placeholder="john@john.com"
                {...formik.getFieldProps("email")}
              />
              {formik.values.isVerified ? (
                <div className="flex items-center gap-1">
                  <CheckCircle size={18} className="text-green-500" />
                  <span className="text-sm text-green-600">Verified</span>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleVerifyEmail}
                >
                  {loading ? "Verifying..." : "Verify"}
                </Button>
              )}
            </div>
          </div>

          {/* Mobile */}
          <div>
            <Label htmlFor="mobile">Mobile</Label>
            <Input
              id="mobile"
              type="text"
              placeholder="9876543210"
              {...formik.getFieldProps("mobile")}
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
