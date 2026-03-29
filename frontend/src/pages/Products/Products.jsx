import React, { useContext, useEffect, useState } from "react";
import api from "../../services/api";
import { showErrorToast, showSuccessToast } from "../../components/Toaster";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../../apiUrl.json";
import { CartContext } from "../../context/CartContext";
import Loader from "../../components/Loader";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchCartCount } = useContext(CartContext);
  const navigate = useNavigate();

  // function to fetch products
  const addToCart = async (product) => {
    const user = localStorage.getItem("user");
    if (!user) {
      showErrorToast("Please login to add items to your cart");
      return;
    }

    try {
      await api.post(apiUrl.AddToCart, { productId: product._id, qty: 1 });
      showSuccessToast("Item Added to cart");
      fetchCartCount();
    } catch (err) {
      showErrorToast(err.response?.data?.message || "Failed to add to cart");
    }
  };

  const handleClick = async (productId) => {
    navigate(`/product/${productId}`, { productId: { productId } });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const res = await api.get(apiUrl.GetProducts);
      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load products");
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
        Our Products
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available</p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition p-5 flex flex-col"
            >
              <img
                src={product.image}
                alt={product.title}
                onClick={() => handleClick(product._id)}
                className="w-full h-48 object-contain rounded-lg mb-2 cursor-pointer"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {product.title}
              </h3>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-indigo-600 font-bold text-lg">
                  ₹{product.price}
                </span>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
