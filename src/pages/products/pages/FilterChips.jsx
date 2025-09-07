import React from "react";
import { Button } from "@/components/ui/button";

export default function FilterChips({ categories, selectedCategories, toggleCategory, sort, setSort, clearFilters }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <Button
          key={cat}
          variant={selectedCategories.includes(cat) ? "default" : "outline"}
          onClick={() => toggleCategory(cat)}
        >
          {cat}
        </Button>
      ))}

      <Button variant={sort === "LOW_TO_HIGH" ? "default" : "outline"} onClick={() => setSort("LOW_TO_HIGH")}>Price: Low → High</Button>
      <Button variant={sort === "HIGH_TO_LOW" ? "default" : "outline"} onClick={() => setSort("HIGH_TO_LOW")}>Price: High → Low</Button>
      <Button variant="destructive" onClick={clearFilters}>Clear Filters</Button>
    </div>
  );
}
