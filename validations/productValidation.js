const Joi = require("joi");

const createProductSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.base": "Name must be a string.",
    "string.empty": "Product name is required.",
    "string.min": "Product name must be at least 3 characters.",
    "any.required": "Product name is required.",
  }),

  price: Joi.number().positive().required().messages({
    "number.base": "Price must be a number.",
    "number.positive": "Price must be a positive value.",
    "any.required": "Product price is required.",
  }),

  description: Joi.string().min(10).required().messages({
    "string.base": "Description must be a string.",
    "string.empty": "Description is required.",
    "string.min": "Description must be at least 10 characters.",
    "any.required": "Product description is required.",
  }),

  image: Joi.string().uri().required().messages({
    "string.uri": "Image must be a valid URL.",
    "any.required": "Image URL is required.",
  }),
});

const updateProductSchema = Joi.object({
  name: Joi.string().min(3).messages({
    "string.base": "Name must be a string.",
    "string.min": "Product name must be at least 3 characters.",
  }),

  price: Joi.number().positive().messages({
    "number.base": "Price must be a number.",
    "number.positive": "Price must be a positive value.",
  }),

  description: Joi.string().min(10).messages({
    "string.base": "Description must be a string.",
    "string.min": "Description must be at least 10 characters.",
  }),

  image: Joi.string().uri().messages({
    "string.uri": "Image must be a valid URL.",
  }),
});

module.exports = { createProductSchema, updateProductSchema };
