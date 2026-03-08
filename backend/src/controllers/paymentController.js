const Payment = require("../models/paymentModel");

// Save or update payment method for current user
exports.savePayment = async (req, res) => {
  const userId = req.user.id;
  const { method, details } = req.body;

  try {
    let payment = await Payment.findOne({ user: userId });

    if (payment) {
      payment.method = method;
      payment.details = details;
    } else {
      payment = new Payment({ user: userId, method, details });
    }

    await payment.save();
    res.json({ message: "Payment saved", method });
  } catch (error) {
    res.status(500).json({ message: "Failed to save payment" });
  }
};

exports.getPayment = async (req, res) => {
  try {
    const payment = await Payment.findOne({ user: req.user.id });
    res.json(payment || { method: "COD" });
  } catch (error) {
    res.status(500).json({ message: "Failed to get payment" });
  }
};
