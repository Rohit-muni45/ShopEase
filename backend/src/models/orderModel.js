const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      qty: Number,
      price: Number
    }
  ],

  address: {
    name: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    pincode: String
  },

  paymentMethod: {
    type: String,
    enum: ["COD", "UPI", "CARD"],
    default: "COD"
  },

  subtotal: Number,
  discount: { type: Number, default: 0 },
  total: Number,

  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"]
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
