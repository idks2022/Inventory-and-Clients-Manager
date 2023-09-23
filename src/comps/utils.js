import db from "../firebase";
import { collection, addDoc, setDoc, doc, updateDoc, deleteDoc } from "@firebase/firestore";

//add item with auto-generated ID (for adding a product or a purchase)
const addItem = async (collectionName, item) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), item);
    console.log("Document written with ID:", docRef.id);
    return docRef.id;
  } catch (error){
    console.error("Error adding document:", error);
    throw error;
  }
};

//add item with given ID (for adding a customer)
const setItem = async (collectionName, item, docId) => {
  if (!docId) {
    throw new Error('Document ID is not defined.');
  }
  const documentRef = doc(collection(db, collectionName), docId);
  try {
    await setDoc(documentRef, item);
    console.log("Document written with ID:", docId);
  } catch (error) {
    console.error("Error setting document:", error);
    throw error;
  }
};


//update item
const updateItem = async (collectionName, updatedItem, docId) => { 
  const documentRef = doc(db, collectionName, docId);
  try {
    await updateDoc(documentRef, updatedItem);
    console.log("Document", docId, "has been updated");
  } catch (error){
    console.error("Error updating document:", error);
    throw error;
  }
};

//deleteItem
const deleteItem = async (collectionName, id) => {
  const docRef = doc(db, collectionName, id);
  try {
    await deleteDoc(docRef);
    console.log("Document", id, "has been deleted")
  } catch (error){
    console.error("Error deleting item:", error);
  }

};

// Convert Firestore Timestamp to a string
const formatDate = (timestamp) => {
  if (timestamp && typeof timestamp.toDate === 'function') {
      const date = timestamp.toDate();

      return new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          //hour: '2-digit',
          //minute: '2-digit',
          //second: '2-digit',
          hour12: false,
          timeZone: 'Asia/Jerusalem'
      }).format(date);
  }
  return "Invalid Date";
};

// Sorting the data by date
const sortData = (data) => {
  if (!Array.isArray(data)) {
    console.error("sortData expects an array as input");
    return [];
  }

  return data.sort((a, b) => {
    return b.date - a.date;
  });
};



export { addItem, setItem, updateItem, deleteItem, formatDate, sortData };