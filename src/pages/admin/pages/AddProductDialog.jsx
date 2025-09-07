import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogClose, DialogContent,
  DialogDescription, DialogFooter, DialogHeader,
  DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddProductDialog({ onAdd }) {
  const [newProduct, setNewProduct] = useState({
    name: "", description: "", price: "", stock: "", imageUrl: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(newProduct);
    setNewProduct({ name: "", description: "", price: "", stock: "", imageUrl: "" });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>Enter product details to add it to the store.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {["name", "description", "price", "stock", "imageUrl"].map((field) => (
              <div key={field} className="grid gap-2">
                <Label htmlFor={field}>{field}</Label>
                <Input
                  id={field}
                  value={newProduct[field]}
                  onChange={(e) => setNewProduct({ ...newProduct, [field]: e.target.value })}
                  required
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
