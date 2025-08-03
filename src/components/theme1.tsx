import React, { useRef } from "react";
import type { Product } from "../context/CartProvider"; // adjust path
import { useCart } from "../context/CartProvider"; // use the global one

interface Theme1Props {
  products: Product[];
}

// unchanged truncation hook
const useIsTruncated = <T extends HTMLElement>(
  ref: React.RefObject<T | null>
) => {
  const [truncated, setTruncated] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => {
      const isClipped =
        el.scrollHeight > el.clientHeight + 1 ||
        el.scrollWidth > el.clientWidth + 1;
      setTruncated(isClipped);
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return truncated;
};

const ProductCard: React.FC<{ product: Product }> = React.memo(({ product }) => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const isTitleTruncated = useIsTruncated(titleRef);
  const isDescTruncated = useIsTruncated(descRef);

  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(product.id);

  const handleAdd = () => {
    addToCart(product, 1);
  };

  return (
    <div className="p-5 bg-white rounded-xl shadow-sm hover:shadow-2xl transition-shadow duration-300 flex flex-col">
      <div className="overflow-hidden rounded-md mb-4">
        <img
          src={product.image}
          alt={product.title}
          className="h-48 w-full object-contain transition-transform duration-300 ease-in-out hover:scale-105"
          loading="lazy"
        />
      </div>

      <h2
        ref={titleRef}
        className="text-lg font-semibold text-gray-800 line-clamp-2 mb-1 relative"
        title={isTitleTruncated ? product.title : undefined}
      >
        {product.title}
      </h2>

      <p className="text-sm text-gray-500 italic mb-2">{product.category}</p>

      <p
        ref={descRef}
        className="text-sm text-gray-600 line-clamp-3 mb-3 relative"
        title={isDescTruncated ? product.description : undefined}
      >
        {product.description}
      </p>

      <div className="mt-auto flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm font-medium text-gray-700">
          <span className="text-yellow-500">
            ⭐ {product.rating.rate} ({product.rating.count})
          </span>
          <span className="text-green-600 text-2xl">₹ {product.price}</span>
        </div>
        <button
          onClick={handleAdd}
          disabled={inCart}
          className={`w-full mt-2 py-2 rounded-lg font-semibold transition border-2 ${
            inCart
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-black text-white hover:opacity-90"
          }`}
        >
          {inCart ? "In Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
});

const Theme1: React.FC<Theme1Props> = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">No products available.</div>
    );
  }

  return (
    <div className="space-y-4 mt-5">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 mt-2 px-4 sm:px-0">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Theme1);
