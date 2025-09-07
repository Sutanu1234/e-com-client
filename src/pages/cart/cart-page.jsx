"use client";
import React, { useState, useEffect } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import LeftSideCard from "./left-side-card";
import { toast } from "sonner";
import API from "@/lib/api";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart items from backend
  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await API.get("/cart");
      setCartItems(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch cart", { duration: 1500 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleIncrement = async (productId, currentQuantity) => {
    try {
      const requestBody = { productId, quantity: currentQuantity + 1 };
      await API.put("/cart/update", requestBody);

      setCartItems((prev) =>
        prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: currentQuantity + 1 }
            : item
        )
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to update quantity", { duration: 1500 });
    }
  };

  const handleDecrement = async (productId, currentQuantity) => {
    try {
      if (currentQuantity === 1) {
        await API.delete(`/cart/remove/${productId}`);
        setCartItems((prev) =>
          prev.filter((item) => item.productId !== productId)
        );
      } else {
        const requestBody = { productId, quantity: currentQuantity - 1 };
        await API.put("/cart/update", requestBody);

        setCartItems((prev) =>
          prev.map((item) =>
            item.productId === productId
              ? { ...item, quantity: currentQuantity - 1 }
              : item
          )
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update quantity", { duration: 1500 });
    }
  };

  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  if (loading)
    return (
      <p className="text-center text-blue-600 font-semibold mt-20">
        Loading cart...
      </p>
    );

  return (
    <div className="p-4 md:p-8 mt-16 md:mt-20">
      <div>
        <h2 className="text-2xl font-bold text-center md:text-left">
          Shopping Bag
        </h2>
        <h4 className="text-lg font-semibold text-center md:text-left">
          {cartItems.length} items{" "}
          <span className="font-normal">in your bag</span>
        </h4>
      </div>

      <div className="mt-6 flex flex-col md:flex-row gap-6 md:items-start">
        {/* Left Side - Cart Items */}
        <div className="border p-4 rounded-lg md:w-3/4 flex flex-col gap-4">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex flex-col md:flex-row gap-4 items-start md:items-center"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="rounded-md w-full md:w-[120px] h-[160px] object-cover"
                />
                <div className="flex flex-col justify-between flex-1 gap-2">
                  <h3 className="text-gray-500 font-semibold">
                    {item.category}
                  </h3>
                  <p className="text-lg font-bold truncate max-w-[400px]">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-600 truncate">
                    rating: {item.rating}
                  </p>
                  <p className="font-medium">Price: ₹{item.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center gap-2">
                  {item.quantity > 1 ? (
                    <Button
                      size="sm"
                      onClick={() =>
                        handleDecrement(item.productId, item.quantity)
                      }
                    >
                      <Minus size={16} />
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() =>
                        handleDecrement(item.productId, item.quantity)
                      }
                    >
                      <Trash2 size={16} />
                    </Button>
                  )}
                  <span className="mx-2 font-medium">{item.quantity}</span>
                  <Button
                    size="sm"
                    onClick={() =>
                      handleIncrement(item.productId, item.quantity)
                    }
                  >
                    <Plus size={16} />
                  </Button>
                </div>

                <div className="mt-2 md:mt-0 md:ml-4 font-medium">
                  Total: ₹{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))
          ) : (
            <p>No items found</p>
          )}
        </div>

        {/* Right Side - Summary Card */}
        <LeftSideCard totalPrice={totalPrice} />
      </div>
    </div>
  );
};

export default CartPage;
