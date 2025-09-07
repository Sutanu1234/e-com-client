import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UpdateProductDialog({ product, onUpdate, onClose }) {
  const [formData, setFormData] = useState(product || {});

  // Sync when product changes (when you select another product)
  useEffect(() => {
    setFormData(product || {});
  }, [product]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData); // only trigger update when Save is clicked
  };

  return (
    <Dialog open={!!product} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Update Product</DialogTitle>
            <DialogDescription>
              Modify product details and save changes.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {["name", "description", "price", "stock", "imageUrl"].map(
              (field) => (
                <div key={field} className="grid gap-2">
                  <Label htmlFor={`edit-${field}`}>{field}</Label>
                  <Input
                    id={`edit-${field}`}
                    value={formData?.[field] || ""}
                    onChange={(e) => handleChange(field, e.target.value)}
                    required
                  />
                </div>
              )
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
