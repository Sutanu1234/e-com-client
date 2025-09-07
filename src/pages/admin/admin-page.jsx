"use client"
import React, { useState, useEffect } from "react"
import { toast } from "sonner"
import AddProductDialog from "./pages/AddProductDialog"
import UpdateProductDialog from "./pages/UpdateProductDialog"
import ProductTable from "./pages/ProductTable"
import CsvUpload from "./pages/CsvUpload"
import API from "@/lib/api"

export default function AdminPage() {
  const [products, setProducts] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)

  // Fetch products from backend
  useEffect(() => {
    API.get("/products")
      .then(res => setProducts(res.data))
      .catch(() => toast.error("Failed to fetch products", {duration: 1500}))
  }, [])

  // Add product
  const handleAddProduct = async (newProduct) => {
    try {
      const res = await API.post("/products", newProduct)
      setProducts([...products, res.data])
      toast.success("Product added successfully", {duration: 1500})
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add product", {duration: 1500})
    }
  }

  // Delete product
  const handleDelete = async (id) => {
    try {
      await API.delete(`/products/${id}`)
      setProducts(products.filter((p) => p.id !== id))
      toast.info("Product deleted", {duration: 1500})
    } catch (err) {
      toast.error("Failed to delete product" + err, {duration: 1500})
    }
  }

  // Update product
  const handleUpdateProduct = async (updatedProduct) => {
    try {
      const res = await API.put(`/products/${updatedProduct.id}`, updatedProduct)
      setProducts(products.map((p) => (p.id === updatedProduct.id ? res.data : p)))
      setEditingProduct(null)
      toast.success("Product updated successfully", {duration: 1500})
    } catch (err) {
      toast.error("Failed to update product" + err, {duration: 1500})
    }
  }

  // CSV upload
  const handleCSVUpload = async (parsedProducts) => {
    try {
      await API.post("/products/bulk", parsedProducts)
      // re-fetch products to sync
      const res = await API.get("/products")
      setProducts(res.data)
      toast.success("CSV products uploaded", {duration: 1500})
    } catch (err) {
      toast.error("CSV upload failed " + err, {duration: 1500})
    }
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto mt-16 md:mt-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Admin Product Dashboard</h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <AddProductDialog onAdd={handleAddProduct} />
          <CsvUpload onUpload={handleCSVUpload} />
        </div>
      </div>

      <ProductTable
        products={products}
        onDelete={handleDelete}
        onEdit={setEditingProduct}
      />

      {editingProduct && (
        <UpdateProductDialog
          product={editingProduct}
          onUpdate={handleUpdateProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  )
}
