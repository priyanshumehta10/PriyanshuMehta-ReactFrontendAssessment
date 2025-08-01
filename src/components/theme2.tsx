import React, { useState } from "react";
import Sidebar from "./sidebar";

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

interface Theme2Props {
  products: Product[];
}

const ProductCard: React.FC<{ product: Product }> = React.memo(({ product }) => {
  return (
    <div className="p-6 bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col w-full">
      <div className="flex flex-col md:flex-row gap-6 mb-4 min-w-0"> {/* <-- min-w-0 */}
        <div className="flex-shrink-0 w-full md:w-1/3 overflow-hidden rounded-md">
          <img
            src={product.image}
            alt={product.title}
            className="h-48 w-full object-contain transition-transform duration-300 ease-in-out hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="flex-1 flex flex-col min-w-0"> {/* <-- min-w-0 so text can truncate */}
          <h2 className="text-xl font-semibold text-white mb-2 line-clamp-2">
            {product.title}
          </h2>
          <p className="text-sm text-gray-400 italic mb-2">{product.category}</p>
          <p className="text-sm text-gray-300 line-clamp-4 mb-4 flex-1">
            {product.description}
          </p>
          <div className="mt-2 flex items-center justify-between text-sm font-medium text-gray-300">
            <span className="text-yellow-400">
              ⭐ {product.rating.rate} ({product.rating.count})
            </span>
            <span className="text-green-400 text-lg font-semibold">
              ₹ {product.price}
            </span>
          </div>
        </div>
      </div>
    </div>

  );
});

const Theme2: React.FC<Theme2Props> = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">No products available.</div>
    );
  }
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <div className="flex min-h-screen bg-gray-950 overflow-x-hidden">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <main className={`
    flex-1 p-6 transition-padding duration-300
    ${collapsed ? "pl-16 md:pl-16" : "pl-64 md:pl-64"}
  `}
        style={{ marginLeft: 0 }}> {/* <-- min-w-0 here */}
        <div className="flex flex-col gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>

  );
};

export default React.memo(Theme2);
