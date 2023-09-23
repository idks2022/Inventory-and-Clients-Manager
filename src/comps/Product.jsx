import { Link } from "react-router-dom";
import PurchasesQuery from "./PurchasesQuery";
import { useState } from "react";
import { formatDate } from "./utils";

const Product = ({ product }) => {
  const [lastPurchase, setLastPurchase] = useState({});
  const [showAllPurchases, setShowAllPurchases] = useState(false);

  return (
    <>
      <div className="mb-1 p-2 space-y-2 text-medium">
        <div>
          <div>
            <Link
              to={`/Products/${product.id}`}
              className=" flex justify-between"
            >
              <div className="space-x-2">
                <span className="text-blue-500 hover:underline">
                  {product.name}
                </span>
                {product.units > 30 ? (
                  <span className="bg-green-100 border border-gray-200 rounded p-1 text-xs text-green-700">
                    In Stock
                  </span>
                ) : (
                  <span className="bg-red-100 border border-gray-200 rounded p-1 text-xs text-red-700">
                    Low Stock
                  </span>
                )}
              </div>
              <span className="text-gray-500">...</span>
            </Link>
          </div>
          <div className="text-gray-400">
            <span>Price: {product.price}</span>
            <span> | </span>
            <span>Units: {product.units}</span>
          </div>
        </div>

        {/* display last purchase date + 'show all' button */}
        <div className="text-gray-400">
          {lastPurchase && lastPurchase.date ? (
            <>
              <div className="flex justify-between">
                <span>{`Latest purchase: ${formatDate(
                  lastPurchase.date
                )} `}</span>
                <button
                  className=" text-red-500 hover:bg-gray-200 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  onClick={() => setShowAllPurchases((prev) => !prev)}
                >
                  {showAllPurchases ? "▲ Hide" : "▼ Show All"}
                </button>
              </div>
            </>
          ) : (
            <span className="italic">
              This product has not yet been purchased.
            </span>
          )}
        </div>
        {/* show product's purchases  */}
        <div>
          <PurchasesQuery
            product={product.id}
            renderedFrom="product"
            setLastPurchase={setLastPurchase}
            fetchOnlyLatest={showAllPurchases ? false : true}
          />
        </div>
      </div>
      <hr className="m-1 border-t border-gray-200" />
    </>
  );
};

export default Product;
