import React from "react";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Heart, CheckCircle } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Breadcrumb } from "../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
const relatedProducts = [{
  id: 4,
  name: "Security Camera",
  price: 89.99,
  image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?ixlib=rb-4.0.3"
}, {
  id: 5,
  name: "Smart Door Lock",
  price: 149.99,
  image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3"
}];
export const Cart = () => {
  const {
    cartItems = [],
    removeFromCart,
    updateQuantity,
    addToCart
  } = useCart();
  const subtotal = cartItems.reduce((sum, item) => sum + (item?.price || 0) * (item?.quantity || 0), 0) || 0;
  const shipping = 0;
  const tax = subtotal ? subtotal * 0.1 || 0 : 0;
  const total = subtotal + shipping + tax || 0;
  const navigate = useNavigate();
  if (cartItems.length === 0) {
    return <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} className="w-full min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <motion.div initial={{
        scale: 0.5
      }} animate={{
        scale: 1
      }} transition={{
        duration: 0.3
      }}>
          <ShoppingBag className="w-24 h-24 text-gray-400 mb-6" />
        </motion.div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          Looks like you haven't added any security products to your cart yet.
          Browse our collection to find what you need.
        </p>
        <Link to="/products" className="bg-red-600 text-white px-8 py-4 rounded-md hover:bg-red-700 transition-colors inline-flex items-center">
          Start Shopping <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </motion.div>;
  }
  const handleCheckout = () => {
    navigate("/checkout");
  };
  return <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Breadcrumb />
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence>
              {cartItems.map((item, index) => <motion.div key={item.id} initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} exit={{
              opacity: 0,
              x: -20
            }} transition={{
              delay: index * 0.1
            }} className="bg-white rounded-lg shadow-md p-6 mb-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center">
                    <motion.img whileHover={{
                  scale: 1.05
                }} src={item.image} alt={item.name} className="h-24 w-24 object-cover rounded" />
                    <div className="sm:ml-6 flex-1 mt-4 sm:mt-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {item.name}
                          </h3>
                          <p className="text-gray-600">
                            Unit Price: ${item.price}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <button className="text-gray-400 hover:text-red-600 transition-colors" title="Save for later">
                            <Heart className="h-5 w-5" />
                          </button>
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-600 transition-colors">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center mt-4">
                        <div className="flex items-center border rounded-md">
                          <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="p-2 hover:bg-gray-100 transition-colors">
                            <Minus className="h-4 w-4" />
                          </button>
                          <input type="number" min="1" value={item.quantity} onChange={e => updateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))} className="w-16 text-center border-x p-2" />
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-gray-100 transition-colors">
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="ml-auto">
                          <p className="text-lg font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>)}
            </AnimatePresence>
            <div className="mt-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                You Might Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedProducts.map(product => <motion.div key={product.id} whileHover={{
                y: -4
              }} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="h-48 w-full">
                      <motion.img whileHover={{
                    scale: 1.05
                  }} transition={{
                    duration: 0.3
                  }} src={product.image} alt={product.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 mt-1">${product.price}</p>
                      <button onClick={() => addToCart(product)} className="mt-4 w-full bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </motion.div>)}
              </div>
            </div>
          </div>
          <motion.div initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} className="lg:sticky lg:top-8 h-fit">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimated Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Final price including tax and shipping
                  </p>
                </div>
                <motion.button whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }} onClick={handleCheckout} className="w-full bg-red-600 text-white py-4 rounded-md mt-6 hover:bg-red-700 transition-colors text-lg font-medium">
                  Proceed to Checkout
                </motion.button>
                <Link to="/products" className="block text-center text-gray-600 hover:text-gray-900 mt-4 text-sm">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>;
};