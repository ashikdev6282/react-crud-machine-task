import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../context/Productcontext.jsx";

const AddProduct = () => {
  const navigate = useNavigate();
  const { addProduct } = useProducts();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !product.title ||
      !product.price ||
      !product.description ||
      !product.category ||
      !product.image
    ) {
      setError("⚠️ Please fill in all fields.");
      setTimeout(() => setError(""), 2000);
      return;
    }

    if (isNaN(product.price)) {
      setError("⚠️ Price must be a valid number.");
       setTimeout(() => setError(""), 2000);
      return;
    }

    const newProduct = { ...product, id: Date.now() };
    addProduct(newProduct); // ✅ directly updates global state
    setSuccess(true);
    setError("");

    setProduct({
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    });

    setTimeout(() => navigate("/"), 1500); // redirect back to product list
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5 sm:px-10">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6"> ➕ Add New Product</h2>

        {error && (
          <p className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{error}</p>
        )}
        {success && (
          <p className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">✅ Product added successfully!</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            placeholder="Product Title"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"/>
          <input
            type="text"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price ($)"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"/>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"/>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"/>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            rows="4"
            placeholder="Description"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500">
          </textarea>

          <div className="flex justify-between items-center mt-6">
            <Link
              to="/"
              className="text-gray-600 hover:text-indigo-600 font-medium transition">
              ← Back
            </Link>
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-6 py-2 rounded-lg transition">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
