import React from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, handleAddToCart }) {
  if (products.length === 0) return <p className="text-gray-500 text-center">No products found</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} handleAddToCart={handleAddToCart} />
      ))}
    </div>
  );
}
