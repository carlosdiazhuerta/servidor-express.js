const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductsServices {
  constructor() {
    this.products = [];
    this.gerete();
  }

  async gerete() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.nanoid(10),
        name: faker.commerce.productName(),
        price: faker.commerce.price({
          min: 100,
          max: 2000,
          dec: 0,
          symbol: '$',
        }),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.string.nanoid(10),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    return new Promise((resuelve, reject) => {
      setTimeout(() => {
        resuelve(this.products);
      }, 3000);
    });
  }

  async findOne(id) {
    const product = this.products.find((iten) => iten.id === id);
    if (!product) {
      throw boom.notFound('producto no encontrado');
    }
    if (product.isBlock) {
      throw boom.conflict('producto bloqueado');
    } else {
      return product;
    }
  }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('producto no encontrado');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('producto no encontrado');
    }
    this.products.splice(index, 1);
    return {
      mensaje: 'se elimino',
    };
  }
}

module.exports = ProductsServices;
