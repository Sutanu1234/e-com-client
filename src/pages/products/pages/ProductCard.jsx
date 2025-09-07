import React from "react";
import { Button } from "@/components/ui/button";

export default function ProductCard({ product, handleAddToCart }) {
  const handleSubmit = () => {
    // Pass the product info directly
    handleAddToCart({ productId: product.id, quantity: 1 }, product.name);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden flex flex-col">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-42 object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-medium text-md text-blue-600 line-clamp-3">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-gray-600 text-sm line-clamp-2">
            rating: {product.rating}
          </p>
          <p className="text-blue-600 font-bold text-lg mb-2">
            ₹{product.price}
          </p>
        </div>
        <Button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
