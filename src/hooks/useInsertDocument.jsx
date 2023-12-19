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
      return { loading: true, error: null, go: null };
    case "INSERTED_DOC":
      return { loading: false, error: null, go: "/" };
    case "ERROR":
      return { loading: false, error: action.payload, go: null };
    default:
      return state;
  }
};

export const useInsertDocument = (docCollection) => {
  const [response, dispatch] = useReducer(insertReducer, initialState);
  console.log(response);
  const [cancelled, setCancelled] = useState(false);
  const checkIfIsCancelled = () => {
    if (cancelled) {
      return;
    }
  };

  const checkCancelBeforeDispatch = (action) => {
    dispatch(action);
  };

  const insertDocument = async (document) => {
    checkIfIsCancelled();

    checkCancelBeforeDispatch({
      type: "LOADING",
    });

    try {
      const newDocument = { ...document, createDate: Timestamp.now() };

      const insertedDocument = await addDoc(
        collection(db, docCollection),
        newDocument
      );

      checkCancelBeforeDispatch({
        type: "INSERTED_DOC",
        payload: insertedDocument,
      });
    } catch (error) {
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    setCancelled(true);
  }, []);

  return { insertDocument, response };
};