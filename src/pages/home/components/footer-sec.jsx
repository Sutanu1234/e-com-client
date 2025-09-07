import { Instagram, Facebook, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">ToyKart</h3>
          <p>
            Bringing the best handcrafted and educational toys from India to
            your doorstep. Safe, fun, and perfect for children of all ages.
          </p>
          <div className="flex mt-4 space-x-4 text-white">
            <a href="#" className="hover:text-blue-400">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-blue-400">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-blue-400">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-blue-400">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-blue-400">
                Home
              </a>
            </li>
            <li>
              <a href="/shop" className="hover:text-blue-400">
                Shop
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-blue-400">
                About Us
              </a>
            </li>
            <li>
              <a href="/cart" className="hover:text-blue-400">
                Cart
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">Contact</h3>
          <ul className="space-y-2">
            <li>
              Email:{" "}
              <a href="mailto:info@toykart.com" className="hover:text-blue-400">
                info@toykart.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a href="tel:+911234567890" className="hover:text-blue-400">
                +91 12345 67890
              </a>
            </li>
            <li>Address: 123 Toy Street, Kolkata, India</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
        &copy; {new Date().getFullYear()} ToyKart. All rights reserved.
      </div>
    </footer>
  );
}
