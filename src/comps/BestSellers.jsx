import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const BestSellers = () => {
  const [salesArray, setSalesArray] = useState([]);
  const purchases = useSelector((state) => state.purchases.purchases);
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    const productsList = Object.values(products).reduce((acc, product) => {
      acc[product.id] = 0;
      return acc;
    }, {});

    purchases.forEach((purchase) => {
      purchase.products.forEach((product) => {
        if (productsList[product.productId] !== undefined) {
          productsList[product.productId] += parseInt(product.units);
        }
      });
    });

    const sortedSales = Object.entries(productsList).sort(
      (a, b) => b[1] - a[1]
    );

    setSalesArray(sortedSales);
  }, [purchases]);

  return (
    <>
      {console.log("bestSellers rendered")}
      {/* show top 3 sellers */}
      <div className="p-4 bg-green-100 border rounded-t shadow-md text-medium">
        <h3 className="mb-1 font-bold text-green-900">Top 3 Sellers:</h3>
        <ul>
          {salesArray.slice(0, 3).map(([productId, units]) => (
            <li key={productId} className="mb-1 flex items-center">
              <span className="mr-2 text-xl text-green-600">▲</span>
              <span className=" text-green-900">
                {products[productId]?.name} - {units} units
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* show least 3 sellers */}
      <div className="p-4 bg-red-100 border rounded-b shadow-md text-medium">
        <h3 className="mb-1 font-bold text-red-900">Least 3 Sellers:</h3>
        <ul>
          {salesArray.slice(salesArray.length - 3).map(([productId, units]) => (
            <li key={productId} className="mb-1 flex items-center">
              <span className="mr-2 text-xl text-red-600">▼</span>
              <span className=" text-red-900">
                {products[productId]?.name} - {units} units
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default BestSellers;
