import React, { useState, useContext } from "react";
import { useCart } from "../context/CartProvider";
import { ShoppingCart } from "lucide-react";
import Sidebar from "../components/sidebar";
import { ThemeContext } from "../context/ThemeContext";

const Cart: React.FC = () => {
  const { cart, removeFromCart, totalItems, clearCart } = useCart();
  const { theme } = useContext(ThemeContext);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const showSidebar = theme === "theme2";

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      {showSidebar && (
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      )}

      {/* Main content */}
      <main
        className={`
          flex-1 px-6 py-8 transition-padding duration-300
          ${showSidebar ? (collapsed ? "pl-16 md:pl-16" : "pl-64 md:pl-64") : ""}
        `}
      >
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <ShoppingCart size={100} strokeWidth={1.5} />
            <h2 className="text-2xl font-bold">Your cart is empty</h2>
            <p>Add some products to see them here.</p>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left: Cart Items */}
            <div className="md:col-span-2 space-y-4">
              <h2 className="text-2xl font-bold">Your Cart</h2>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-4 flex gap-4 items-center"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-contain"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p>Price: ₹ {item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Total: ₹ {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="px-3 py-1 border rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Right: Bill Summary */}
            <div className="border rounded-lg p-4 mt-12 h-fit space-y-3">
              <h2 className="text-xl font-bold">Bill Summary</h2>
              <div className="flex justify-between">
                <span>Total Items</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Price</span>
                <span>₹ {totalPrice.toFixed(2)}</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold">
                <span>Grand Total</span>
                <span>₹ {totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={clearCart}
                className="w-full px-4 py-2 border rounded"
              >
                Order
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
