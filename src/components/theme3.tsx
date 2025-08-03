import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Star, X, Filter, ChevronDown } from "lucide-react";
import { useCart } from "../context/CartProvider";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface Theme3Props {
  products: Product[];
}

const formatPrice = (p: number) => {
  return `₹ ${p.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
};

const CategoryPill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="inline-block px-3 py-1 text-[10px] font-semibold rounded-full bg-gray-100 text-gray-700">
    {children}
  </div>
);

// hook to detect truncation
const useIsTruncated = <T extends HTMLElement>(ref: React.RefObject<T | null>) => {
  const [truncated, setTruncated] = useState(false);
  useEffect(() => {
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

const ProductCard: React.FC<{
  product: Product;
  onImageClick: (src: string) => void;
}> = React.memo(({ product, onImageClick }) => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const isTitleTruncated = useIsTruncated(titleRef);
  const isDescTruncated = useIsTruncated(descRef);
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(product.id);

  const handleAdd = () => {
    if (!inCart) addToCart(product, 1);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -2, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
      className="flex flex-col h-full bg-white rounded-2xl shadow-md overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row flex-1">
        {/* Image section */}
        <div
          className="flex-shrink-0 w-full sm:w-1/3 bg-gray-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => onImageClick(product.image)}
          aria-label={`View larger image of ${product.title}`}
        >
          <motion.img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="max-h-40 w-full object-contain transition-transform"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 220 }}
          />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1">
            <div className="flex-1 min-w-0 pr-2">
              <h2
                ref={titleRef}
                className="text-base font-semibold text-gray-900 line-clamp-2"
                title={isTitleTruncated ? product.title : undefined}
              >
                {product.title}
              </h2>
            </div>
            <CategoryPill>{product.category}</CategoryPill>
          </div>

          <p
            ref={descRef}
            className="text-sm text-gray-600 line-clamp-3 flex-1 mb-3"
            title={isDescTruncated ? product.description : undefined}
          >
            {product.description}
          </p>

          <div className="flex items-center justify-between text-sm mb-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center rounded-full bg-yellow-100 px-2 py-1 text-yellow-800 text-xs font-medium">
                <Star className="w-3 h-3 inline-block mr-1" />
                {product.rating.rate.toFixed(1)}
              </div>
              <div className="text-gray-500 text-xs">({product.rating.count})</div>
            </div>
            <div className="text-lg font-bold text-green-600">{formatPrice(product.price)}</div>
          </div>

          <div className="mt-auto flex gap-2">
            <button
              onClick={handleAdd}
              disabled={inCart}
              aria-label={`Add ${product.title} to cart`}
              className={`flex-1 py-2 rounded-lg font-semibold transition border ${
                inCart
                  ? "bg-gray-200 text-gray-500 border-gray-200 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700 border-transparent"
              }`}
            >
              {inCart ? "In Cart" : "Add to Cart"}
            </button>
            <button
              aria-label={`Quick view of ${product.title}`}
              className="flex-none p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
              onClick={() => onImageClick(product.image)}
            >
              <Search className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const sortOptions = [
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Rating", value: "rating_desc" },
  { label: "Title A-Z", value: "title_asc" },
];

const Theme3: React.FC<Theme3Props> = ({ products }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [sort, setSort] = useState<string>("price_asc");

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    let arr = [...products];
    if (categoryFilter !== "All") {
      arr = arr.filter((p) => p.category === categoryFilter);
    }
    if (search.trim()) {
      arr = arr.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    switch (sort) {
      case "price_asc":
        arr.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        arr.sort((a, b) => b.price - a.price);
        break;
      case "rating_desc":
        arr.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case "title_asc":
        arr.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
    return arr;
  }, [products, categoryFilter, search, sort]);

  const clearFilters = useCallback(() => {
    setSearch("");
    setCategoryFilter("All");
    setSort("price_asc");
  }, []);

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 text-lg">
        No products available.
      </div>
    );
  }

  return (
    <>
      <div className="px-6 py-10 min-h-screen w-full bg-gradient-to-r from-[#C8A2C8] to-[#D6C6EB]">
        <div className="mx-auto max-w-[1400px]">
          {/* Header / Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 justify-between">
            <div className="flex gap-2 flex-1 flex-wrap">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute top-1/2 -translate-y-1/2 left-3 w-4 h-4 text-gray-400" />
                <input
                  aria-label="Search products"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="flex gap-2 flex-wrap">
                <div className="flex items-center gap-1">
                  <Filter className="w-5 h-5" />
                  <select
                    aria-label="Filter by category"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-1">
                  <ChevronDown className="w-5 h-5 rotate-180" />
                  <select
                    aria-label="Sort products"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"
                  >
                    {sortOptions.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={clearFilters}
                  aria-label="Clear filters"
                  className="text-sm px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr">
            <AnimatePresence initial={false} mode="popLayout">
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onImageClick={setSelectedImage}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Fullscreen Image Modal */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
                onClick={() => setSelectedImage(null)}
              >
                <div className="relative max-w-4xl max-h-[90vh]">
                  <button
                    aria-label="Close preview"
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(null);
                    }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <motion.img
                    src={selectedImage}
                    alt="Product Preview"
                    className="w-full h-full object-contain rounded-lg shadow-xl"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 180 }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default React.memo(Theme3);
