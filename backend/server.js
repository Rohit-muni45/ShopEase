require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const authRoute = require('./src/routes/authRoute');
const productsRoute = require('./src/routes/productsRoute');
const cartRoute = require('./src/routes/cartRoute');
const contactRoute = require('./src/routes/contactRoute');
const profileRoute = require('./src/routes/profileRoute');
const addressRoute = require('./src/routes/addressRoute');
const orderRoute = require('./src/routes/orderRoute');
const paymentRoute = require('./src/routes/paymentRoute');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/products', productsRoute);
app.use('/api/cart', cartRoute);
app.use('/api/contact', contactRoute);
app.use('/api/profile', profileRoute);
app.use('/api/address', addressRoute);
app.use('/api/order', orderRoute);
app.use('/api/payment', paymentRoute);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
