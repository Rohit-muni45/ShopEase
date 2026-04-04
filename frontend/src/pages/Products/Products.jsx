import React, { useContext, useEffect, useState } from "react";
import api from "../../services/api";
import { showErrorToast, showSuccessToast } from "../../components/Toaster";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../../apiUrl.json";
import { CartContext } from "../../context/CartContext";
import Loader from "../../components/Loader";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(60000);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { fetchCartCount } = useContext(CartContext);
  const navigate = useNavigate();

  // Add to Cart
  const addToCart = async (product) => {
    const user = localStorage.getItem("user");
    if (!user) {
      showErrorToast("Please login to add items to your cart");
      return;
    }

    try {
      await api.post(apiUrl.AddToCart, {
        productId: product._id,
        qty: 1,
      });
      showSuccessToast("Item Added to cart");
      fetchCartCount();
    } catch (err) {
      showErrorToast(err.response?.data?.message || "Failed to add to cart");
    }
  };

  // Navigate
  const handleClick = (productId) => {
    navigate(`/product/${productId}`, { state: { productId } });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await api.get(apiUrl.GetProducts);

      setProducts(res.data);
      setFilteredProducts(res.data);

      const uniqueCategories = [...new Set(res.data.map((p) => p.category))];
      setCategories(uniqueCategories);

      // Auto set price range
      const prices = res.data.map((p) => p.price);
      setMinPrice(Math.min(...prices));
      setMaxPrice(Math.max(...prices));

      setLoading(false);
    } catch (err) {
      setError("Failed to load products");
      setLoading(false);
    }
  };

  // Category checkbox toggle
  const handleCategoryChange = (category) => {
    let updated = [...selectedCategories];

    if (updated.includes(category)) {
      updated = updated.filter((c) => c !== category);
    } else {
      updated.push(category);
    }

    setSelectedCategories(updated);
  };

  // Combined Filtering (Category + Price)
  useEffect(() => {
    let filtered = [...products];

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category),
      );
    }

    // Price filter
    filtered = filtered.filter(
      (p) => p.price >= minPrice && p.price <= maxPrice,
    );

    setFilteredProducts(filtered);
  }, [selectedCategories, minPrice, maxPrice, products]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6 lg:flex gap-6">
      {/* Sidebar */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white p-5 shadow-lg z-50 transform transition-transform duration-300
        ${isFilterOpen ? "translate-x-0" : "-translate-x-full"}
        lg:static lg:translate-x-0 lg:block`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4 lg:hidden">
          <h3 className="text-lg font-semibold">Filters</h3>
          <button onClick={() => setIsFilterOpen(false)}>✕</button>
        </div>

        {/* Desktop Title */}
        <h3 className="text-lg font-semibold mb-4 hidden lg:block">Filters</h3>

        {/* CATEGORY */}
        <div>
          <h4 className="font-medium mb-2 text-gray-700">Category</h4>

          {categories.map((cat, index) => (
            <label key={index} className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
                className="accent-indigo-600 cursor-pointer"
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>

        {/* PRICE */}
        <div className="mt-6">
          <h4 className="font-medium mb-2 text-gray-700">Price Range</h4>

          <div className="flex gap-2 mb-3">
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-full border rounded px-2 py-1"
            />
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <input
            type="range"
            min={0}
            max={60000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-indigo-600"
          />
        </div>

        {/* CLEAR */}
        <button
          onClick={() => {
            setSelectedCategories([]);
            const prices = products.map((p) => p.price);
            setMinPrice(Math.min(...prices));
            setMaxPrice(Math.max(...prices));
          }}
          className="mt-6 text-red-500 text-sm cursor-pointer hover:text-red-600"
        >
          Clear Filters
        </button>
      </div>

      {/* Mobile Filter Button */}
      <div className="flex justify-between items-center mb-4 lg:hidden">
        <h2 className="text-xl text-white font-semibold">Our Products</h2>

        <button
          onClick={() => setIsFilterOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md"
        >
          Filters
        </button>
      </div>

      {/* Products */}
      <div className="flex-1">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Our Products
        </h2>

        {filteredProducts.length === 0 ? (
          <p className="text-gray-500">No products found</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  onClick={() => handleClick(product._id)}
                  className="w-full h-40 object-contain mb-2 cursor-pointer"
                />

                <h3 className="text-md font-semibold text-gray-800">
                  {product.title}
                </h3>

                <span className="text-indigo-600 font-bold mt-2">
                  ₹{product.price}
                </span>

                <button
                  onClick={() => addToCart(product)}
                  className="mt-3 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
