const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

// Get cart for current user
exports.getCart = async (req, res) => {
  const userId = req.user.id;
  try {
    let cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) cart = { user: userId, items: [] };
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Add or update an item in the cart
exports.addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, qty = 1 } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = new Cart({ user: userId, items: [] });

    const index = cart.items.findIndex(i => i.product.toString() === productId);

    if (index > -1) {
      cart.items[index].qty = qty;
    } else {
      cart.items.push({ product: productId, qty });
    }

    await cart.save();
    await cart.populate('items.product');

    res.json(cart);

  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(400).json({ message: 'Cart empty' });

    cart.items = cart.items.filter(i => i.product.toString() !== productId);

    await cart.save();
    await cart.populate('items.product');

    res.json(cart);

  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
