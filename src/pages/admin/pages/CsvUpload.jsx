import React from "react";
import { Input } from "@/components/ui/input";
import Papa from "papaparse";

export default function CsvUpload({ onUpload }) {
  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const parsedProducts = results.data.map((row) => ({
          name: row.name,
          rating: row.rating,
          price: Number(row.price),
          stock: Number(row.stock),
          category: row.category,
          imageUrl: row.imageUrl,
        }));
        onUpload(parsedProducts);
      },
    });
  };

  return (
    <Input
      type="file"
      accept=".csv"
      onChange={handleCSVUpload}
      className="w-full sm:w-48"
    />
  );
}
