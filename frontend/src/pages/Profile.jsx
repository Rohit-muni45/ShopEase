import { useContext, useState } from "react";
import api from "../services/api";
import apiUrl from "../../apiUrl.json";
import { AuthContext } from "../context/AuthContext";
import { showErrorToast, showSuccessToast } from "../components/Toaster";
import Loader from "../components/Loader";

const Profile = () => {
  const { user, updateImage } = useContext(AuthContext);
  const [preview, setPreview] = useState(user.image || null);
  const [loading, setLoading] = useState(false);

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
    </div>
  );
};

export default Profile;
