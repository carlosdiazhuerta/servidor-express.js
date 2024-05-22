const express = require('express');
const UserServices = require('../services/service.user');
const router = express.Router();
const {
  getUserSchema,
  updateUserSchema,
  createUserSchema,
} = require('../schemas/user.schemas');

const validatorHandler = require('../middelware/validator.handler');

const userService = new UserServices();

router.get(
  '/',

  async (req, res, next) => {
    try {
      const users = await userService.find();
      res.json(users);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/:id',
  validatorHandler(getUserSchema, 'users'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userService.findOne(id);
      if (!user) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await userService.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedUser = await userService.update(id, body);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await userService.delete(id);
    res.json({ mensaje: 'Usuario eliminado', id });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
