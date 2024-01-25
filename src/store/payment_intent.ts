import { useCallback } from "react";
import { create } from "zustand";

interface PaymentIntent {
  intent_id: string;
  setPaymentIntent: (intent_id: string) => void;
}

export const usePaymentIntent = create<PaymentIntent>((set) => ({
  intent_id: "",
  setPaymentIntent: () => console.log("Nothing"),
  // setPaymentIntent: (intent_id) =>
  // set(() => localStorage.setItem("intent_id", JSON.stringify(intent_id))),
}));
