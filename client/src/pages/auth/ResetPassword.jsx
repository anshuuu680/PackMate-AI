import { useLocation, useNavigate } from "react-router-dom";
import { useAuthFormFormik } from "../../hooks/useAuthFormFormik";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const formik = useAuthFormFormik("resetPassword", (values) => {
    console.log("reset password form values", values);
    const email = location.state?.email;
    console.log("reset email", email);
    navigate("/auth/login");
  });
  return (
    <div className="w-full bg-primary min-h-screen flex  justify-center lg:justify-around items-center lg:items-start pt-12 lg:pt-20">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg lg:w-[40%] flex flex-col items-center gap-6 p-6">
        <div className="flex flex-col items-center gap-3">
          <div className="p-3 rounded-lg bg-gray-200">
            <img className="w-7 h-7 object-cover" src="/lock.svg" alt="" />
          </div>
          <h1 className="text-2xl font-semibold">Reset Password</h1>
          <p className="font-light w-[70%] text-sm text-center text-gray-700">
            Please choose a password that hasn't been used before.
          </p>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="w-full flex flex-col items-center"
        >
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
            <label className="input-label" htmlFor="password">
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

          <button className="submit-button mt-6 w-full" type="submit">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
