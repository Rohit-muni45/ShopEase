import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import apiUrl from "../../apiUrl.json";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Banner from "../components/Banner";

const Home = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get(apiUrl.GetProducts);
        setFeatured(res.data.slice(19, 23));
      } catch (err) {
        console.log(err);
      }
    };
    fetchFeatured();
  }, []);

  // Flash Sale Timer Logic
  const FlashSale = () => {
    const [timeLeft, setTimeLeft] = useState({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

    useEffect(() => {
      const endTime = new Date();
      endTime.setHours(endTime.getHours() + 5); // Flash sale ends in 5 hours

      const interval = setInterval(() => {
        const now = new Date();
        const diff = endTime - now;

        if (diff <= 0) return clearInterval(interval);

        setTimeLeft({
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className="bg-red-50 py-14 mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <h2 className="text-3xl font-semibold text-gray-800">
              🔥 Flash Sale
            </h2>

            <div className="text-red-600 flex items-center gap-2 text-lg font-semibold">
              Ends In:
              <span className="px-3 py-1 bg-white shadow rounded-md">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              :
              <span className="px-3 py-1 bg-white shadow rounded-md">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              :
              <span className="px-3 py-1 bg-white shadow rounded-md">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Flash Sale Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow-md rounded-lg p-4 border border-red-200 hover:shadow-lg transition"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-contain rounded-md"
                />

                <h3 className="text-lg font-semibold text-gray-800 mt-3">
                  {item.title}
                </h3>

                <div className="flex justify-between items-center mt-3">
                  <span className="text-red-600 font-bold text-lg">
                    ₹{(item.price * 0.8).toFixed(0)}
                  </span>
                  <span className="text-gray-400 line-through text-sm">
                    ₹{item.price}
                  </span>
                </div>

                <button className="mt-4 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition">
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Banner />

      {/* Banner Slider */}
      {/* <div className="max-w-7xl mx-auto px-6 py-6">
        <Swiper
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          className="rounded-lg shadow-lg"
        >
          <SwiperSlide>
            <img
              src="https://img.freepik.com/free-vector/gradient-shopping-discount-horizontal-sale-banner_23-2150321996.jpg?t=st=1762521216~exp=1762524816~hmac=9fb2e0df41193d062f9b556d095362c45f3bbcc2a7a90d16f9049339beb5ea47&w=1480"
              alt="Banner 1"
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              src="https://t4.ftcdn.net/jpg/06/00/62/29/240_F_600622958_qHd6apf685EV5vLguPsrQ1ZxzsAQfzPb.jpg"
              alt="Banner 2"
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              src="https://img.freepik.com/free-vector/flat-design-mega-sale-banner-template_23-2148970883.jpg"
              alt="Banner 3"
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </SwiperSlide>
        </Swiper>
      </div> */}

      {/* Featured Section */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-10">
          Featured Products
        </h2>

        {featured.length === 0 ? (
          <p className="text-center text-gray-500">
            Loading Featured Products...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-contain rounded-md"
                />
                <h3 className="text-lg font-semibold text-gray-800 mt-3">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-indigo-600 font-semibold text-lg">
                    ₹{item.price}
                  </span>
                  <Link
                    to={`/product/${item._id}`}
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            to="/products"
            className="px-5 py-2 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white transition"
          >
            View All Products
          </Link>
        </div>
      </div>

      <FlashSale />
    </div>
  );
};

export default Home;
