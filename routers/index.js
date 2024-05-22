const productsRouter = require('./productos.router');
const usersRouter = require('./user.router.js');
const ProductsCategoryRouter = require('./products.category.js');
const express = require('express');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/V1', router);
  router.use('/products', productsRouter);
  router.use('/user', usersRouter);
  router.use('/categories', ProductsCategoryRouter);
}
module.exports = routerApi;
