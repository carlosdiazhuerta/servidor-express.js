const { faker } = require('@faker-js/faker');

const boom = require('@hapi/boom');

class UserServices {
  constructor() {
    this.users = [];
    this.generate();
  }

  async generate(size = 100) {
    for (let index = 0; index < size; index++) {
      this.users.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        city: faker.location.city(),
        phoneNumber: faker.phone.number(),
        id: faker.string.nanoid(10),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newUser = {
      id: faker.string.nanoid(10),
      ...data,
    };

    this.users.push(newUser);
    return newUser;
  }

  async find() {
    return this.users;
  }

  async findOne(id) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw boom.notFound('usario no encontrado');
    }
    if (user.isBlock) {
      throw boom.conflict('usario bloqueado');
    } else {
      return user;
    }
  }

  async update(id, changes) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('Usuario no encontrado');
    }
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes,
    };
    return this.users[index];
  }

  async delete(id) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('Usuario no encontrado');
    }
    this.users.splice(index, 1);
    return {
      message: 'Usuario eliminado',
    };
  }
}

module.exports = UserServices;
