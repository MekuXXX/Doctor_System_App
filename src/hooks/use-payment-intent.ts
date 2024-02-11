"use client";
import { useCallback, useEffect, useState } from "react";

export const usePaymentIntent = () => {
  const [intentId, setIntentId] = useState<string | null>(null);

  // **Handle intentId retrieval from localStorage once (or on mount):**
  const loadIntentId = useCallback(() => {
    const storedId = window.localStorage.getItem("payment_intent_id");
    setIntentId(storedId || ""); // Set to "" or null if absent
  }, []);

  useEffect(() => {
    loadIntentId();
  }, [loadIntentId]);

  // **Update localStorage in a single, controlled manner:**
  const updateLocalStorage = useCallback(
    (newIntentId: string | null) => {
      if (newIntentId !== intentId) {
        // Avoid unnecessary updates
        window.localStorage.setItem("payment_intent_id", newIntentId!);
        setIntentId(newIntentId);
      }
    },
    [intentId] // Only re-create if intentId changes
  );

  // **Provide clear and useful helper functions:**
  const clearIntentId = useCallback(() => {
    updateLocalStorage(null);
  }, [updateLocalStorage]);

  return { intentId, setIntentId: updateLocalStorage, clearIntentId };
};
