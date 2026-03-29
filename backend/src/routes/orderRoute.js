const express = require("express");
const router = express.Router();
const { placeOrder, getUserOrders } = require("../controllers/orderController");
const auth = require("../middleware/auth");

router.post("/place-order", auth, placeOrder);
router.get("/my-orders", auth, getUserOrders);

module.exports = router;
