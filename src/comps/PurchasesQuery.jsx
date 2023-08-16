import { useEffect, memo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatDate, sortData } from "./utils";

const PurchasesQuery = ({
  product,
  customer,
  startDate,
  endDate,
  renderedFrom,
  setLastPurchase,
  fetchOnlyLatest,
}) => {
  const products = useSelector((state) => state.products.products);
  const customers = useSelector((state) => state.customers.customers);

  const purchases = useSelector((state) => {
    let queryResults = Object.values(state.purchases.purchases);

    if (customer) {
      queryResults = queryResults.filter(
        (purchase) => purchase.customerId === customer
      );
    }

    if (product) {
      queryResults = queryResults.filter((purchase) =>
        purchase.products.some((item) => item.productId === product)
      );
    }

    if (startDate && endDate) {
      const startOfSelectedDay = new Date(startDate);
      startOfSelectedDay.setHours(0, 0, 0, 0); // Set time to beginning of the day
      const endOfSelectedDay = new Date(endDate);
      endOfSelectedDay.setHours(23, 59, 59, 999); // Set time to end of the day

      const startIso = startOfSelectedDay.toISOString();
      const endIso = endOfSelectedDay.toISOString();

      queryResults = queryResults.filter((purchase) => {
        const purchaseData = purchase.date.toDate().toISOString();
        return purchaseData >= startIso && purchaseData <= endIso;
      });
    }
    // Sort the results by date
    const sortedResults = sortData(queryResults, "date");
    console.log("query Purchases rendered");

    return sortedResults;
  });

  //return latest purchase for 'customer'/'product'components
  useEffect(() => {
    if (purchases && purchases.length > 0 && setLastPurchase) {
      setLastPurchase(purchases[0]);
    }
  }, [purchases]);

  if (fetchOnlyLatest) return null;

  if (purchases.length === 0)
    return (
      <span className="italic text-gray-400 p-2">
        No purchases found to display
      </span>
    );

  return (
    <>
      <div className="min-w-full overflow-hidden">
        <section>
          <table className="min-w-full bg-white divide-y divide-gray-200 shadow-sm border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-3 border-b bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                {renderedFrom !== "customer" && (
                  <th className="py-2 px-3 border-b bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                )}
                {renderedFrom !== "product" && (
                  <th className="py-2 px-3 border-b bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                )}
                <th className="py-2 px-3 border-b bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Units
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {purchases.map((p) => {
                const currentCustomer = customers[p.customerId];

                // Filtered list of products for the purchase based on renderedFrom context
                let relevantProducts = p.products;
                if (renderedFrom === "product" || product) {
                  relevantProducts = p.products.filter(
                    (prod) => prod.productId === product
                  );
                }
                return relevantProducts.map((prod, index) => {
                  const currentProduct = products[prod.productId];

                  return (
                    <tr
                      key={`${p.id}-${prod.productId}`}
                      className="hover:bg-grey-100"
                    >
                      {index === 0 && (
                        <td
                          className="py-2 px-3"
                          rowSpan={relevantProducts.length}
                        >
                          {formatDate(p.date)}
                        </td>
                      )}
                      {index === 0 && renderedFrom !== "customer" && (
                        <td
                          className="py-2 px-3"
                          rowSpan={relevantProducts.length}
                        >
                          {currentCustomer !== undefined ? (
                            <Link
                              className="text-blue-500 hover:underline"
                              to={`/Customers/${currentCustomer?.id}`}
                            >
                              {currentCustomer?.firstName}{" "}
                              {currentCustomer?.lastName}
                            </Link>
                          ) : (
                            <span className="italic text-gray-400">
                              customer deleted
                            </span>
                          )}
                        </td>
                      )}
                      {renderedFrom !== "product" && (
                        <td>
                          {currentProduct !== undefined ? (
                            <Link
                              className="text-blue-500 hover:underline"
                              to={`/Products/${currentProduct.id}`}
                            >
                              {currentProduct.name}
                            </Link>
                          ) : (
                            <span className="italic text-gray-400">
                              product deleted
                            </span>
                          )}
                        </td>
                      )}
                      <td className="py-2 px-3">{prod.units}</td>
                    </tr>
                  );
                });
              })}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
};

export default memo(PurchasesQuery);
