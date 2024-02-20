"use client";
import React, { useEffect, useState } from "react";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutElements from "@/components/main/CheckoutElements";
import { Button } from "@/components/ui/button";
import { UseCoupon } from "@/components/main/UseCoupon";
import { SessionType } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { FormError } from "../auth/form-error";

export type PaymentType = "NORMAL" | "LINK" | "PACKAGE";

export type PaymentData = {
  type: PaymentType;
  quantity: number;
  sessionPrice: number;
  sessionType: SessionType;
  doctorId: string;
  date?: Date;
  coupon?: string;
  paymentLinkToken?: string;
  userId?: string;
};

type Props = {
  session: PaymentData;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

export default function CheckoutForm({ session }: Props) {
  const [hasCoupon, setHasCoupon] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const searchParams = useSearchParams();
  const couponMessage = searchParams?.get("couponMessage") || "";

  useEffect(() => {
    console.log(window.localStorage.getItem("payment_intent_id"));
    console.log(session);
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session,
        payment_intent_id: window.localStorage.getItem("payment_intent_id"),
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        window.localStorage.setItem(
          "payment_intent_id",
          data.payment_intent_id
        );
        setClientSecret(data.clientSecret);
      });
  }, [session]);

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
          <UseCoupon setHasCoupon={setHasCoupon} />

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
      <FormError message={couponMessage} />
    </div>
  );
}
