import { db } from "../../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export const GET_TABLE_DATA = "GET_TABLE_DATA";

const currenciesRef = collection(db, "currencies");

export const getTable = () => {
  return (dispatch) =>
    getDocs(currenciesRef)
      .then((res) => {
        dispatch({
          type: GET_TABLE_DATA,
          payload: res.docs.map((doc) => ({ ...doc.data(), dbId: doc.id })),
        });
        return res.data;
      })
      .catch((error) => {
        return error;
      });
};

export const addCurrency = (data) => {
  return () => addDoc(currenciesRef, data);
};

export const editCurrency = (data, id) => {
  const currencyDoc = doc(db, "currencies", id);
  return () => updateDoc(currencyDoc, data);
};

export const deleteCurrency = (id) => {
  const currencyDoc = doc(db, "currencies", id);
  return () => deleteDoc(currencyDoc);
};
