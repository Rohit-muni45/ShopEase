const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  method: String,
  details: Object
});

module.exports = mongoose.model("Payment", paymentSchema);
