import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import { useProducts } from "../context/Productcontext.jsx";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, deleteProduct } = useProducts();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  //  Try local first → fallback to API
  useEffect(() => {
    const localProduct = products.find((p) => p.id === Number(id));
    if (localProduct) {
      setProduct(localProduct);
      setLoading(false);
    } else {
      axios
        .get(`https://fakestoreapi.com/products/${id}`)
        .then((res) => {
          setProduct(res.data);
          setLoading(false);
        })
        .catch(() => {
          setError("Error loading product details.");
          setLoading(false);
        });
    }
  }, [id, products]);

  //  Delete confirmation + notification sweetalert 
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id);
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The product has been removed successfully.",
          showConfirmButton: false,
          timer: 1800,
        });
        navigate("/");
      }
    });
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <h3 className="text-center text-red-600 text-lg font-semibold mt-10">
        {error}
      </h3>
    );

  return (
    <div
      className="min-h-screen bg-gray-50 py-10 px-5 sm:px-10"
      data-aos="fade-in">
      <div
        className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10"
        data-aos="fade-up">

        {/* Product Image */}
        <div className="flex justify-center items-center bg-gray-100 rounded-lg p-6">
          <img
            src={product.image}
            alt={product.title}
            className="h-72 sm:h-80 w-auto object-contain transition-transform duration-300 hover:scale-105"/>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between space-y-5">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 leading-tight">
              {product.title}
            </h1>
            <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
              Category:{" "}
              <span className="font-medium text-gray-700">
                {product.category}
              </span>
            </p>
            <p className="text-emerald-600 text-3xl font-bold mb-6">
              ${product.price}
            </p>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              {product.description}
            </p>
          </div>

          {/* Buttons */}
          <div
            className="mt-8 flex flex-wrap gap-3 justify-start"
            data-aos="fade-up">
            <Link
              to={`/edit/${product.id}`}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-5 rounded-lg transition-all duration-300">
              ✏️ Edit
            </Link>

            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-5 rounded-lg transition-all duration-300">
              🗑️ Delete
            </button>

            <Link
              to="/"
              className="border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium py-2 px-5 rounded-lg transition-all duration-300">
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
