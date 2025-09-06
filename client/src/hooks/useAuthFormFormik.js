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
          .length(5, "OTP must be 5 digits")
          .required("OTP is required"),
      });

    default:
      return Yup.object().shape({});
  }
};
