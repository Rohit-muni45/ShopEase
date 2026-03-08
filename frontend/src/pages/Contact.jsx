import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { showErrorToast, showSuccessToast } from "../components/Toaster";
import api from "../services/api";
import apiUrl from "../../apiUrl.json";
import { emailRegex } from "../utils/emailRegex";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    // else if (emailRegex.test(form.email) == false)
    //   newErrors.email = "Please enter a valid Email Address";
    if (!form.message) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const res = await api.post(apiUrl.SendMessage, {
        name: form.name,
        email: form.email,
        message: form.message,
      });
      console.log(res);
      setLoading(false);
      showSuccessToast(res.data.message || "Message sent successfully ");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.log(err);
      showErrorToast(err.response.data.error || "Error sending message");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
          Contact <span className="text-indigo-600">Us</span>
        </h1>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Have questions or need help? We're here for you! Reach out to us
          anytime.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg p-8 space-y-5"
          >
            <div>
              <label className="text-gray-700 font-medium">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                className="w-full mt-1 border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label className="text-gray-700 font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                type="text"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full mt-1 border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.email && (
                <p className="text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="text-gray-700 font-medium">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                rows="4"
                placeholder="Write your message..."
                value={form.message}
                onChange={handleChange}
                className="w-full mt-1 border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
              {errors.message && (
                <p className="text-red-500 mt-1">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button className="w-full bg-indigo-600 text-white py-2 rounded-md cursor-pointer hover:bg-indigo-700 transition ">
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <Mail className="text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Email</h3>
                <p className="text-gray-600">support@shopease.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <Phone className="text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Phone</h3>
                <p className="text-gray-600">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <MapPin className="text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Address</h3>
                <p className="text-gray-600">
                  ShopEase Pvt Ltd,
                  <br />
                  KPHB Phase-1, Hyderabad, Telangana, India
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
