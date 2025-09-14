import Joi from "joi";

// Validation service module
const ValidationService = {
  validateRegister: (data) => {
    const schema = Joi.object({
      fullName: Joi.string(),
      email: Joi.string().optional(),
      password: Joi.string().optional(),
    });

    return schema.validate(data, { abortEarly: false });
  },

  validateLogin: (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    return schema.validate(data, { abortEarly: false });
  },

  validateOtp: (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      otp: Joi.string().length(6).required(),
    });

    return schema.validate(data, { abortEarly: false });
  },
  validateForgotPassword: (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      otp: Joi.string().length(6).required(),
      new_password: Joi.string().min(6).required(),
    });

    return schema.validate(data, { abortEarly: false });
  },

  validateRefreshToken: (data) => {
    const schema = Joi.object({
      refreshToken: Joi.string().required(),
    });

    return schema.validate(data, { abortEarly: false });
  },

  validateWardrobeItem: (data) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      category: Joi.string().required(),
      isFavorite: Joi.boolean().optional(),
      image: Joi.string().uri().optional(),
    });

    return schema.validate(data, { abortEarly: false });
  },
};

export default ValidationService;
