import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import PurchasesQuery from "./PurchasesQuery";
import { useState } from "react";
import { SET_SELECTED_CUSTOMER } from "../redux/actionTypes";
import { formatDate } from "./utils";

const Customer = ({ customer }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch({ type: SET_SELECTED_CUSTOMER, payload: customer });
    navigate("/purchases/new");
  };

  const [lastPurchase, setLastPurchase] = useState({});
  const [showAllPurchases, setShowAllPurchases] = useState(false);

  return (
    <>
      <div className="border border-gray-300 mb-2 rounded space-y-1 text-gray-400 text-medium">
        <div className="bg-color bg-gray-100 p-3 rounded-t">
          <Link
            to={`/Customers/${customer.id}`}
            className=" flex justify-between"
          >
            <span className="text-blue-500 hover:underline">
              {customer.firstName} {customer.lastName}
            </span>
            <span className="text-gray-500">...</span>
          </Link>
        </div>
        <div className="flex justify-between pl-3 pr-3">
          City <span>{customer.city}</span>
        </div>
        <hr className="m-2 border-t border-gray-200" />
        <div className="flex justify-between pl-3 pr-3">
          Phone <span>{customer.phone}</span>
        </div>
        <hr className="m-2 border-t border-gray-200" />
        <div className="flex justify-between pl-3 pr-3">
          Latest purchase
          <span>
            {lastPurchase.date ? (
              formatDate(lastPurchase.date)
            ) : (
              <span className="italic"> No purchases yet </span>
            )}
          </span>
        </div>
        <hr className="m-2 border-t border-gray-200" />
        <div className="flex justify-between p-3">
          <button
            onClick={() => handleClick()}
            className=" text-red-500 hover:bg-gray-200 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            <span>+ Add a Purchase</span>
          </button>
          {/* display last purchase date + 'show all' button */}
          {lastPurchase.date && (
            <button
              className=" text-red-500 hover:bg-gray-200 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              onClick={() => setShowAllPurchases((prev) => !prev)}
            >
              {showAllPurchases ? "▲ Hide" : "▼ Show All"}
            </button>
          )}
        </div>
        {/* show customer's purchases  */}
        <PurchasesQuery
          customer={customer.id}
          renderedFrom="customer"
          setLastPurchase={setLastPurchase}
          fetchOnlyLatest={showAllPurchases ? false : true}
        />
      </div>
    </>
  );
};

export default Customer;
