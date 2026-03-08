import React, { useState } from "react";

import { showErrorToast } from "../../components/Toaster";
import CartStepper from "../../components/CartStepper";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import apiUrl from "../../../apiUrl.json";

const CartPayment = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState("COD");
  const [upi, setUpi] = useState("");
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "" });

   const handlePayment = async () => {
    if (method === "UPI" && !upi) return showErrorToast("Enter UPI ID");
    if (method === "CARD" && (!card.number || !card.expiry || !card.cvv))
      return showErrorToast("Enter complete card details");

    try {
      const res = await api.post(apiUrl.SavePaymentMethod, {
        method,
        details: method === "UPI" ? { upi } : method === "CARD" ? card : {}
      });
      console.log("Payment response...", res);
      navigate("/cart/review");
    } catch {
      showErrorToast("Failed to save payment");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <CartStepper />

      <div className="max-w-xl mx-auto bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Payment Method</h2>

        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="payment"
              checked={method === "COD"}
              onChange={() => setMethod("COD")}
            />
            Cash on Delivery
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="payment"
              checked={method === "UPI"}
              onChange={() => setMethod("UPI")}
            />
            UPI
          </label>

          {method === "UPI" && (
            <input
              value={upi}
              onChange={(e) => setUpi(e.target.value)}
              className="border p-2 rounded mt-2 w-full"
              placeholder="Enter UPI ID (e.g. name@upi)"
            />
          )}

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="payment"
              checked={method === "CARD"}
              onChange={() => setMethod("CARD")}
            />
            Debit / Credit Card
          </label>

          {method === "CARD" && (
            <div className="grid grid-cols-1 gap-3 mt-2">
              <input
                className="border p-2 rounded"
                placeholder="Card Number"
                value={card.number}
                onChange={(e) =>
                  setCard({ ...card, number: e.target.value })
                }
              />
              <input
                className="border p-2 rounded"
                placeholder="MM/YY"
                value={card.expiry}
                onChange={(e) =>
                  setCard({ ...card, expiry: e.target.value })
                }
              />
              <input
                className="border p-2 rounded"
                placeholder="CVV"
                value={card.cvv}
                onChange={(e) =>
                  setCard({ ...card, cvv: e.target.value })
                }
              />
            </div>
          )}
        </div>

        <button
          onClick={handlePayment}
          className="w-full mt-6 bg-black text-white py-3 rounded-md text-lg cursor-pointer"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default CartPayment;
