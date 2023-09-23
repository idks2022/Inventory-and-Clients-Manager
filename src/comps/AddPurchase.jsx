import { useState } from "react";
import { useSelector } from "react-redux";
import { addItem, updateItem } from "./utils";
import { Timestamp } from "@firebase/firestore";

const AddPurchase = () => {
  const products = useSelector((state) => state.products.products);
  const customers = useSelector((state) => state.customers.customers);
  const selectedCustomer = useSelector((state) => state.selectedCustomer || {});
  const [customer, setCustomer] = useState(selectedCustomer || {});
  const [selectedProducts, setSelectedProducts] = useState([
    { productId: "", units: 0 },
  ]);

  const handleProductSubmit = async (e) => {
    //add purchase data to database
    e.preventDefault();
    const purchase = {
      customerId: customer.id,
      products: selectedProducts,
      date: Timestamp.fromDate(new Date()),
    };
    try {
      await addItem("purchases", purchase);
    } catch (error) {
      console.log(error);
      alert(
        "There was a problem fulfilling your request, if the problem persists, please contact the administrator."
      );
    }

    //update products stock
    selectedProducts.forEach((prod) => {
      const prodID = prod.productId;
      const unitsInStock = products[prodID].units;
      const unitsPurchased = prod.units;
      const updatedUnits = {
        units: unitsInStock - unitsPurchased,
      };
      try {
        updateItem("products", updatedUnits, prodID);
      } catch (error) {
        console.error(error);
        alert(
          "There was a problem fulfilling your request, if the problem persists, please contact the administrator."
        );
      }
    });

    //reset states
    setCustomer({});
    setSelectedProducts([{ productId: "", units: 0 }]);
  };

  const updateList = (index, key, value) => {
    if (
      key === "productId" &&
      selectedProducts.some((p) => p.productId === value)
    ) {
      alert("This product is already selected.");
      return;
    }
    const updatedProducts = [...selectedProducts];
    updatedProducts[index][key] = value;
    setSelectedProducts(updatedProducts);
  };

  const removeProductFromSelection = (index) => {
    const updatedList = [...selectedProducts];
    updatedList.splice(index, 1);
    setSelectedProducts(updatedList);
  };

  return (
    <div className="container mx-auto py-3 px-2">
      <h4 className="text-3xl font-bold mb-4 text-gray-900">
        Create a new purchase:
      </h4>
      <div className="border border-gray-300 p-1 mb-2 space-y-2 rounded">
        <form onSubmit={handleProductSubmit}>
          {/* select customer / customer is set by father component (customer) */}
          <div className="my-2">
            <label className="block text-sm font-medium text-gray-700">
              Select Customer:
            </label>
            <select
              value={customer.id || ""}
              onChange={(e) => {
                const selectedCustomerId = e.target.value;
                const foundCustomer = Object.values(customers).find(
                  (c) => c.id === selectedCustomerId
                );
                setCustomer(foundCustomer || {});
              }}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            >
              {customer?.id ? (
                <option value={customer.id}>
                  {customer.firstName} {customer.lastName} (ID: {customer.id})
                </option>
              ) : (
                <option hidden value="">
                  Select a customer...
                </option>
              )}
              {Object.values(customers).map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.firstName} {customer.lastName} (ID: {customer.id})
                </option>
              ))}
            </select>
          </div>
          <hr className="m-2 border-t border-gray-200" />
          {/* select products and units */}
          {selectedProducts.map((product, index) => (
            <div className="bg-gray-200 p-1 my-2 rounded" key={index}>
              <div className="flex justify-between items-center">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product:
                  </label>
                  <select
                    value={product.productId}
                    onChange={(e) =>
                      updateList(index, "productId", e.target.value)
                    }
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  >
                    <option hidden value="">
                      Select...
                    </option>
                    {Object.values(products).map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="ml-4 flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Units:
                  </label>
                  <input
                    type="number"
                    value={product.units}
                    onChange={(e) => updateList(index, "units", e.target.value)}
                    min="1"
                    max={products[product.productId]?.units}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>
                {/* Remove button to remove a selection */}
                <button
                  onClick={() => removeProductFromSelection(index)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-center my-2">
            {/* add a line of product-unit */}
            <button
              type="button"
              onClick={() =>
                setSelectedProducts([
                  ...selectedProducts,
                  { productId: "", units: 0 },
                ])
              }
              className="w-full py-1 text-red-500 bg-gray-200 hover:bg-gray-200 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              + Add a product to purchase
            </button>
          </div>

          <hr className="m-2 border-t border-gray-200" />
          {/* Finish button - save all the to database */}
          <div className="flex justify-center my-2">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
              Finish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPurchase;
