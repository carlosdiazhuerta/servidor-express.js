const joi = require('joi');
const id = joi.string().min(3).max(30);
const name = joi.string().min(3).max(30);
const price = joi.number().integer().min(10);
const image = joi.string().uri();
const isBlock = joi.boolean();

const createProductSchema = joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  id: id,
  isBlock: isBlock,
});

const updateProductSchema = joi.object({
  name: name.required(),
  price: price.required(),
  image: image,
  isBlock: isBlock,
});

const getProductSchema = joi.object({
  id: id.required(),
});

module.exports = { getProductSchema, updateProductSchema, createProductSchema };
