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
          flex-1 px-4 py-8 transition-padding duration-300
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
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
            {/* Left: Cart Items */}
            <div className="flex-1 space-y-6">
              <h2 className="text-2xl font-bold">Your Cart</h2>
              <div className="flex flex-col gap-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded-lg p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center boxColour"
                  >
                    <div className="flex-shrink-0 w-full sm:w-auto flex justify-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-28 h-28 object-contain"
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <div className="flex flex-wrap gap-2 text-sm">
                        <div>Price: ₹ {item.price}</div>
                        <div>Quantity: {item.quantity}</div>
                        <div>
                          Total: ₹ {(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="px-4 py-2 border rounded w-full sm:w-auto boxButton bg-purple-300"
                        aria-label={`Remove ${item.title}`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Bill Summary */}
            <div className="w-full lg:w-1/3 flex-shrink-0">
              <div className="border rounded-lg p-6 space-y-4 sticky top-20 boxColour ">
                <h2 className="text-xl font-bold">Bill Summary</h2>
                <div className="flex justify-between text-sm">
                  <span>Total Items</span>
                  <span>{totalItems}</span>
                </div>
                <div className="flex justify-between text-sm">
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
                  className="w-full px-4 py-3 rounded font-medium bg-purple-300 border-2"
                >
                  Order
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
