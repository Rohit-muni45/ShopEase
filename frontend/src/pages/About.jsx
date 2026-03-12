import React from "react";
import User from "../assets/image.jpg";
import { Link } from "react-router-dom";
import who from "../assets/who.png";
import what from "../assets/what2.png";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">
          About <span className="text-indigo-600">ShopEase</span>
        </h1>

        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          We are dedicated to making online shopping easy, affordable, and
          enjoyable.
        </p>

        {/* Section 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-20">
          <img
            src={who}
            alt="Shopping"
            className="rounded-2xl shadow-lg h-84"
          />
          <div>
            <h2 class="text-2xl font-semibold text-gray-800 mb-3">
              Who We Are
            </h2>
            <p className="text-gray-600 leading-relaxed">
              ShopEase started with a simple mission: to provide high-quality
              products at fair prices, delivered straight to your doorstep.
              We’ve grown into a brand that values trust, quality, and customer
              satisfaction above everything else.
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              What We Do
            </h2>
            <p className="text-gray-600 leading-relaxed">
              From electronics to groceries and daily essentials, we bring you a
              curated shopping experience. Our service includes easy payments,
              secure checkout, fast shipping, and great customer support.
            </p>
          </div>
          <img
            src={what}
            alt="Service"
            className="rounded-2xl shadow-lg order-1 md:order-2 h-88"
          />
        </div>

        {/* Section 3 */}
        <div className="text-center mb-20">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Why Choose Us?
          </h2>
          <ul className="text-gray-600 space-y-3 max-w-xl mx-auto text-left ">
            <li> Quality products from trusted suppliers</li>
            <li> Fast and reliable delivery services</li>
            <li> Secure and hassle-free online shopping</li>
            <li> Friendly customer support whenever you need it</li>
          </ul>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">
            Meet Our Team
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <img
                src={User}
                alt="Founder"
                className="w-28 h-28 rounded-full object-cover mb-3 shadow-md"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                Muni Neelam
              </h3>
              <p className="text-sm text-gray-500">Founder & CEO</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <img
                src="https://randomuser.me/api/portraits/women/40.jpg"
                alt="Designer"
                className="w-28 h-28 rounded-full object-cover mb-3 shadow-md"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                Priya Verma
              </h3>
              <p className="text-sm text-gray-500">UI/UX Designer</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <img
                src="https://randomuser.me/api/portraits/men/65.jpg"
                alt="Developer"
                className="w-28 h-28 rounded-full object-cover mb-3 shadow-md"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                Ajay Kumar
              </h3>
              <p className="text-sm text-gray-500">Lead Developer</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/products"
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
