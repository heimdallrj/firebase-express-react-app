const express = require('express');
const pick = require('lodash/pick');

const firebaseAuthMiddleware = require('../middlewares/firebaseAuth');

const router = express.Router();

const Orders = require('../firebase/firestore/orders');
const Users = require('../firebase/firestore/users');

const response = {
  code: 401,
  message: null,
};

/**
 * /orders
 */
router.get('/orders', firebaseAuthMiddleware, async (req, res) => {
  // TODO Should impliment pagination
  try {
    const orders = await Orders.findAll();

    response.code = 200;
    // Note: Had to filter these dataset due to some invalid data in the database
    response.message = orders.filter(
      ({ bookingDate, uid }) => typeof bookingDate === 'number' && uid
    );
  } catch (err) {
    response.code = 401;
    response.message = err;
  }
  return res.status(response.code).send(response);
});

router.get('/orders/:id', firebaseAuthMiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    const order = await Orders.findOne(id);

    response.code = 200;
    response.message = order;
  } catch (err) {
    response.code = 401;
    response.message = err;
  }
  return res.status(response.code).send(response);
});

router.post('/orders', firebaseAuthMiddleware, async (req, res) => {
  const data = req.body;
  const order = pick(data, ['title', 'bookingDate', 'address', 'customer']);

  try {
    const newOrder = await Orders.create(order);

    response.code = 200;
    response.message = newOrder;
  } catch (err) {
    response.code = 401;
    response.message = err;
  }
  return res.status(response.code).send(response);
});

router.put('/orders/:id', firebaseAuthMiddleware, async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const order = pick(data, ['title', 'bookingDate']);

  try {
    const updatedOrder = await Orders.update(id, order);

    response.code = 200;
    response.message = updatedOrder;
  } catch (err) {
    response.code = 401;
    response.message = err;
  }
  return res.status(response.code).send(response);
});

/**
 * /users
 */
router.get('/users/:id', firebaseAuthMiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Users.findOne(id);

    response.code = 200;
    response.message = user;
  } catch (err) {
    response.code = 401;
    response.message = err;
  }
  return res.status(response.code).send(response);
});

router.post('/users', firebaseAuthMiddleware, async (req, res) => {
  const user = req.body;

  try {
    const newUser = await Users.create(user);

    response.code = 200;
    response.message = newUser;
  } catch (err) {
    response.code = 401;
    response.message = err;
  }
  return res.status(response.code).send(response);
});

router.put('/users/:id', firebaseAuthMiddleware, async (req, res) => {
  const id = req.params.id;
  const user = req.body;

  try {
    const updatedUser = await Users.update(id, user);

    response.code = 200;
    response.message = updatedUser;
  } catch (err) {
    response.code = 401;
    response.message = err;
  }
  return res.status(response.code).send(response);
});

module.exports = router;
