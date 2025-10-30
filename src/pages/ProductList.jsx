import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/productcard.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import { useProducts } from "../context/Productcontext"; 

const ProductList = () => {
  const { products, loading, addProduct } = useProducts(); 

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10">
          <h2
            className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0 tracking-tight"
            data-aos="fade-down">
            🛍️ All Products
          </h2>

          {/* Add Product Button */}
          <Link
            to="/add"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-5 rounded-lg shadow transition-all duration-300"
            data-aos="fade-left">➕ Add New Product
          </Link>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <p className="text-center text-gray-600 mt-20" data-aos="fade-up"> No products available. Try adding one!</p>
        ) : (
          <div
            className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            data-aos="fade-up">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
