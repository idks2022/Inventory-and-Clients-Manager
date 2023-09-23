import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 ">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-gray-700 text-xl mb-4">Page not found.</p>
        <p className="text-gray-600">Check the URL and try again or </p>
        <div className="mt-4">
          <Link
            to="/"
            className="text-blue-500 hover:underline hover:text-blue-600 font-semibold"
          >
            go back to home page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
