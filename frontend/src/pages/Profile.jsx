import { useContext, useEffect, useState } from "react";
import api from "../services/api";
import apiUrl from "../../apiUrl.json";
import { AuthContext } from "../context/AuthContext";
import { showErrorToast, showSuccessToast } from "../components/Toaster";
import Loader from "../components/Loader";

const Profile = () => {
  const { user, updateImage } = useContext(AuthContext);
  const [preview, setPreview] = useState(user.image || null);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get(apiUrl.GetOrders);
      console.log("orders..", res);
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // function to handle image change
  const handleImageChange = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    if (!file) return;

    const payload = {
      uploadImage: file,
    };

    try {
      const res = await api.post(apiUrl.ChangePhoto, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("photores..", res);
      updateImage(res.data.updatedImage);
      setPreview(URL.createObjectURL(file));
      setLoading(false);
      showSuccessToast(res.data.message || "Photo updated successfully!");
    } catch (err) {
      console.log(err);
      setLoading(false);
      showErrorToast("Failed to upload Image");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h1>

        <img
          src={preview || user.image || "https://via.placeholder.com/120"}
          alt="Avatar"
          className="w-40 h-40 rounded-lg object-cover border-2 border-indigo-600 shadow mx-auto"
        />

        <label className="mt-4 cursor-pointer text-indigo-600 font-medium hover:underline block">
          Change Photo
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        <p className="mt-6 text-gray-700 text-lg font-semibold">{user.name}</p>
        <p className="text-gray-500">{user.email}</p>

        {/* created date */}
        <p className="text-gray-500">
          Created at: {user.createdAt && user.createdAt.split("T")[0]}
        </p>
      </div>

      <div className="mt-12">
  <h2 className="text-2xl font-bold mb-6 text-gray-800">Order History</h2>

  {orders.length === 0 ? (
    <p className="text-gray-500">You haven't placed any orders yet.</p>
  ) : (
    <div className="space-y-6">
      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white shadow-md rounded-lg p-6 border"
        >
          {/* Order Header */}
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-semibold">{order._id}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-semibold">
                {order.createdAt.split("T")[0]}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Payment</p>
              <p className="font-semibold">{order.paymentMethod}</p>
            </div>

            <div>
              <span
                className={`px-3 py-1 text-sm rounded-full font-medium
                ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : order.status === "Shipped"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4"
              >
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-16 h-16 object-cover rounded-md border"
                />

                <div className="flex-1">
                  <p className="font-semibold text-gray-800">
                    {item.product.title}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Qty: {item.qty}
                  </p>
                </div>

                <p className="font-semibold text-indigo-600">
                  ₹{item.price}
                </p>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-end border-t pt-3 mt-4">
            <p className="text-lg font-bold text-gray-800">
              Total: ₹{order.total}
            </p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
    </div>
  );
};

export default Profile;
