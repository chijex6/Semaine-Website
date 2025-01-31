import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Shield } from "lucide-react";
import { useCart } from "../context/CartContext";
export const Navbar = () => {
  const {
    cartItems
  } = useCart();
  return <nav className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-navy-600" />
            <span className="text-xl font-bold text-gray-900">Semaine</span>
          </Link>
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-gray-900">
              Products
            </Link>
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-gray-900" />
              {cartItems.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>}
            </Link>
          </div>
        </div>
      </div>
    </nav>;
};