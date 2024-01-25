"use server";
import Stripe from "stripe";

const calculateOrderAmount = (items: any) => {
  return Number(items[0].price) * 100;
};

export async function createPaymentIntent({
  payment_intent_id = "",
  items,
}: any) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
  const total = calculateOrderAmount(items);
  let paymentIntent;

  if (payment_intent_id) {
    paymentIntent = await stripe.paymentIntents.retrieve(payment_intent_id);

    if (paymentIntent) {
      paymentIntent = await stripe.paymentIntents.update(payment_intent_id, {
        amount: total,
      });
    }

    // TODO: update payment intent of database order
    const [existing_order, update_order] = await Promise.all([true, true]);

    if (!existing_order) return { error: "رقم الطلب الذى أدخلتة غير صحيح" };
  } else {
    paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",

      automatic_payment_methods: {
        enabled: true,
      },
    });
  }

  console.log(paymentIntent);

  return paymentIntent;
}
