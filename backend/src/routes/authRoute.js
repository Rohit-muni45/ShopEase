const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  uploadImage,
  applyCoupon,
  register,
  login,
  refresh,
  logout,
} = require("../controllers/authController");

router.post("/uploadImage", auth, uploadImage); 
router.post("/applyCoupon", auth, applyCoupon);
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

module.exports = router;
