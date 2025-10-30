import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  if (!product) return null;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
      {/* Product Image */}
      <div className="flex justify-center items-center bg-gray-100 p-6 h-60">
        <img
          src={product.image}
          alt={product.title}
          className="h-44 object-contain transition-transform duration-300 hover:scale-105"/>
      </div>

      {/* Product Details */}
      <div className="p-5 flex flex-col h-40">
        <h3 className="text-gray-800 font-semibold text-sm line-clamp-2 ">{product.title}</h3>
        <p className="text-gray-500 text-xs mb-1 capitalize">{product.category}</p>
        <p className="text-indigo-600 font-bold text-lg mb-3">${product.price}</p>

        <Link
          to={`/product/${product.id}`}
          className="mt-auto text-center bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
