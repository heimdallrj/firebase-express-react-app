const express = require('express');
const pick = require('lodash/pick');

const router = express.Router();

const Orders = require('../firebase/firestore/orders');
const Users = require('../firebase/firestore/users');

const response = {
  code: 401,
  message: null,
};

// const formatOrderData = ({ uid, title, bookingDate }) => ({uid, title, });
// const formatOrdersResponse = (orders) => orders.map(formatOrderData);

/**
 * /orders
 */
router.get('/orders', async (req, res) => {
  try {
    const orders = await Orders.findAll();
    response.code = 200;
    response.message = orders;
  } catch (err) {
    response.code = 401;
    response.message = err;
  }
  return res.status(response.code).send(response);
});

router.get('/orders/:id', async (req, res) => {
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

router.post('/orders', async (req, res) => {
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

router.put('/orders/:id', async (req, res) => {
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
router.get('/users/:id', async (req, res) => {
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

router.post('/users', async (req, res) => {
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

router.put('/users/:id', async (req, res) => {
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
