import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load products (API + localStorage)
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("addedProducts")) || [];

    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        const apiData = res.data;
        setProducts([...localData, ...apiData]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // ✅ Add new product
  const addProduct = (newProduct) => {
    setProducts((prev) => {
      const updated = [newProduct, ...prev];
      localStorage.setItem(
        "addedProducts",
        JSON.stringify([newProduct, ...(JSON.parse(localStorage.getItem("addedProducts")) || [])])
      );
      return updated;
    });
  };

  // ✅ Update existing product
  const updateProduct = (id, updatedData) => {
    setProducts((prevProducts) => {
      const updatedList = prevProducts.map((product) =>
        product.id === Number(id) ? { ...product, ...updatedData } : product
      );

      // Update localStorage only for custom (added) products
      const localProducts = JSON.parse(localStorage.getItem("addedProducts")) || [];
      const updatedLocal = localProducts.map((p) =>
        p.id === Number(id) ? { ...p, ...updatedData } : p
      );
      localStorage.setItem("addedProducts", JSON.stringify(updatedLocal));

      return updatedList;
    });
  };

  // ✅ Delete product
  const deleteProduct = (id) => {
    setProducts((prevProducts) => {
      const updatedList = prevProducts.filter((p) => p.id !== Number(id));

      const localProducts = JSON.parse(localStorage.getItem("addedProducts")) || [];
      const updatedLocal = localProducts.filter((p) => p.id !== Number(id));
      localStorage.setItem("addedProducts", JSON.stringify(updatedLocal));

      return updatedList;
    });
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
