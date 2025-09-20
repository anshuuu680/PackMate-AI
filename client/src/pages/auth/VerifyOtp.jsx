import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthFormFormik } from "@/hooks/useAuthFormFormik";
import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Lock } from "lucide-react";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const mode = location.state?.mode || "verify-email";

  const formik = useAuthFormFormik("verifyOtp", async (values) => {
    if (mode === "forgot-password") {
      navigate("/auth/reset-password", { state: { email } });
      return;
    }

    if (mode === "verify-email") {
      const otpToken = localStorage.getItem("token");
      if (!otpToken) {
        return alert("OTP token is missing. Please resend the OTP.");
      }

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${otpToken}`,
          },
          withCredentials: true,
        };

        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/user/verify-otp`,
          { otp: formik.values.otp, email },
          config
        );

        if (res?.data?.statusCode === 200) {
          // Update user in localStorage
          const user = JSON.parse(localStorage.getItem("user")) || {};
          user.isVerified = true;
          localStorage.setItem("user", JSON.stringify(user));

          alert("Email verified successfully!");
          navigate("/profile"); // or wherever you want to redirect
        }
      } catch (error) {
        alert(error.response?.data?.message || "OTP verification failed");
      }
    }
  });

  const inputRefs = useRef([]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 1) return;

    const otpArray = formik.values.otp.split("");
    otpArray[index] = value;
    formik.setFieldValue("otp", otpArray.join(""));

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !formik.values.otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-primary/10 via-background to-background min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto p-3 rounded-lg bg-gray-100 w-fit">
            <Lock className="w-6 h-6 text-gray-600" />
          </div>
          <CardTitle className="text-2xl font-semibold">
            {mode === "forgot-password" ? "Reset Password" : "Verify OTP"}
          </CardTitle>
          <CardDescription>
            Enter the code sent to{" "}
            <span className="font-medium">{email || "your email address"}</span>
            .
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="flex gap-3 justify-center">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  type="text"
                  maxLength={1}
                  value={formik.values.otp[i] || ""}
                  onChange={(e) => handleOtpChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className="w-12 h-12 border rounded-lg text-center text-lg outline-none focus:border-sky-600 focus:border-2"
                />
              ))}
            </div>

            {formik.touched.otp && formik.errors.otp && (
              <p className="text-sm text-red-500 text-center">
                {formik.errors.otp}
              </p>
            )}

            <Button type="submit" className="w-full">
              {mode === "forgot-password" ? "Reset Password" : "Verify OTP"}
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              Didn’t receive the email?{" "}
              <a
                href={
                  mode === "forgot-password" ? "/auth/forgot-password" : "#"
                }
                className="text-blue-600 hover:underline"
              >
                Resend code
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
