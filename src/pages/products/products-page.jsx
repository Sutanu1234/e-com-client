"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import FilterChips from "./pages/FilterChips";
import ProductGrid from "./pages/ProductGrid";
import API from "@/lib/api";
import { toast } from "sonner";

const categories = ["Educational", "Vehicles", "Puzzles", "Action Figures"];

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sort, setSort] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      if (search.trim()) params.append("name", search);

      selectedCategories.forEach((cat) => {
        params.append("categories", cat); // Append each category separately
      });

      if (sort) params.append("sort", sort);

      const res = await API.get(`/products?${params.toString()}`);
      console.log(res.data);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch products", { duration: 1500 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, selectedCategories, sort]);

  const toggleCategory = (cat) =>
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );

  const handleAddToCart = async (addCartProduct, productName) => {
    console.log(addCartProduct);
    try {
      await API.post("/cart/add", addCartProduct);
      toast.success(`${productName} added to cart`, { duration: 1500 });
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart", { duration: 1500 });
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSort(null);
    setSearch("");
  };

  return (
    <div className="p-6 space-y-6 mt-16 max-w-7xl mx-auto md:mt-20">
      <Input
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />
      <FilterChips
        categories={categories}
        selectedCategories={selectedCategories}
        toggleCategory={toggleCategory}
        sort={sort}
        setSort={setSort}
        clearFilters={clearFilters}
      />
      {loading ? (
        <p className="text-center text-blue-600 font-semibold">Loading...</p>
      ) : (
        <ProductGrid products={products} handleAddToCart={handleAddToCart} />
      )}
    </div>
  );
}
