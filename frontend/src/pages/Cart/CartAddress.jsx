import React, { useState, useEffect } from "react";
import api from "../../services/api";
import apiUrl from "../../../apiUrl.json";
import { showErrorToast, showSuccessToast } from "../../components/Toaster";
import CartStepper from "../../components/CartStepper";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

const CartAddress = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [address, setAddress] = useState({
    name: "",
    state: "",
    city: "",
    pincode: "",
    street: "",
    phone: "",
  });

  // Fetch saved address
  const fetchAddress = async () => {
    setLoading(true);
    try {
      const res = await api.get(apiUrl.GetUserAddress);
      console.log("fetched address...", res);
      const addr = res.data;
      setAddress({
        name: addr.name || "",
        state: addr.state || "",
        city: addr.city || "",
        pincode: addr.pincode || "",
        street: addr.street || "",
        phone: addr.phone || "",
      });
    } catch (err) {
      console.log("No saved address");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!address.name) newErrors.name = "Name is required";
    if (!address.phone) newErrors.phone = "Phone is required";
    if (!address.state) newErrors.state = "State is required";
    if (!address.city) newErrors.city = "City is required";
    if (!address.pincode) newErrors.pincode = "Pincode is required";
    if (!address.street) newErrors.street = "Street is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  // Save API
  const saveAddress = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const res = await api.post(apiUrl.SaveUserAddress, address);
      console.log("response...", res);
      setLoading(false);
      showSuccessToast("Address saved");
      navigate("/cart/payment");
    } catch {
      showErrorToast("Failed to save address");
    } finally {
      setLoading(false);
    }
  };

  // Show loader
  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <CartStepper />
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-semibold">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              className="border p-2 rounded"
              placeholder="Full Name"
              name="name"
              value={address.name}
              onChange={handleChange}
            />
             {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              className="border p-2 rounded"
              placeholder="Phone"
              name="phone"
              value={address.phone}
              onChange={handleChange}
            />
              {errors.phone && <p className="text-red-500">{errors.phone}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold">
              State <span className="text-red-500">*</span>
            </label>
            <input
              className="border p-2 rounded"
              placeholder="State"
              name="state"
              value={address.state}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold">
              City <span className="text-red-500">*</span>
            </label>
            <input
              className="border p-2 rounded"
              placeholder="City"
              name="city"
              value={address.city}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold">
              Pincode <span className="text-red-500">*</span>
            </label>
            <input
              className="border p-2 rounded"
              placeholder="Pincode"
              name="pincode"
              value={address.pincode}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 mt-3">
          <label className="font-semibold">
            Address <span className="text-red-500">*</span>
          </label>
          <input
            className="border p-2 rounded col-span-2"
            placeholder="Street Address"
            name="street"
            value={address.street}
            onChange={handleChange}
          />
        </div>

        <button
          onClick={saveAddress}
          className="w-full mt-6 bg-black text-white py-3 rounded-md text-lg cursor-pointer"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default CartAddress;
