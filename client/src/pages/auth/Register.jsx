import { useAuthFormFormik } from "../../hooks/useAuthFormFormik";

function Register() {
  const formik = useAuthFormFormik("register", (values) => {
    console.log("Register values:", values);
  });

  return (
    <div className="w-full bg-primary min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-around">
      <div className="w-full lg:w-[40%] flex justify-center items-center p-6">
        <div className="w-full sm:w-[90%] rounded-md shadow-lg bg-white py-10 px-6 flex flex-col justify-center items-center gap-8">
          <div className="flex flex-col items-center gap-1">
            <h1 className="text-2xl font-semibold">Create Account</h1>
            <p className="text-sm text-gray-400">Join us today!</p>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="w-full flex flex-col items-center"
          >
            <div className="flex w-full flex-col gap-1">
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
              <div className="min-h-[16px]">
                {formik.touched.email && formik.errors.email && (
                  <p className="p-error">{formik.errors.email}</p>
                )}
              </div>
            </div>

            <div className="flex w-full flex-col gap-1">
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
              <div className="min-h-[16px]">
                {formik.touched.password && formik.errors.password && (
                  <p className="p-error">{formik.errors.password}</p>
                )}
              </div>
            </div>

            <div className="flex w-full flex-col gap-1">
              <label className="input-label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formik.values?.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="input-box font-light"
              />
              <div className="min-h-[16px]">
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="p-error">{formik.errors.confirmPassword}</p>
                  )}
              </div>
            </div>

            <button className="submit-button mt-6" type="submit">
              Register
            </button>

            <p className="text-sm text-gray-500 mt-4">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
