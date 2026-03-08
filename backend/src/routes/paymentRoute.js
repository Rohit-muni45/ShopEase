const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  savePayment,
  getPayment
} = require("../controllers/paymentController");

router.post("/save", auth, savePayment);
router.get("/get", auth, getPayment);

module.exports = router;
