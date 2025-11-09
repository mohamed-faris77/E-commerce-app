// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext.jsx";
import "./styles/index.css";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { user, loading } = useAuth();

  // Theme persistence
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Prevent rendering before user state loads
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-700 dark:text-gray-200">
        Loading...
      </div>
    );

  return (
    <Router>
      <div
        className={`min-h-screen flex flex-col ${
          theme === "dark" ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <Navbar theme={theme} setTheme={setTheme} />

        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/contact" element={<div>Contact Page</div>} />
            <Route path="/about" element={<div>About Page</div>} />

            {/* Prevent logged-in users from accessing login/register again */}
            <Route
              path="/login"
              element={user ? <Navigate to={user.role === "admin" ? "/admin" : "/"} /> : <Login />}
            />
            <Route
              path="/register"
              element={user ? <Navigate to={user.role === "admin" ? "/admin" : "/"} /> : <Register />}
            />

            {/* Protected User Routes */}
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />

            {/* Protected Admin Route */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
