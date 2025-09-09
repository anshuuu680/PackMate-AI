import { useAuthFormFormik } from "../../hooks/useAuthFormFormik";

function Login() {
  const formik = useAuthFormFormik("login", (values) => {});

  return (
    <div className="w-full bg-primary min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-around">
      <div className="w-full lg:w-[40%] flex justify-center items-center p-6">
        <div className="w-full sm:w-[90%] rounded-md shadow-lg bg-white py-10 px-6 flex flex-col justify-center items-center gap-8">
          <div className="flex flex-col items-center gap-1">
            <h1 className="text-2xl font-bold">Sign In</h1>
            <p className="text-sm text-gray-400">Welcome Back!</p>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="w-full flex flex-col items-center relative gap-2"
          >
            <div className="flex flex-col gap-5 w-full">
              <div className="flex w-full flex-col gap-1 relative pb-1">
                <label className="input-label" htmlFor="email">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="e.g. john@john.com"
                  value={formik.values?.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="input-box font-light"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="p-error">{formik.errors.email}</p>
                )}
              </div>

              <div className="flex w-full flex-col gap-1 relative pb-1">
                <label className="input-label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formik.values?.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="input-box font-light"
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="p-error">{formik.errors.password}</p>
                )}
              </div>
            </div>

            <div className="flex w-full justify-end">
              <a
                href="/auth/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <button className="submit-button mt-4" type="submit">
              Login
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Create an account?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Register
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
