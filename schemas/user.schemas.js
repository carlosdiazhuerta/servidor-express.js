const joi = require('joi');
const id = joi.string().min(3).max(30);
const name = joi.string().min(3).max(30);
const city = joi.string().min(4).max(15);
const avatar = joi.string().uri();
const isBlock = joi.boolean();
const phoneNumber = joi
  .string()
  .pattern(/^\d{8,15}$/)
  .messages({
    'string.pattern.base':
      'Phone number must be between 8 and 15 digits long and contain only numbers',
  });
const email = joi.string().email().messages({
  'string.email': 'Invalid email format',
});

const createUserSchema = joi.object({
  name: name.required(),
  phoneNumber: phoneNumber.required(),
  avatar: avatar.required(),
  id: id,
  isBlock: isBlock,
  id: id.required(),
  city: city,
  email: email.required(),
});

const updateUserSchema = joi.object({
  name: name,
  phoneNumber: phoneNumber,
  avatar: avatar,
  id: id,
  isBlock: isBlock,
  city: city,
  email: email,
});

const getUserSchema = joi.object({
  id: id.required(),
});

module.exports = { getUserSchema, updateUserSchema, createUserSchema };
