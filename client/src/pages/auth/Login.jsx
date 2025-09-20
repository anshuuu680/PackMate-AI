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

function Login() {
  const navigate = useNavigate();
  const formik = useAuthFormFormik("login", async (values) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        values
      );

      localStorage.setItem("token", res.data?.data?.accessToken);
      localStorage.setItem("refreshToken", res.data?.data?.refreshToken);
      localStorage.setItem("user", JSON.stringify(res.data?.data?.user));
      if (res?.data?.statusCode === 200) navigate("/users/chat");
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
    }
  });

  const handleGoogleLogin = useGoogleLogin({
    flow: "implicit", // must be "implicit"
    onSuccess: async (credentialResponse) => {
      const token = credentialResponse.credential;
      if (!token) return console.log("No token received");

      try {
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
          "Google login failed:",
          err.response?.data || err.message
        );
      }
    },
    onError: () => console.log("Google login failed"),
  });

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-background">
      <Card className="w-full max-w-md shadow-lg border border-border">
        <CardHeader className="text-center space-y-2 pb-6">
          <CardTitle className="text-3xl font-semibold tracking-tight">
            Sign In
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Welcome back! Please log in to continue.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Google Login */}
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => handleGoogleLogin()}
          >
            <FcGoogle className="w-5 h-5" />
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-muted" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or login with email
              </span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formik.values?.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-500">{formik.errors.email}</p>
              )}
            </div>

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

            <div className="flex justify-end">
              <a
                href="/auth/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>

          {/* Register Link */}
          <p className="text-sm text-center text-muted-foreground">
            Don’t have an account?{" "}
            <a href="/auth/register" className="text-blue-600 hover:underline">
              Register
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
