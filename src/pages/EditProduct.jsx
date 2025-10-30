import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useProducts } from "../context/Productcontext.jsx";

const EditProduct = () => {
  const { id } = useParams();
  const { products, updateProduct } = useProducts();
  const navigate = useNavigate();

  const existingProduct = products.find((p) => p.id === Number(id));

  const [product, setProduct] = useState(
    existingProduct || {
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    }
  );

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
      return;
    }

    updateProduct(id, product); // ✅ Use context function
    setSuccess(true);
    setError("");

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  useEffect(() => {
    if (!existingProduct) {
      setError("Product not found.");
    }
  }, [existingProduct]);

  if (!existingProduct)
    return (
      <div className="text-center mt-20">
        <p className="text-lg text-gray-600 mb-4">Product not found.</p>
        <Link
          to="/"
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
          ← Back to Products
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5 sm:px-10">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">✏️ Edit Product</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-green-600 text-center mb-4 font-medium">✅ Product updated successfully!</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
          </div>

          <div>
            <label className="block font-semibold mb-1">Price ($)</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
          </div>

          <div>
            <label className="block font-semibold mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
          </div>

          <div>
            <label className="block font-semibold mb-1">Image URL</label>
            <input
              type="text"
              name="image"
              value={product.image}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
          </div>

          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows="4"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none">            
            </textarea>
          </div>

          <div className="flex justify-between mt-6">
            <Link to="/" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-6 rounded-lg">Cancel</Link>
            <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-6 rounded-lg">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
