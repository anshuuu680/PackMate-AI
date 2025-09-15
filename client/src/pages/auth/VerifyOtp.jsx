import { useAuthFormFormik } from "../../hooks/useAuthFormFormik";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const formik = useAuthFormFormik("verifyOtp", (values) => {
    navigate("/auth/reset-password", { state: { email } });
  });

  const inputRefs = useRef([]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 1) return;

    const otpArray = formik.values.otp.split("");
    otpArray[index] = value;
    formik.setFieldValue("otp", otpArray.join(""));

    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !formik.values.otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="w-full bg-primary/5 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto p-3 rounded-lg bg-gray-100 w-fit">
            <Lock className="w-6 h-6 text-gray-600" />
          </div>
          <CardTitle className="text-2xl font-semibold">Verify OTP</CardTitle>
          <CardDescription>
            We sent a code to{" "}
            <span className="font-medium">{email || "your email address"}</span>
            .
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="flex gap-3 justify-center">
              {[0, 1, 2, 3, 4].map((i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  type="text"
                  maxLength={1}
                  value={formik.values.otp[i] || ""}
                  onChange={(e) => handleOtpChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className="w-12 h-12 border rounded-lg text-center text-lg outline-none  focus:border-sky-600 focus:border-2"
                />
              ))}
            </div>

            {/* Error */}
            {formik.touched.otp && formik.errors.otp && (
              <p className="text-sm text-red-500 text-center">
                {formik.errors.otp}
              </p>
            )}

            {/* Submit */}
            <Button type="submit" className="w-full">
              Verify OTP
            </Button>

            {/* Resend */}
            <p className="text-sm text-center text-muted-foreground">
              Didn’t receive the email?{" "}
              <a
                href="/auth/forgot-password"
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

export default VerifyOtp;
