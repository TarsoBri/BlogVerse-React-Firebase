import { db } from "../firebase/config";
import { useState, useEffect, useReducer } from "react";
import { doc, deleteDoc } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

const deleteReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "DELETED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useDeleteDocument = (docCollection) => {
  const [response, dispatch] = useReducer(deleteReducer, initialState);

  const [cancelled, setCancelled] = useState(false);

  const setDispatch = (action) => {
    dispatch(action);
  };

  const checkIfIsCancelled = () => {
    if (cancelled) return;
  };

  const deleteDocument = async (id) => {
    checkIfIsCancelled();
    setDispatch({ type: "LOADING" });
    try {
      const docRef = doc(db, docCollection, id);
      await deleteDoc(docRef);
      setDispatch({ type: "DELETED_DOC" });
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

  return { deleteDocument, response };
};
