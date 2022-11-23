import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().trim().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  description: Joi.string().empty().trim(),
});

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required()
});

export {
  userSchema,
  signInSchema,
};
