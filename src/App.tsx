import NotFoundPage from "./components/NotFound";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "sonner";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import ErrorBoundary from "./components/ErrorBoundary";
import { Products } from "./pages/Products";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
export function App() {
  return <ErrorBoundary>
  <CartProvider>
      <div className="min-h-screen bg-white">
        <Toaster 
          theme="dark" 
          position="top-right" 
          toastOptions={{
            style: {
              background: "#0a0a0a",  // Rich black background
              border: "1px solid #1f2937",  // Darker border
              color: "#f3f4f6",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.5)"  // Added depth
            }
          }} 
        />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </CartProvider>
    </ErrorBoundary>;
}