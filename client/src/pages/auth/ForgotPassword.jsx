import { useAuthFormFormik } from "../../hooks/useAuthFormFormik";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

function ForgotPassword() {
  const navigate = useNavigate();
  const formik = useAuthFormFormik("forgotPassword", (values) => {
    navigate("/auth/verify-otp", { state: { email: values.email } });
  });

  return (
    <div className="w-full bg-primary/5 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md shadow-lg">
        {/* Header */}
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto p-3 rounded-lg bg-gray-100 w-fit">
            <Lock className="w-6 h-6 text-gray-600" />
          </div>
          <CardTitle className="text-2xl font-semibold">
            Forgot Password
          </CardTitle>
          <CardDescription>
            Enter your email below and we’ll send you a 5-digit code.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                name="email"
                placeholder="e.g. john@john.com"
                value={formik.values?.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-500">{formik.errors.email}</p>
              )}
            </div>

            <div className="flex justify-end">
              <a
                href="/auth/login"
                className="text-sm text-blue-600 hover:underline"
              >
                Back to Login
              </a>
            </div>

            <Button type="submit" className="w-full">
              Get 5-Digit Code
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ForgotPassword;
