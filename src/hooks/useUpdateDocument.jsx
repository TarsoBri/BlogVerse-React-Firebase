import { db } from "../firebase/config";
import { useState, useEffect, useReducer } from "react";
import { doc, updateDoc } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

const updateReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "UPDATED_DOC":
      return { loading: false, error: null, go: "/dashboard" };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useUpdateDocument = (docCollection) => {
  const [response, dispatch] = useReducer(updateReducer, initialState);

  const [cancelled, setCancelled] = useState(false);

  const setDispatch = (action) => {
    dispatch(action);
  };

  const checkIfIsCancelled = () => {
    if (cancelled) return;
  };

  const updateDocument = async (id, data) => {
    checkIfIsCancelled();
    setDispatch({ type: "LOADING" });
    try {
      const docRef = doc(db, docCollection, id);
      await updateDoc(docRef, data);
      setDispatch({ type: "UPDATED_DOC" });
    } catch (error) {
      setDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };
  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { updateDocument, response };
};
