const express = require("express");

const router = express.Router();

const Orders = require("../firebase/firestore/orders");

const response = {
  code: 401,
  message: null,
};

router.get("/orders", async (req, res) => {
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

router.get("/orders/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await Orders.findOne(orderId);
    response.code = 200;
    response.message = order;
  } catch (err) {
    response.code = 401;
    response.message = err;
  }
  return res.status(response.code).send(response);
});

router.post("/orders", async (req, res) => {
  const data = req.body;

  try {
    const newOrder = await Orders.create(data);
    response.code = 200;
    response.message = newOrder;
  } catch (err) {
    response.code = 401;
    response.message = err;
  }
  return res.status(response.code).send(response);
});

router.put("/orders/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  const data = req.body;

  try {
    const updatedOrder = await Orders.update(orderId, data);
    response.code = 200;
    response.message = updatedOrder;
  } catch (err) {
    response.code = 401;
    response.message = err;
  }
  return res.status(response.code).send(response);
});

module.exports = router;
