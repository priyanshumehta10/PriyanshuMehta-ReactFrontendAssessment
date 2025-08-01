import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";
import Theme1Card from "../components/theme1"; // expects prop "products"

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

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then(res => setProducts(res.data))
      .catch(err => {
        console.error("Failed to fetch products:", err);
      });
  }, []);

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600 text-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-indigo-500 mb-4" />
          <p className="text-lg font-medium tracking-wide">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {theme === "theme1" && <Theme1Card products={products} />}
      {/* placeholder for other themes, e.g.: */}
      {/* {theme === "theme2" && <Theme2Card products={products} />} */}
      {/* {theme === "theme3" && <Theme3Card products={products} />} */}
    </>
  );
}
