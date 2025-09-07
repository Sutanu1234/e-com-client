"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import API from "@/lib/api";

export default function ShopNow() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.fetch("https://your-backend-url.com/products"); // ✅ Replace with your Spring Boot backend
        const data = await res.json();

        // Convert rating to number and sort
        const sorted = data
          .map((p) => ({ ...p, rating: parseFloat(p.rating) || 0 }))
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 8);

        setProducts(sorted);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
    toast.success("Added to Cart 🛒", { duration: 1500 });
  };

  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-8">
          Shop Now
        </h2>

        {/* Grid for cards */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-sm rounded-lg overflow-hidden flex flex-col"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-lg text-gray-800 truncate">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  ⭐ {product.rating.toFixed(1)}
                </p>
                <div className="mt-auto">
                  <p className="text-blue-600 font-bold text-lg mb-2">
                    ₹{Number(product.price).toFixed(2)}
                  </p>
                  <Button
                    onClick={() => addToCart(product)}
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Shop More Button */}
        <div className="text-center mt-10">
          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-700 transition">
            Shop More
          </button>
        </div>
      </div>
    </section>
  );
}
