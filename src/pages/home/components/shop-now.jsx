"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
// import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner"

const products = [
  {
    id: 1,
    name: "Handmade Wooden Doll",
    description:
      "A beautifully crafted wooden doll made by Indian artisans with love and care.",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Educational Blocks",
    description:
      "Colorful building blocks designed to enhance problem-solving and creativity.",
    price: 450,
    image:
      "https://plus.unsplash.com/premium_photo-1664373233010-7c4abae40f78?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    name: "Soft Plush Elephant",
    description: "Super soft plush toy, perfect cuddle partner for kids.",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    name: "Wooden Puzzle",
    description: "Brain-stimulating puzzle toy for kids aged 5+.",
    price: 220,
    image:
      "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 5,
    name: "Pull Along Toy Car",
    description: "Eco-friendly wooden pull-along car toy.",
    price: 350,
    image:
      "https://images.unsplash.com/photo-1612355524120-462e49e4ffe6?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 6,
    name: "Handmade Rattle",
    description: "Safe, non-toxic handmade baby rattle.",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1612355524120-462e49e4ffe6?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 7,
    name: "Chess Board",
    description: "Classic wooden chess board to sharpen strategy skills.",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1530325553241-4f6e7690cf36?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 8,
    name: "Educational Flash Cards",
    description:
      "Colorful flashcards for early learning and memory development.",
    price: 199,
    image:
      "https://plus.unsplash.com/premium_photo-1661412706592-0d43f0b0b440?w=600&auto=format&fit=crop&q=60",
  },
];

export default function ShopNow() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    toast.success("Added to Cart 🛒", {duration: 1500})
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
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-lg text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {product.description}
                </p>
                <div className="mt-auto">
                  <p className="text-blue-600 font-bold text-lg mb-2">
                    ₹{product.price}
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
