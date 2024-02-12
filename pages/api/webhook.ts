import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
//Securing a connection to firebase from backend

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const signature = req.headers["stripe-signature"] as string;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

    let event: Stripe.Event;
    // Verify that this event is from stripe
    try {
      if (!endpointSecret || !endpointSecret)
        return res.status(402).send("Must provide signature, secret and body");
      event = stripe.webhooks.constructEvent(
        requestBuffer,
        signature,
        endpointSecret
      );
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).send(`Webhook error: ${err.message}`);
      }

      return res.status(400).send(`Internal server error during payment`);
    }

    // Handle the checkout.session.completed event
    let session;
    if (event.type! === "charge.succeeded") {
      session = event.data.object as Stripe.Charge;
      const [_, doctor_session] = await Promise.all([
        await db.session.update({
          where: {
            paymentIntentId: `User ${session.payment_intent}`,
            user: { role: "USER" },
          },
          data: {
            status: "RESERVED",
          },
        }),
        await db.session.update({
          where: {
            paymentIntentId: `Doctor ${session.payment_intent}`,
            user: { role: "DOCTOR" },
          },
          data: {
            status: "RESERVED",
          },
        }),
      ]);
      await db.user.update({
        where: { id: doctor_session.userId },
        data: {
          DoctorData: {
            update: {
              money: { update: { pending: doctor_session.doctorPrice } },
            },
          },
        },
      });
      console.log("Orders Updated");
    } else if (
      event.type === "charge.expired" ||
      event.type === "charge.failed"
    ) {
      session = event.data.object as { payment_intent: string };
      await Promise.all([
        await db.session.delete({
          where: { paymentIntentId: `User ${session.payment_intent}` },
        }),

        await db.session.delete({
          where: { paymentIntentId: `Doctor ${session.payment_intent}` },
        }),
      ]);
      console.log("Orders deleted");
    } else {
      console.log("Unhandled event: " + event.type);
    }
    res.status(200).send("Ok");
  }
};

export default handler;
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
