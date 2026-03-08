import React, { useEffect, useState } from "react";
import api from "../../services/api";
import apiUrl from "../../../apiUrl.json";
import CartStepper from "../../components/CartStepper";
import { showSuccessToast } from "../../components/Toaster";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const CartReview = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState([]);
  const [payment, setPayment] = useState("");
  const { fetchCartCount } = useContext(CartContext);

  const fetchAll = async () => {
    const cartRes = await api.get(apiUrl.GetCart);
    const userRes = await api.get(apiUrl.GetUserAddress);
    const payRes = await api.get(apiUrl.GetPaymentMethod);

    console.log("Fetched review data...", userRes);

    setCart(cartRes.data.items);
    setAddress(userRes.data);
    setPayment(payRes.data.method);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );

  const confirmOrder = async () => {
  try {
    const res = await api.post(apiUrl.PlaceOrder, {
      paymentMethod: payment,
      discount: 0
    });
    console.log("Order placed...", res.data);
    fetchCartCount();
    showSuccessToast("Order placed successfully");
    navigate("/");
  } catch (err) {
    console.error("Order error:", err);
  }
};


  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <CartStepper/>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Cart Items */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          {cart.map((item) => (
            <div key={item.product._id} className="flex justify-between border-b py-3">
              <p>{item.product.title}</p>
              <span>₹{item.product.price * item.qty}</span>
            </div>
          ))}

          <div className="flex justify-between font-bold text-lg mt-3">
            <span>Total</span>
            <span>₹{subtotal}</span>
          </div>
        </div>

        {/* Address & Payment */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>

          <p>{address.name}</p>
          <p>{address.street}</p>
          <p>
            {address.city}, {address.state} - {address.pincode}
          </p>
          <p>📞 {address.phone}</p>

          <h2 className="text-xl font-semibold mt-6 mb-2">Payment Method</h2>
          <p>{payment}</p>

          <button
            onClick={confirmOrder}
            className="w-full mt-8 bg-indigo-600 text-white py-3 rounded-md text-lg cursor-pointer"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartReview;
