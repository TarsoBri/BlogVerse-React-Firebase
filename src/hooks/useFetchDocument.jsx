import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const useFetchDocument = (docCollection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // memory leak
  const [cancelled, setCancelled] = useState(false);
  const checkIfIsCancelled = () => {
    if (cancelled) return;
  };

  useEffect(() => {
    const loadDocument = async () => {
      checkIfIsCancelled();

      setLoading(true);

      try {
        const docRef = doc(db, docCollection, id);
        const docSnap = await getDoc(docRef);
        setDocument(docSnap.data());
      } catch (error) {
        setError(error.message);
        console.log(error.message);
      }

      setLoading(false);
    };
    loadDocument();
  }, [docCollection, id, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { document, loading, error };
};
