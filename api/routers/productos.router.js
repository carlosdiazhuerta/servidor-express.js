const express = require('express');
const ProductsServices = require('../services/service.produts');
const router = express.Router();
const service = new ProductsServices();
const validatorHandler = require('../middelware/validator.handler');
const {
  getProductSchema,
  updateProductSchema,
  createProductSchema,
} = require('../schemas/prduct.schema');

router.get('/', async (req, res, next) => {
  try {
    const products = await service.find();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/filter', async (req, res) => {
  res.send('Yo soy un filtro');
});

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),

  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

// Middlewares de manejo de errores al final de la cadena de rutas

module.exports = router;
