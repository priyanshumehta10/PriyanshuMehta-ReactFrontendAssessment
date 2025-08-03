import React from "react";
import { useCart } from "../context/CartProvider";
import { ShoppingCart } from "lucide-react"; // lucide icon

const Cart: React.FC = () => {
  const { cart, removeFromCart, totalItems, clearCart } = useCart();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <ShoppingCart size={100} strokeWidth={1.5} />
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <p>Add some products to see them here.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
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
      <div className="border rounded-lg p-4 h-fit space-y-3">
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
  );
};

export default Cart;
