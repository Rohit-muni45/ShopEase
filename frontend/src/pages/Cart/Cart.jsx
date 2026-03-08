import React, { useContext, useEffect, useState } from "react";
import api from "../../services/api";
import { showErrorToast, showSuccessToast } from "../../components/Toaster";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../../apiUrl.json";
import { CartContext } from "../../context/CartContext";
import CartStepper from "../../components/CartStepper";
import Loader from "../../components/Loader";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  const [discount, setDiscount] = useState(0);
  const { fetchCartCount } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  // Fetch Cart
  const fetchCart = async () => {
    try {
      const res = await api.get(apiUrl.GetCart);
      setItems(res.data.items);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  // Remove Item
  const removeItem = async (productId) => {
    try {
      await api.post(apiUrl.RemoveFromCart, { productId });
      setItems((prev) => prev.filter((item) => item.product._id !== productId));
      fetchCartCount();
      showSuccessToast("Item removed");
    } catch (err) {
      console.error(err);
    }
  };

  // Increase quantity
  const increaseQty = async (productId, currentQty) => {
    try {
      await api.post(apiUrl.AddToCart, { productId, qty: currentQty + 1 });
      setItems((prev) =>
        prev.map((item) =>
          item.product._id === productId
            ? { ...item, qty: item.qty + 1 }
            : item,
        ),
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Decrease quantity
  const decreaseQty = async (productId, currentQty) => {
    try {
      if (currentQty <= 1) {
        await removeItem(productId);
        return;
      }
      await api.post(apiUrl.RemoveFromCart, { productId });
      setItems((prev) =>
        prev.map((item) =>
          item.product._id === productId
            ? { ...item, qty: item.qty - 1 }
            : item,
        ),
      );
    } catch (err) {
      console.error(err);
    }
  };

  // function to apply coupon
  const applyCoupon = async () => {
    if (appliedCoupon) {
      showErrorToast("Coupon already applied");
      setCouponCode("");
      return;
    }
    try {
      const res = await api.post(apiUrl.ApplyCoupon, {
        coupon: couponCode,
        subtotal: subtotal,
      });
      setDiscount(res.data.discount);
      setAppliedCoupon(true);
      showSuccessToast(res.data.message);
      setCouponCode("");
    } catch (err) {
      showErrorToast(err.response?.data?.message || "Failed to apply coupon");
      setCouponCode("");
    }
  };

  if (loading) return <Loader />;

  if (items.length === 0)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-2xl mb-3">Your Cart is Empty </p>
        <a
          href="/products"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Shop Now
        </a>
      </div>
    );

  const subtotal = items.reduce(
    (sum, item) => sum + item.product?.price * item.qty,
    0,
  );
  const total = subtotal - discount;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      {/* PROGRESS BAR */}
      <CartStepper />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT — Cart Items */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-6">
            Cart ({items.length} items)
          </h2>

          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item.product._id}
                className="flex items-start justify-between border-b pb-6"
              >
                <div className="flex gap-4">
                  {/* Product Image */}
                  <img
                    src={item.product.image ? item.product.image : "https://via.placeholder.com/150"}
                    className="w-24 h-24 object-cover rounded-md border"
                  />

                  {/* Details */}
                  <div>
                    <h3 className="text-lg font-semibold">
                      {item.product.title}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      ₹{item.product.price}
                    </p>

                    {/* Qty Stepper */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => decreaseQty(item.product._id, item.qty)}
                        className="px-3 py-1 rounded border hover:bg-gray-200"
                      >
                        –
                      </button>

                      <span className="text-lg font-semibold">{item.qty}</span>

                      <button
                        onClick={() => increaseQty(item.product._id, item.qty)}
                        className="px-3 py-1 rounded border hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.product._id)}
                      className="text-red-500 text-sm mt-2 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Price * qty */}
                <p className="text-lg font-semibold">
                  ₹{item.product.price * item.qty}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Sticky Summary */}
        <div className="lg:sticky lg:top-20 h-fit">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-6">Order Summary</h3>

            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Discount</span>
                <span className="text-red-500">- ₹{discount}</span>
              </div>

              <hr />

              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            {/* Coupon */}
            <div className="mt-6 flex gap-2">
              <input
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon"
                className="flex-1 border px-3 py-2 rounded"
                disabled={appliedCoupon}
              />

              <button
                onClick={applyCoupon}
                className="px-4 py-2 bg-black text-white rounded-md cursor-pointer"
                disabled={appliedCoupon}
              >
                Apply
              </button>
            </div>

            {/* Checkout */}
            <button
              onClick={() => navigate("/cart/address")}
              className="w-full mt-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-lg cursor-pointer"
            >
              Checkout Now
            </button>

            <p className="text-gray-500 text-xs mt-3">
              Full refund if not delivered • Secure payment gateway
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
