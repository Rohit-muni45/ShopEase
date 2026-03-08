const express = require('express');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const auth = require('../middleware/auth');
const router = express.Router();

const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');

router.get('/', auth, getCart);
router.post('/add', auth, addToCart);
router.post('/remove', auth, removeFromCart);

module.exports = router;
