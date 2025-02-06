import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { toast } from "sonner";
import { Loader } from "../components/Loader";
import { motion, AnimatePresence } from "framer-motion";
import { Breadcrumb } from "../components/Breadcrumb";
import { ScrollToTop } from "../components/ScrollToTop";
import { ShoppingCart, Check, Plus, Minus } from "lucide-react";

export const Products = () => {
  const { cartItems, addToCart, updateQuantity } = useCart();

  // Update the Product interface to include the new stock field.
  interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    stock: number; // New field for available stock.
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [addedItems, setAddedItems] = useState<Record<number, boolean>>({});

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://semaine-backend.onrender.com/api/products");
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Check if adding one more item would exceed the available stock.
  const canAddMore = (product: Product) => {
    const currentQuantity = getQuantityInCart(product.id);
    return currentQuantity < product.stock;
  };

  const handleAddToCart = (product: Product) => {
    // Only add the item if there is at least one item in stock.
    if (canAddMore(product)) {
      addToCart(product);
      setAddedItems((prev) => ({
        ...prev,
        [product.id]: true
      }));
      setTimeout(() => {
        setAddedItems((prev) => ({
          ...prev,
          [product.id]: false
        }));
      }, 1500);
    } else {
      // Optionally, you could notify the user that no more items can be added.
      toast.error("No more stock available for this product.");
    }
  };

  const getQuantityInCart = (productId: number) => {
    const item = cartItems.find((item) => item.id === productId);
    return item?.quantity || 0;
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Breadcrumb />
        <motion.h1
          className="text-4xl font-bold text-gray-900 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Our Products
        </motion.h1>
        <motion.p
          className="text-gray-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Premium security solutions for your peace of mind
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-60 w-full overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {product.name}
                </h3>
                <p className="text-gray-600 mt-2">{product.description}</p>
                {/* Optionally display stock information */}
                <p className="text-sm text-gray-500 mt-1">
                  {product.stock < 1 ? "Currently Unavailable" : `Stock available: ${product.stock - getQuantityInCart(product.id)}`}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-2xl font-bold text-gray-900">₦{product.price}</p>
                  {getQuantityInCart(product.id) > 0 ? (
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          updateQuantity(
                            product.id,
                            Math.max(0, getQuantityInCart(product.id) - 1)
                          )
                        }
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </motion.button>
                      <span className="font-semibold w-8 text-center">
                        {getQuantityInCart(product.id)}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        // Disable the + button if quantity already equals stock.
                        onClick={() => {
                          if (canAddMore(product)) {
                            updateQuantity(product.id, getQuantityInCart(product.id) + 1);
                          } else {
                            toast.error("You have reached the maximum stock for this product.");
                          }
                        }}
                        
                        className={`p-2 rounded-full bg-gray-100 transition-colors ${
                          !canAddMore(product)
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-gray-200"
                        }`}
                      >
                        <Plus className="h-4 w-4" />
                      </motion.button>
                    </div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddToCart(product)}
                      // Disable the button if there is no stock available.
                      disabled={!canAddMore(product)}
                      className={`flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-md transition-colors ${
                        !canAddMore(product) ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"
                      }`}
                    >
                      <AnimatePresence mode="wait">
                        {addedItems[product.id] ? (
                          <motion.span
                            key="check"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="flex items-center"
                          >
                            <Check className="h-5 w-5 mr-2" />
                            Added
                          </motion.span>
                        ) : (
                          <motion.span
                            key="cart"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="flex items-center"
                          >
                            <ShoppingCart className="h-5 w-5 mr-2" />
                            {product.stock < 1 ? "Unavailable" : "Add to Cart"}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};
