import { useAuthFormFormik } from "../../hooks/useAuthFormFormik";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

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
    const newOtp = otpArray.join("");
    formik.setFieldValue("otp", newOtp);

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
    <div className="w-full bg-primary min-h-screen flex  justify-center lg:justify-around items-center lg:items-start pt-12 lg:pt-20">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg lg:w-[40%] flex flex-col items-center gap-6 p-6">
        <div className="flex flex-col items-center gap-3">
          <div className="p-3 rounded-lg bg-gray-200">
            <img className="w-7 h-7 object-cover" src="/lock.svg" alt="" />
          </div>
          <h1 className="text-2xl font-semibold">Verify OTP</h1>
          <p className="font-light text-sm text-center text-gray-700">
            We sent a code to{" "}
            <span className="font-semibold">
              {email || "your email address"}
            </span>
            .
          </p>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="w-full flex flex-col items-center"
        >
          <div className="flex gap-3 justify-center w-full">
            {[0, 1, 2, 3, 4].map((i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="text"
                maxLength={1}
                value={formik.values.otp[i] || ""}
                onChange={(e) => handleOtpChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="w-12 h-12 border rounded-lg text-center text-lg focus:outline-none border-gray-400 focus:border-blue-500"
              />
            ))}
          </div>
          <div className="min-h-[16px] mt-2">
            {formik.touched.otp && formik.errors.otp && (
              <p className="p-error">{formik.errors.otp}</p>
            )}
          </div>

          <button className="submit-button mt-6 w-full" type="submit">
            Verify OTP
          </button>

          <div className="flex w-full text-sm justify-center mt-3">
            <h1>Didn't receive email? &nbsp;</h1>
            <a href="/login" className=" text-blue-600 hover:underline">
              Click to resend?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VerifyOtp;
