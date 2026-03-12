import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { showErrorToast, showSuccessToast } from "../../components/Toaster";
import apiUrl from "../../../apiUrl.json";
import { CartContext } from "../../context/CartContext";
import Loader from "../../components/Loader";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchCartCount } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similar, setSimilar] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // Function to fetch product details
  const fetchProduct = async () => {
    try {
      const res = await api.get(`${apiUrl.GetProducts}/${id}`);
      setProduct(res.data);

      setSelectedImage(res.data.image);

      const all = await api.get(apiUrl.GetProducts);
      const filtered = all.data.filter(
        (p) => p.category === res.data.category && p._id !== res.data._id,
      );

      setSimilar(filtered);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // Function to add product to cart
  const addToCart = async () => {
    try {
      await api.post(apiUrl.AddToCart, { productId: product._id, qty: 1 });
      showSuccessToast("Product added to cart");
      fetchCartCount();
    } catch (err) {
      console.log(err);
      showErrorToast("Failed to add product to cart");
    }
  };

  if (loading) return <Loader />;

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600 text-xl">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      {/* GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT — IMAGES */}
        <div>
          <div className="w-full bg-white rounded-xl shadow p-4 flex items-center justify-center">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full max-h-[450px] object-contain rounded-lg transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4 mt-4">
            {[product.image, product.image2, product.image3]
              .filter(Boolean)
              .map((img, index) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer border 
                                    ${
                                      selectedImage === img
                                        ? "border-indigo-600"
                                        : "border-gray-300"
                                    }`}
                />
              ))}
          </div>
        </div>

        {/* RIGHT — DETAILS */}
        <div className="sticky top-20 space-y-4">
          <h1 className="text-3xl font-semibold text-gray-900 leading-tight">
            {product.title}
          </h1>

          {/* Rating */}
          <p className="text-yellow-500 text-lg">
            ★★★★☆ <span className="text-gray-600">(126 reviews)</span>
          </p>

          {/* Price */}
          <div className="flex items-center gap-3">
            <p className="text-3xl font-bold text-indigo-600">
              ₹{product.price}
            </p>

            {product?.Oldprice && (
              <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-md">
                {Math.round(
                  ((product.oldPrice - product.price) / product.oldPrice) * 100,
                )}
                % OFF
              </span>
            )}
          </div>

          <p className="text-gray-600">{product.description}</p>

          {/* SIZE SELECTOR */}
          {product.category == "clothing" && (
            <div>
              <p className="font-semibold mb-2">Size</p>
              <div className="flex gap-3">
                {["S", "M", "L"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg 
                                ${
                                  selectedSize === size
                                    ? "bg-indigo-600 text-white"
                                    : "bg-white text-gray-700"
                                }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* COLOR SELECTOR */}
          <div>
            <p className="font-semibold mb-2">Color</p>
            <div className="flex gap-3">
              {["white", "lightblue", "black"].map((clr) => (
                <div
                  key={clr}
                  onClick={() => setSelectedColor(clr)}
                  className={`w-7 h-7 rounded-full cursor-pointer border 
                                    ${
                                      selectedColor === clr
                                        ? "border-indigo-600"
                                        : "border-gray-400"
                                    }`}
                  style={{ backgroundColor: clr }}
                ></div>
              ))}
            </div>
          </div>

          {/* Stock */}
          <p
            className={`font-medium ${
              product.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
          </p>

          {/* BUTTONS */}
          <button
            onClick={addToCart}
            disabled={product.stock === 0}
            className="w-full bg-black text-white py-4 rounded-lg font-medium text-lg
                        hover:bg-gray-900 transition disabled:bg-gray-400 cursor-pointer"
          >
            {product.stock === 0 ? "Out of Stock" : "ADD TO CART"}
          </button>

          <button className="w-full py-4 rounded-lg border border-black text-black font-medium text-lg cursor-pointer">
            BUY NOW
          </button>

          {/* Shipping Info */}
          <ul className="text-gray-700 space-y-1 mt-3">
            <li>✔ Free Shipping</li>
            <li>✔ 30-day return policy</li>
            <li>✔ Secured checkout</li>
          </ul>
        </div>
      </div>

      {/* SIMILAR PRODUCTS */}
      {similar.length > 0 && (
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Similar Products
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {similar.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/product/${item._id}`)}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="text-lg font-semibold text-gray-900 mt-3">
                  {item.title}
                </h3>
                <p className="text-indigo-600 font-bold mt-2">₹{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
