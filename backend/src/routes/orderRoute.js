const express = require("express");
const router = express.Router();
const { placeOrder } = require("../controllers/orderController");
const auth = require("../middleware/auth");

router.post("/place-order", auth, placeOrder);

module.exports = router;
