const express = require("express");

const router = express.Router();

router.get("/orders", async (req, res) => {
  return res.status(200).send({});
});

router.post("/orders", async (req, res) => {
  return res.status(200).send({});
});

router.put("/orders/:orderId", async (req, res) => {
  return res.status(200).send({});
});

module.exports = router;
