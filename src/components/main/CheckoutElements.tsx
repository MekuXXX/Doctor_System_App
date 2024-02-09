import React, { FormEvent, useEffect, useTransition } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import { useUserData } from "@/hooks/use-user-data";

type Props = {
  clientSecret: string;
};

export default function CheckoutElements({ clientSecret }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const { data, isError, isLoading } = useUserData();
  const [message, setMessage] = React.useState<string>();
  const [isPending, startTransition] = useTransition();

  // useEffect(() => {
  //   if (!stripe || !clientSecret) {
  //     return;
  //   }
  // }, [stripe]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    startTransition(async () => {
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
    });
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "tabs",
  };

  // TODO: add loading spinner and error messages
  if (isLoading) return <h1>Loading..</h1>;
  if (isError) return <h1>Error..</h1>;

  return (
    <>
      {status && (
        <p className="bg-main text-white p-3 mb-4 text-sm">
          لأمانك، تم تسجيل عنوان IP الخاص بك وموقعك {data?.geoplugin_request} [
          {data?.geoplugin_city}].
          <br /> نحن نقدر خصوصيتك ونلتزم بضمان تجربة دفع آمنة وموثوقة`
        </p>
      )}
      <form id="payment-form" onSubmit={handleSubmit} className="grid gap-4">
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <Button
          disabled={isPending || !stripe || !elements}
          id="submit"
          className="my-4"
        >
          <span id="button-text">
            {isPending ? "جارى التحقق" : "ادفع الان"}
          </span>
        </Button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </>
  );
}
