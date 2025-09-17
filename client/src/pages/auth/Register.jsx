import { useAuthFormFormik } from "../../hooks/useAuthFormFormik";
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
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const formik = useAuthFormFormik("register", async (values) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/register`,
        values
      );

      localStorage.setItem("token", res.data?.data?.accessToken);
      localStorage.setItem("refreshToken", res.data?.data?.refreshToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      if (res?.data?.statusCode === 200) navigate("/users/chat");
    } catch (err) {
      console.error("Register failed:", err.response?.data || err.message);
    }
  });

  // Handle Google signup as custom button
  const handleGoogleRegister = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      try {
        const token = credentialResponse.credential;
        console.log("Google token:", token);

        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/user/google-login`,
          { token },
          { withCredentials: true }
        );

        console.log(res);

        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        if (res?.data?.statusCode === 200) navigate("/users/chat");
      } catch (err) {
        console.error(
          "Google signup failed:",
          err.response?.data || err.message
        );
      }
    },
    onError: () => {
      console.log("Google signup failed");
    },
  });

  return (
    <div className="w-full bg-primary/5 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md shadow-lg">
        {/* Header */}
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-semibold">
            Create Account
          </CardTitle>
          <CardDescription>
            Join PackMate AI and start your journey today!
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Google Sign-Up */}
          <Button
            variant="outline"
            className="w-full flex items-center gap-2"
            onClick={() => handleGoogleRegister()}
          >
            <FcGoogle className="w-5 h-5" />
            Sign up with Google
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Register Form */}
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

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formik.values?.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-500">{formik.errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formik.values?.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>

          <p className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <a href="/auth/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;
