"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="relative mt-16 md:mt20 max-h-screen md:h-[680px] w-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 px-6 md:px-12 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/home1.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/10" />{" "}
        {/* Overlay for readability */}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl flex items-center justify-end py-16">
        <div className="flex-1 max-w-2xl text-right space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-blue-600 leading-tight drop-shadow-sm">
            Snuggles, Smiles <br /> & Soft Companions
          </h1>
          <p className="font-medium md:text-lg text-gray-600 leading-relaxed">
            Because every little hero deserves a cuddly friend. Discover our
            adorable teddy bears and soft toys, made for endless hugs and
            smiles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer rounded-md px-8 py-4 text-base md:text-lg font-semibold shadow-xl transition transform hover:scale-105">
              🧸 Shop Teddy Bears
            </Button>
            <Button
              variant="outline"
              className="border-blue-600 border-[1px] text-blue-600 hover:text-blue-600 cursor-pointer rounded-md px-8 py-4 text-base md:text-lg font-semibold"
            >
              🚀 Explore Boys' Toys
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
