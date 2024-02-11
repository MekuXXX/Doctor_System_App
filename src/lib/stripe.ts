import Stripe from "stripe";

declare global {
  var stripe: Stripe;
}

export let stripe: Stripe =
  globalThis.stripe ||
  new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
    apiVersion: "2023-10-16",
  });
if (process.env.NODE_ENV !== "production") globalThis.stripe = stripe;
