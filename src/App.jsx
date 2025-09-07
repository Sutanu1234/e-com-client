import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/login-page";
import RegisterPage from "./pages/auth/register-page";
import HomePage from "./pages/home/home-page.jsx";
import { Toaster } from "./components/ui/sonner";
import Navbar from "./pages/nav/nav-bar";
import CartPage from "./pages/cart/cart-page";
import ProductPage from "./pages/products/products-page";
import AdminPage from "./pages/admin/admin-page";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.roles && payload.roles.includes("ADMIN")) {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    }
    setLoading(false);
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin"></div>
          <p className="mt-4 text-blue-600 font-semibold text-lg">Loading...</p>
        </div>
      </div>
    );

  return (
    <>
      <Toaster position="top-right" richColors />
      {isAuthenticated && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" />}
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/cart"
          element={isAuthenticated ? <CartPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/products"
          element={isAuthenticated ? <ProductPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={
            isAuthenticated && isAdmin ? <AdminPage /> : <Navigate to="/" />
          }
        />
      </Routes>
    </>
  );
}

export default App;
