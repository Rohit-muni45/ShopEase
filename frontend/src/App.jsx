import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import Products from "./pages/Products/Products";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./utils/ProtectedRoute";
import Cart from "./pages/Cart/Cart";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/Products/ProductDetail";
import Profile from "./pages/Profile";
import Checkout from "./pages/Cart/Checkout";
import { CartProvider } from "./context/CartContext";
import ErrorBoundary from "./utils/ErrorBoundary";
import ScrollToTop from "./utils/ScrollToTop";
import CartAddress from "./pages/Cart/CartAddress";
import CartPayment from "./pages/Cart/CartPayment";
import CartReview from "./pages/Cart/CartReview";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";

function App() {
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    // Simulate app bootstrap
    const initApp = async () => {
      try {
        // Example:
        // await validateToken();
        // await fetchUserProfile();
        // await fetchCartCount();
      } finally {
        setTimeout(() => setAppLoading(false), 2000); // smooth UX
      }
    };

    initApp();
  }, []);

  if (appLoading) {
    return <Loader />;
  }

  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/products"
              element={
                <ErrorBoundary>
                  <Products />
                </ErrorBoundary>
              }
            />
            <Route
              path="/product/:id"
              element={
                <ErrorBoundary>
                  <ProductDetail />
                </ErrorBoundary>
              }
            />
            <Route
              path="/about"
              element={
                <ErrorBoundary>
                  <About />
                </ErrorBoundary>
              }
            />
            <Route
              path="/contact"
              element={
                <ErrorBoundary>
                  <Contact />
                </ErrorBoundary>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/profile"
              element={
                <ErrorBoundary>
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                </ErrorBoundary>
              }
            />
            <Route
              path="/cart"
              element={
                <ErrorBoundary>
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                </ErrorBoundary>
              }
            />
            <Route
              path="/cart/address"
              element={
                <ErrorBoundary>
                  <ProtectedRoute>
                    <CartAddress />
                  </ProtectedRoute>
                </ErrorBoundary>
              }
            />
            <Route
              path="/cart/payment"
              element={
                <ErrorBoundary>
                  <ProtectedRoute>
                    <CartPayment />
                  </ProtectedRoute>
                </ErrorBoundary>
              }
            />
            <Route
              path="/cart/review"
              element={
                <ErrorBoundary>
                  <ProtectedRoute>
                    <CartReview />
                  </ProtectedRoute>
                </ErrorBoundary>
              }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
