const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { saveAddress, getAddress } = require('../controllers/addressController');

// Routes
router.post("/save-address", auth, saveAddress);
router.get("/get-address", auth, getAddress);

module.exports = router;
