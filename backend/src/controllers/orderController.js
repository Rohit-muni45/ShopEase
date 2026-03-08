const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Address = require("../models/addressModel");

// Place an order
exports.placeOrder = async (req, res) => {
  const userId = req.user.id;
  const { paymentMethod, discount = 0 } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const userAddress = await Address.findOne({ user: userId });
    if (!userAddress) {
      return res.status(400).json({ message: "Address not found" });
    }

    const items = cart.items.map(i => ({
      product: i.product._id,
      qty: i.qty,
      price: i.product.price
    }));

    const subtotal = items.reduce(
      (sum, i) => sum + i.price * i.qty,
      0
    );

    const total = subtotal - discount;

    const order = new Order({
      user: userId,
      items,
      address: userAddress,     // save address object or reference
      paymentMethod,
      subtotal,
      discount,
      total
    });

    await order.save();

    // Clear cart after order success
    await Cart.findOneAndDelete({ user: userId });

    res.json({
      message: "Order placed successfully",
      orderId: order._id
    });

  } catch (error) {
    console.error("Place order error:", error);  
    res.status(500).json({ message: "Failed to place order", error: error.message });
  }
};
