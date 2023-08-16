import { Routes, Route, Link } from "react-router-dom";
import DataFetcher from "./redux/DataFetcher";
import Home from "./comps/Home";
import Products from "./comps/Products";
import EditProduct from "./comps/EditProduct";
import AddProduct from "./comps/AddProduct";
import Customers from "./comps/Customers";
import EditCustomer from "./comps/EditCustomer";
import AddCustomer from "./comps/AddCustomer";
import Purchases from "./comps/Purchases";
import AddPurchase from "./comps/AddPurchase";
import NotFound from "./comps/notFound";
import "./App.css";

function App() {
  return (
    <>
      <nav className="bg-gray-900 p-4 shadow-md">
        <div className="container mx-auto flex justify-center">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-red-500 hover:text-red-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/Products" className="text-red-500 hover:text-red-400">
                Products
              </Link>
            </li>
            <li>
              <Link to="/Customers" className="text-red-500 hover:text-red-400">
                Customers
              </Link>
            </li>
            <li>
              <Link to="/Purchases" className="text-red-500 hover:text-red-400">
                Purchases
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <DataFetcher>
        <Routes>
          <Route path="/" element={<Home />} caseSensitive={false} />
          <Route
            path="/products/new"
            element={<AddProduct />}
            caseSensitive={false}
          />
          <Route
            path="/products/:productId"
            element={<EditProduct />}
            caseSensitive={false}
          />
          <Route
            path="/products"
            element={<Products />}
            caseSensitive={false}
          />

          <Route
            path="/customers/new"
            element={<AddCustomer />}
            caseSensitive={false}
          />
          <Route
            path="/customers/:customerId"
            element={<EditCustomer />}
            caseSensitive={false}
          />
          <Route
            path="/customers"
            element={<Customers />}
            caseSensitive={false}
          />

          <Route
            path="/purchases/new"
            element={<AddPurchase />}
            caseSensitive={false}
          />
          <Route
            path="/purchases"
            element={<Purchases />}
            caseSensitive={false}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </DataFetcher>
    </>
  );
}

export default App;
