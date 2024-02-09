"use client";
import React, { useEffect, useState } from "react";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutElements from "@/components/main/CheckoutElements";
import { Button } from "@/components/ui/button";
import { UseCoupon } from "@/components/main/UseCoupon";

type Props = {};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

export default function CheckoutForm({}: Props) {
  const [clientSecret, setClientSecret] = useState("");
  const [hasCoupon, setHasCoupon] = useState(false);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [{ id: "xl-tshirt", price: 30, payment_intent_id: "" }],
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const options: StripeElementsOptions = {
    clientSecret: clientSecret,
    appearance: {
      theme: "stripe",
    },
    locale: "ar",
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutElements clientSecret={clientSecret} />
        </Elements>
      )}
      {hasCoupon ? (
        <div>
          <UseCoupon />

          <Button
            onClick={() => setHasCoupon(!hasCoupon)}
            variant={"link"}
            className="text-main mt-2 p-0"
          >
            لا تملك واحده
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => setHasCoupon(!hasCoupon)}
          variant={"link"}
          className="text-main p-0"
        >
          هل تمتلك كوبون؟
        </Button>
      )}
    </div>
  );
}
