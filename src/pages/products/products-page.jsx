"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import FilterChips from "./pages/FilterChips";
import ProductGrid from "./pages/ProductGrid";
import API from "@/lib/api";
import { toast } from "sonner";

const categories = [
  "Educational Toys",
  "Vehicles & RC Toys",
  "Puzzles & Brain Games",
  "Arts & Crafts",
  "Action Figures",
];

export default function ProductPage() {
  const [allProducts, setAllProducts] = useState([]); // store all fetched products
  const [products, setProducts] = useState([]); // store filtered products
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sort, setSort] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetch all products once
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/products`);
      setAllProducts(res.data);
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
  }, []);

  // apply filters (search, categories, sort) locally
  useEffect(() => {
    let filtered = [...allProducts];

    if (search.trim()) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    if (sort === "LOW_TO_HIGH") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "HIGH_TO_LOW") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === "rating-desc") {
      filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    }

    setProducts(filtered);
  }, [search, selectedCategories, sort, allProducts]);

  const toggleCategory = (cat) =>
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );

  const handleAddToCart = async (addCartProduct, productName) => {
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
