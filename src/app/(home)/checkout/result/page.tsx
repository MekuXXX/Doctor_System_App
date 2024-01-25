import CheckoutResult from "@/components/main/CheckoutResult";
import React from "react";

type Props = {};

export default function PaymentResultPage({}: Props) {
  return (
    <div className="content min-h-[70vh]">
      <CheckoutResult />
    </div>
  );
}
