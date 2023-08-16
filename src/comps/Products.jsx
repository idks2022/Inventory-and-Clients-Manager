import { useSelector } from "react-redux";
import Product from "./Product";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BestSellers from "./BestSellers";

const Products = () => {
  const products = useSelector((state) => state.products.products);
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedInput(searchInput);
    }, 250);
    return () => {
      clearTimeout(timerId);
    };
  }, [searchInput]);

  useEffect(() => {
    if (debouncedInput) {
      console.log(`searching for "${debouncedInput}"`);

      const filteredProducts = Object.values(products).filter((product) => {
        return product.name
          .toLowerCase()
          .includes(debouncedInput.toLowerCase());
      });

      setFilteredProducts(filteredProducts);
    } else {
      setFilteredProducts(Object.values(products));
    }
  }, [debouncedInput, products]);

  return (
    <>
      <div className="container mx-auto py-3 px-2">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Products page</h1>

        {/* Add Product Button and Search Input */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate("new")}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Add Product
          </button>

          <input
            type="text"
            placeholder="Search Product..."
            onChange={(e) => setSearchInput(e.target.value)}
            className="py-2 px-4 border border-gray-300 rounded"
          />
        </div>

        {/* Region 1: Best/Worst Sellers */}
        <div className="mb-2 rounded">
          <BestSellers />
        </div>

        {/* show */}
        <div className="border border-gray-300 p-1 rounded">
          {filteredProducts.map((product) => {
            return (
              <Product key={product.id} product={product} className="mb-4" />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Products;
