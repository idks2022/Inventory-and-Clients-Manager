import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaDumbbell, FaUsers, FaReceipt } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto mt-10 p-4  text-Black text-xl">
      <div className="grid grid-cols-1 gap-6 ">
        <button
          onClick={() => {
            navigate("/purchases/new");
          }}
          className="flex items-center justify-center p-6 border border-red-500 rounded-md hover:bg-red-600 cursor-pointer transition shadow-lg"
        >
          <FaShoppingCart className="text-4xl mr-4" />
          Create a new purchase
        </button>

        <button
          onClick={() => {
            navigate("/products");
          }}
          className="flex items-center justify-center p-6 border border-red-500 rounded-md hover:bg-red-500 cursor-pointer transition shadow-lg"
        >
          <FaDumbbell className="text-4xl mr-4" />
          See all products
        </button>

        <button
          onClick={() => {
            navigate("/customers");
          }}
          className="flex items-center justify-center p-6 border border-red-500 rounded-md hover:bg-red-500 cursor-pointer transition shadow-lg"
        >
          <FaUsers className="text-4xl mr-4" />
          See all customers
        </button>

        <button
          onClick={() => {
            navigate("/purchases");
          }}
          className="flex items-center justify-center p-6 border border-red-500 rounded-md hover:bg-red-500 cursor-pointer transition shadow-lg"
        >
          <FaReceipt className="text-4xl mr-4" />
          See all purchases
        </button>
      </div>
    </div>
  );
};

export default Home;
