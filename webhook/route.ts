import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

  if (!body || !sig)
    return NextResponse.json({ error: "Must provide a signature and body" });
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, stripeWebhookSecret);
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      error: "There is error happen in stripe webhook",
    });
  }

  switch (event.type) {
    case "charge.succeeded":
      const paymentIntentSucceeded = event.data.object;
      console.log("Payment Success");
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  return NextResponse.json({ success: "OK" }, { status: 200 });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
