import React, { FormEvent, useEffect, useTransition } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import { useUserData } from "@/hooks/use-user-data";
import { toast } from "sonner";
import { usePaymentIntent } from "@/hooks/use-payment-intent";
import { useRouter } from "next/navigation";

type Props = {
  clientSecret: string;
};

export default function CheckoutElements({ clientSecret }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const { data, isLoading } = useUserData();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    startTransition(async () => {
      const { error } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
        // confirmParams
      });

      if (!error) {
        window.localStorage.setItem("payment_intent_id", "Payment Done");
        toast.success("تمت عملية الدفع بنجاح");
        router.replace(
          `${process.env.NEXT_PUBLIC_BASE_URL}/result?status=success`
        );
      } else {
        toast.error("حدثت مشكلة أثناء عملية الدفع");
        router.push(
          `${process.env.NEXT_PUBLIC_BASE_URL}/result?status=failed&message=${error.message}`
        );
      }
    });
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "tabs",
    paymentMethodOrder: ["Cards"],
  };

  // TODO: add loading spinner and error messages
  if (isLoading) return <h1>Loading..</h1>;

  return (
    <>
      {!isLoading ? (
        <p className="bg-main text-white p-3 mb-4 text-sm">
          لأمانك، تم تسجيل عنوان IP الخاص بك وموقعك {data?.geoplugin_request} [
          {data?.geoplugin_city}].
          <br /> نحن نقدر خصوصيتك ونلتزم بضمان تجربة دفع آمنة وموثوقة`
        </p>
      ) : (
        <p>Loading</p>
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
      </form>
    </>
  );
}
