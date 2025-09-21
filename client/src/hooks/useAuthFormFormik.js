import { useFormik } from "formik";
import * as Yup from "yup";

export function useAuthFormFormik(formType, onSubmit) {
  const formik = useFormik({
    initialValues: getInitialValue(formType),
    validationSchema: getValidationSchema(formType),
    onSubmit,
  });

  return formik;
}

const getInitialValue = (formType) => {
  switch (formType) {
    case "login":
      return {
        email: "",
        password: "",
      };
    case "register":
      return {
        email: "",
        password: "",
        confirmPassword: "",
      };
    case "forgotPassword":
      return {
        email: "",
      };
    case "resetPassword":
      return {
        password: "",
        confirmPassword: "",
      };
    case "verifyOtp":
      return {
        otp: "",
      };
    case "verify-email": // ✅ added
      return {
        otp: "",
      };
    case "updateProfile":
      return {
        email: "",
        fullName: "",
        mobile: "",
        avatar: null,
        isVerified: false,
      };
    default:
      return {};
  }
};

const getValidationSchema = (formType) => {
  switch (formType) {
    case "login":
      return Yup.object().shape({
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        password: Yup.string().required("Password is required"),
      });

    case "register":
      return Yup.object().shape({
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required"),
      });

    case "forgotPassword":
      return Yup.object().shape({
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
      });

    case "resetPassword":
      return Yup.object().shape({
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required"),
      });

    case "verifyOtp":
      return Yup.object().shape({
        otp: Yup.string()
          .length(6, "OTP must be 6 digits")
          .required("OTP is required"),
      });

    case "verify-email": // ✅ added
      return Yup.object().shape({
        otp: Yup.string()
          .length(6, "OTP must be 6 digits")
          .required("OTP is required"),
      });

    case "updateProfile":
      return Yup.object().shape({
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        fullName: Yup.string().required("Full name is required"),
        mobile: Yup.string().matches(
          /^[0-9]{10}$/,
          "Must be a valid 10-digit number"
        ),
      });

    default:
      return Yup.object().shape({});
  }
};
