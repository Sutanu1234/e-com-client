"use client";

import { useEffect, useState } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { CircleUserRound, ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import API from "@/lib/api";
import { toast } from "sonner";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editUser, setEditUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  
  // Fetch user details
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.get("/auth/me", { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          const data = res.data;
          setUser({ ...data, token });
          setEditUser({
            name: data.name || "",
            email: data.email || "",
            password: "",
          });
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
          toast.error("Login again", { duration: 1500 });
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
    window.location.reload();
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = () => {
    if (user?.token) {
      API.put("/auth/update-profile", editUser, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
        .then((res) => {
          const updatedUser = res.data;
          setEditUser({ ...updatedUser, password: "" });
          setUser({ ...updatedUser, token: user.token });
          toast.success("Profile updated successfully", { duration: 1500 });
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to update profile", { duration: 1500 });
        });
    }
  };

  const menuLinks = (
    <>
      <Button
        variant="link"
        onClick={() => {
          navigate("/");
          setMobileOpen(false);
        }}
      >
        Home
      </Button>
      <Button
        variant="link"
        onClick={() => {
          navigate("/products");
          setMobileOpen(false);
        }}
      >
        Products
      </Button>
      <Button
        variant="link"
        onClick={() => {
          navigate("/about");
          setMobileOpen(false);
        }}
      >
        About
      </Button>
      <Button
        variant="link"
        onClick={() => {
          navigate("/contact");
          setMobileOpen(false);
        }}
      >
        Contact
      </Button>
      <Button
        variant="link"
        onClick={() => {
          navigate("/cart");
          setMobileOpen(false);
        }}
        className="relative"
      >
        <ShoppingCart className="h-6 w-6" />
      </Button>

      <Popover>
        <PopoverTrigger>
          <CircleUserRound className="h-6 w-6 cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent className="w-72 p-4">
          <div className="flex flex-col gap-2">
            <Input
              name="name"
              placeholder="Name"
              value={editUser.name}
              onChange={handleProfileChange}
            />
            <Input
              name="email"
              placeholder="Email"
              value={editUser.email}
              onChange={handleProfileChange}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={editUser.password}
              onChange={handleProfileChange}
            />
            <Button
              onClick={handleUpdateProfile}
              className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              Update Profile
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      <Button
        onClick={handleLogout}
        className="text-white font-semibold bg-red-600 hover:bg-red-700"
      >
        Logout
      </Button>
    </>
  );

  return (
    <nav className="w-full border-b bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="p-4 md:p-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8">
            <img src="./toy.png" alt="Logo" />
          </div>
          <span className="text-xl font-bold text-blue-600">ToyKart</span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex gap-6 items-center">{menuLinks}</div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden flex flex-col gap-3 p-4 border-t bg-white">
          {menuLinks}
        </div>
      )}
    </nav>
  );
}
