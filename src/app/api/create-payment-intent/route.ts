import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2023-10-16",
});

const calculateOrderAmount = (items: any[]) => {
  let result = 0;
  items.forEach((item) => (result += item.price * item.quantity));
  return Math.round(result * 100);
};

export async function POST(req: NextRequest) {
  const user = await auth();

  if (!user) return NextResponse.redirect("/");
  const { payment_intent_id, items } = await req.json();

  const total = calculateOrderAmount(items);
  const orderData = {
    amount: total,
    currency: "eur",
    user: { connect: { id: user.user.id } },
    status: "pending",
    paymentIntentId: payment_intent_id,
    products: items,
  };
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
