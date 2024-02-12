"use client";
import React, { useEffect, useState } from "react";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutElements from "@/components/main/CheckoutElements";
import { Button } from "@/components/ui/button";
import { UseCoupon } from "@/components/main/UseCoupon";
import { usePaymentIntent } from "@/hooks/use-payment-intent";
import { SessionType } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { FormError } from "../auth/form-error";

export type PaymentData = {
  type: "NORMAL" | "LINK" | "PACKAGE";
  quantity: number;
  sessionPrice: number;
  sessionType: SessionType;
  doctorId: string;
  sessionTime?: string;
  date?: string;
  coupon?: string;
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
  const { intentId, setIntentId } = usePaymentIntent();
  const [clientSecret, setClientSecret] = useState("");
  const searchParams = useSearchParams();
  const couponMessage = searchParams?.get("couponMessage") || "";

  useEffect(() => {
    console.log(session);
    // Create PaymentIntent as soon as the page loads
    // fetch("/api/create-payment-intent", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     session,
    //     payment_intent_id:
    //       window.localStorage.getItem("payment_intent_id") || intentId,
    //   }),
    // })
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     setIntentId(data.payment_intent_id);
    //     setClientSecret(data.clientSecret);
    //   });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {/* {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutElements clientSecret={clientSecret} />
        </Elements>
      )} */}
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
