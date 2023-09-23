import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { collection, onSnapshot } from "@firebase/firestore";
import db from "../firebase";
import {
  FETCH_PRODUCTS,
  FETCH_CUSTOMERS,
  FETCH_PURCHASES,
} from "./actionTypes";

const DataFetcher = ({ children }) => {
  const dispatch = useDispatch();

  const setupFirestoreListener = (
    collectionName,
    actionType,
    format = "object"
  ) => {
    const collectionRef = collection(db, collectionName);
    return onSnapshot(collectionRef, (snapshot) => {
      let data;
      if (format === "object") {
        data = snapshot.docs.reduce((acc, doc) => {
          acc[doc.id] = { ...doc.data(), id: doc.id };
          return acc;
        }, {});
      } else if (format === "array") {
        data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      }
      dispatch({ type: actionType, payload: data });
    });
  };

  useEffect(() => {
    const productsUnsub = setupFirestoreListener("products", FETCH_PRODUCTS);
    const customersUnsub = setupFirestoreListener("customers", FETCH_CUSTOMERS);
    const purchasesUnsub = setupFirestoreListener(
      "purchases",
      FETCH_PURCHASES,
      "array"
    );

    // Cleanup function
    return () => {
      productsUnsub();
      customersUnsub();
      purchasesUnsub();
    };
  }, [dispatch]);

  return children;
};

export default DataFetcher;
