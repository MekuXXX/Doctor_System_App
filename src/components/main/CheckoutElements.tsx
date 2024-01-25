import React, { FormEvent, useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserDataStore } from "@/store/user-data";

type Props = {
  clientSecret: string;
};

export default function CheckoutElements({ clientSecret }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const { status, userData } = useUserDataStore();
  const [message, setMessage] = React.useState<string>();
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/result?status=success`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("حدث خطأ أثناء عملية الدفع");
    }

    setIsLoading(false);
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "tabs",
  };

  return (
    <>
      {status && (
        <p className="bg-main text-white p-3 mb-4 text-sm">
          لأمانك، تم تسجيل عنوان IP الخاص بك وموقعك{" "}
          {userData?.geoplugin_request} [{userData?.geoplugin_city}].
          <br /> نحن نقدر خصوصيتك ونلتزم بضمان تجربة دفع آمنة وموثوقة`
        </p>
      )}
      <form id="payment-form" onSubmit={handleSubmit} className="grid gap-4">
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <Button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="my-4"
        >
          <span id="button-text">
            {isLoading ? "جارى التحقق" : "ادفع الان"}
          </span>
        </Button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </>
  );
}
