import { db } from "../firebase/config";
import { useState, useEffect, useReducer } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

const insertReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED_DOC":
      return { loading: false, error: null, go: "/" };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useInsertDocument = (docCollection) => {
  const [response, dispatch] = useReducer(insertReducer, initialState);

  const [cancelled, setCancelled] = useState(false);
  const checkIfIsCancelled = () => {
    if (cancelled) return;
  };

  const setDispatch = (action) => {
    dispatch(action);
  };

  const insertDocument = async (document) => {
    checkIfIsCancelled();

    setDispatch({
      type: "LOADING",
    });

    try {
      const newDocument = { ...document, createDate: Timestamp.now() };

      await addDoc(collection(db, docCollection), newDocument);

      setDispatch({
        type: "INSERTED_DOC",
      });
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

  return { insertDocument, response };
};
