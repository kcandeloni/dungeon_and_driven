import Joi from "joi";

const equipamentSchema = Joi.object({
  name: Joi.string().trim().min(3).required(),
  description: Joi.string(),
  atk: Joi.number().min(0).max(100).required(),
  def: Joi.number().min(0).max(100).required(),
  price: Joi.number().min(0).max(999).required(),
  typeEquipament: Joi.string().trim().min(3).required(),
  element: Joi.string().trim().min(4).required(),
});

const updateEquipamentSchema = Joi.object({
  name: Joi.string().trim().min(3).required(),
  description: Joi.string().required(),
  atk: Joi.number().min(0).max(100).required(),
  def: Joi.number().min(0).max(100).required(),
  price: Joi.number().min(0).max(999).required(),
  element: Joi.string().trim().min(4).required(),
});

export {
  equipamentSchema,
  updateEquipamentSchema,
};