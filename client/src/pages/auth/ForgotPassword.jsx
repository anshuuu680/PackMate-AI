import { useAuthFormFormik } from "../../hooks/useAuthFormFormik";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
  const formik = useAuthFormFormik("forgotPassword", (values) => {
    console.log("forgot password form values", values);
    navigate("/verify-otp", { state: { email: values.email } });
  });

  return (
    <div className="w-full bg-primary min-h-screen flex  justify-center lg:justify-around items-center lg:items-start pt-12 lg:pt-20">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg lg:w-[40%] flex flex-col items-center gap-6 p-6">
        <div className="flex flex-col items-center gap-3">
          <div className="p-3 rounded-lg bg-gray-200">
            <img className="w-7 h-7 object-cover" src="/lock.svg" alt="" />
          </div>
          <h1 className="text-2xl font-semibold">Forgot Password</h1>
          <p className="font-light w-[70%] text-sm text-center text-gray-700">
            Please enter your email address below, and we'll send you a 5 digit
            code.
          </p>
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
          <div className="flex w-full justify-end">
            <a href="/login" className="text-sm text-blue-600 hover:underline">
              Login?
            </a>
          </div>
          <button className="submit-button mt-6 w-full" type="submit">
            Get 5-Digit Code
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
