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

function Login() {
  const formik = useAuthFormFormik("login", (values) => {
    console.log("Login submitted:", values);
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
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => console.log("Google login clicked")}
          >
            <FcGoogle className="w-5 h-5" />
            Continue with Google
          </Button>

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

          {/* Register link */}
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
