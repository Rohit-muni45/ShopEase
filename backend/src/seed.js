require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Product = require('./models/productModel');

const products = [

  {
    title: "Calvin Klein CK One",
    description: "Uni-sex fragrance designed for modern style.",
    price: 49.99,
    image: "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp",
    stock: 22,
    category: "fragrances"
  },
  {
    title: "Chanel Coco Noir Eau De",
    description: "Luxury perfume with long-lasting scent.",
    price: 129.99,
    image: "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp",
    stock: 16,
    category: "fragrances"
  },
  {
    title: "Annibale Sofa",
    description: "Modern and comfortable sofa for home decor.",
    price: 89.99,
    image: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/thumbnail.webp",
    stock: 28,
    category: "furniture"
  },
  {
    title: "Gucci Bloom Eau De",
    description: "Elegant floral fragrance for women.",
    price: 109.99,
    image: "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/thumbnail.webp",
    stock: 19,
    category: "fragrances"
  },
  {
    title: "Annibale Bedside Table",
    description: "Elegant wooden bedside table crafted with premium material.",
    price: 399,
    image: "https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/thumbnail.webp",
    stock: 16,
    category: "furniture"
  },
  {
    title: "Conference Chair",
    description: "Comfortable conference chair for long hours.",
    price: 89,
    image: "https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/thumbnail.webp",
    stock: 79,
    category: "home-decoration"
  },  
  {
    title: "Wooden Bathroom Sink",
    description: "Elegant wooden bathroom sink with mirror.",
    price: 64,
    image: "https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/thumbnail.webp",
    stock: 70,
    category: "home-decoration"
  },
  {
    title: "Polo T-shirt",
    description: "A classic polo t-shirt, perfect for casual wear and comfortable everyday use.",
    price: 120,
    image: "https://m.media-amazon.com/images/I/713n+TxyfCL._SY879_.jpg",
    stock: 10,
    category: "clothing"
  },
  {
    title: "Lymio Men cargo",
    description: "A versatile cargo t-shirt, perfect for outdoor activities and comfortable everyday use.",
    price: 150,
    image: "https://m.media-amazon.com/images/I/61j9jJhrStL._SY879_.jpg",
    stock: 20,
    category: "clothing"
  },
  {
    title: "Dupatta suit set",
    description: "A beautiful dupatta suit set, perfect for formal events and comfortable everyday use.",
    price: 200,
    image: "https://m.media-amazon.com/images/I/61D7nbhylBL._SX679_.jpg",
    stock: 30,
    category: "clothing"
  },
  {
    title: "Casual Dress",
    description: "A stylish casual dress, perfect for everyday wear and comfortable everyday use.",
    price: 250,
    image: "https://m.media-amazon.com/images/I/91WJ7X4-8XL._SY879_.jpg",
    stock: 40,
    category: "clothing"
  },
  {
    title: "Realme NARZO 70 5G",
    description: "A powerful smartphone with a stunning display and fast performance.",
    price: 15000,
    image: "https://m.media-amazon.com/images/I/71gdaaBCYHL._SX679_.jpg",
    stock: 50,
    category: "electronics"
  },
  {
    title: "boat Airpods C50",
    description: "A comfortable and high-quality wireless earphone for a seamless audio experience.",
    price: 2000,
    image: "https://m.media-amazon.com/images/I/41wkF2C0ZJL._SX300_SY300_QL70_FMwebp_.jpg",
    stock: 60,
    category: "electronics"
  },
  {
    title: "Fastrack Watch",
    description: "A stylish and durable watch for everyday wear and comfortable everyday use.",
    price: 3000,
    image: "https://m.media-amazon.com/images/I/61rbYFj7DgL._SX679_.jpg",
    stock: 70,
    category: "electronics"
  },
  {
    title: "Nike Shoes",
    description: "A comfortable and high-quality pair of shoes for everyday wear and comfortable everyday use.",
    price: 4000,
    image: "https://m.media-amazon.com/images/I/610aPX1IWYL._SY879_.jpg",
    stock: 80,
    category: "footwear"
  },
  {
    title: "Adidas Running Shoes",
    description: "A stylish and durable pair of running shoes for everyday wear and comfortable everyday use.",
    price: 5000,
    image: "https://m.media-amazon.com/images/I/71xoeUMMFIL._AC_UL480_FMwebp_QL65_.jpg",
    stock: 90,
    category: "footwear"
  },
  {
    title: "Sony Headphones",
    description: "A comfortable and high-quality pair of headphones for everyday wear and comfortable everyday use.",
    price: 3000,
    image: "https://m.media-amazon.com/images/I/41lArSiD5hL._SX679_.jpg",
    stock: 100,
    category: "electronics"
  },
  {
    title: "Apple Watch",
    description: "A stylish and high-quality smartwatch for everyday wear and comfortable everyday use.",
    price: 4000,
    image: "https://m.media-amazon.com/images/I/61bJZx1v8GL._AC_UY327_FMwebp_QL65_.jpg",
    stock: 110,
    category: "electronics"
  },
  {
    title: "Acer Laptop",
    description: "A powerful and high-quality laptop for everyday use and comfortable everyday use.",
    price: 60000,
    image: "https://m.media-amazon.com/images/I/81bc8mA3nKL._SX679_.jpg",
    stock: 120,
    category: "electronics"
  },
  {
    title: "Peter England Shirt",
    description: "A stylish and comfortable shirt for everyday wear and comfortable everyday use.",
    price: 1500,
    image: "https://m.media-amazon.com/images/I/61A2rohM4oL._SY879_.jpg",
    stock: 130,
    category: "clothing"
  },
  {
    title: "Levi's Jeans",
    description: "A stylish and comfortable pair of jeans for everyday wear and comfortable everyday use.",
    price: 2000,
    image: "https://m.media-amazon.com/images/I/71STfw4iZBL._AC_UL480_FMwebp_QL65_.jpg",
    stock: 140,
    category: "clothing"
  },
  {
    title: "US Polo Assn. T-Shirt",
    description: "A stylish and comfortable t-shirt for everyday wear and comfortable everyday use.",
    price: 1200,
    image: "https://m.media-amazon.com/images/I/71-F5G3honL._AC_UL480_FMwebp_QL65_.jpg",
    stock: 150,
    category: "clothing"
  },
];

(async () => {
  await connectDB();
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Seeded products');
  process.exit(0);
})();
