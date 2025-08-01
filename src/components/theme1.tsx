import React from "react";

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

interface Theme1Props {
  products: Product[];
}

const ProductCard: React.FC<{ product: Product }> = React.memo(({ product }) => {
  return (
    <div className="p-5 bg-white rounded-xl shadow-sm hover:shadow-2xl transition-shadow duration-300 flex flex-col border-0.4">
      <div className="overflow-hidden rounded-md mb-4">
        <img
          src={product.image}
          alt={product.title}
          className="h-48 w-full object-contain transition-transform duration-300 ease-in-out hover:scale-105"
          loading="lazy"
        />
      </div>

      <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-1 ">
        {product.title}
      </h2>

      <p className="text-sm text-gray-500 text-left italic mb-2">
        {product.category}
      </p>

      <p className="text-sm text-gray-600 line-clamp-3 mb-3">
        {product.description}
      </p>

      <div className="mt-auto flex items-center justify-between text-sm font-medium text-gray-700">
        <span className="text-yellow-500">⭐ {product.rating.rate} ({product.rating.count})</span>
        <span className="text-green-600 text-2xl">₹ {product.price}</span>

      </div>
    </div>
  );
});

const Theme1: React.FC<Theme1Props> = ({ products }) => {
  if (!products || products.length === 0) {
    return <div className="text-center py-8 text-gray-500">No products available.</div>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 mt-6 px-4 sm:px-0">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default React.memo(Theme1);
