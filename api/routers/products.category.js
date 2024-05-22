const express = require('express');
const { faker } = require('@faker-js/faker');
const router = express.Router();
router.get('/', (req, res) => {
  const category = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    category.push({
      category: faker.commerce.productAdjective(),
      categoryId: faker.string.nanoid(10),
    });
  }
  res.json(category);
});

module.exports = router;
