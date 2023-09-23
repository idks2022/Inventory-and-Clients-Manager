import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Customer from "./Customer";

const Customers = () => {
  const navigate = useNavigate();
  const customers = useSelector((state) => state.customers.customers);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);

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

      const filteredCustomers = Object.values(customers).filter((customer) => {
        return (
          customer.firstName
            .toLowerCase()
            .includes(debouncedInput.toLowerCase()) ||
          customer.lastName.toLowerCase().includes(debouncedInput.toLowerCase())
        );
      });

      setFilteredCustomers(filteredCustomers);
    } else {
      setFilteredCustomers(Object.values(customers));
    }
  }, [debouncedInput, customers]);

  return (
    <>
      <div className="container mx-auto py-3 px-2">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-4 text-gray-900">
          Customers page
        </h1>

        {/* Region 1: Add Product Button and Search Input */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate("new")}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Add Customer
          </button>

          <input
            type="text"
            placeholder="Search Customer..."
            onChange={(e) => setSearchInput(e.target.value)}
            className="py-2 px-4 border border-gray-300 rounded"
          />
        </div>

        {/* Region 2: Customers' Compnents  */}
        <div>
          {filteredCustomers.map((customer) => {
            return <Customer key={customer.id} customer={customer} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Customers;
