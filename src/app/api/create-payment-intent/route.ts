import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

const calculateOrderAmount = (items: any) => {
  return items[0].price * 100;
};

export async function POST(req: NextRequest) {
  const { payment_intent_id, items } = await req.json();

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

    if (!existing_order)
      return NextResponse.json({ error: "كود الدفع الذى أدخلتة غير صحيح" });
  } else {
    paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",

      automatic_payment_methods: {
        enabled: true,
      },
    });
  }

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
  });
}
