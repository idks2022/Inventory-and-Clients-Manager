import { useSelector } from "react-redux";
import { useState } from "react";
import PurchasesQuery from "./PurchasesQuery";

const Purchases = () => {
  const products = useSelector((state) => state.products.products);
  const customers = useSelector((state) => state.customers.customers);

  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResults(true);
  };

  return (
    <>
      <div className="container mx-auto py-3 px-2">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">
          Purchases page
        </h1>

        <div className="border border-gray-300 p-4 mb-4 rounded">
          <h4 className="mb-3">Search a purchase</h4>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Select a customer  */}
            <div>
              <select
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                onChange={(e) => setSelectedCustomer(e.target.value)}
              >
                <option hidden value="">
                  Search by customer...
                </option>
                <option value="">all customers</option>
                {Object.values(customers).map((customer) => {
                  return (
                    <option key={customer.id} value={customer.id}>
                      {customer.firstName} {customer.lastName}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Select a product  */}
            <div>
              <select
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                <option hidden value="">
                  Search by product...
                </option>
                <option value="">all products</option>
                {Object.values(products).map((product) => {
                  return (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Select date range  */}
            <div className="flex space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  From Date:
                </label>
                <input
                  type="date"
                  max={selectedEndDate}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  onChange={(e) => setSelectedStartDate(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  To Date:
                </label>
                <input
                  type="date"
                  min={selectedStartDate}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  onChange={(e) => setSelectedEndDate(e.target.value)}
                />
              </div>
            </div>
            {/* Search button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        {/* Show results  */}
        {showResults && (
          <div className="border border-gray-300 rounded">
            <PurchasesQuery
              product={selectedProduct}
              customer={selectedCustomer}
              startDate={selectedStartDate}
              endDate={selectedEndDate}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Purchases;
