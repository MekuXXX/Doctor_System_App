import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { Notification, SessionType } from "@prisma/client";
import { getNotificationDate } from "@/lib/moment";
import { PaymentType } from "@/components/main/CheckoutForm";
//Securing a connection to firebase from backend

type NotificationUserType = { name: string; image: string; type: SessionType };

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
      const type = session.metadata.type as PaymentType;
      let doctorMoney: number;
      let doctorId: string;
      let userData: NotificationUserType;
      let doctorData: NotificationUserType;
      if (type === "NORMAL" || type === "LINK") {
        if (session.metadata.user === "true") {
          const data = await db.session.update({
            where: {
              paymentIntentId: `User ${session.payment_intent}`,
              user: { role: "USER" },
            },
            data: {
              status: "RESERVED",
            },
            select: {
              type: true,
              user: { select: { name: true, image: true } },
            },
          });
          userData = {
            name: data.user.image,
            image: data.user.image,
            type: data.type,
          };
        }
        if (type === "LINK") {
          await db.paymentLink.update({
            where: { token: session.metadata.token },
            data: { status: "PAID" },
          });
        }
        const data = await db.session.update({
          where: {
            paymentIntentId: `Doctor ${session.payment_intent}`,
            user: { role: "DOCTOR" },
          },
          data: {
            status: "RESERVED",
          },
          select: {
            type: true,
            price: true,
            user: { select: { name: true, image: true, id: true } },
          },
        });
        doctorMoney = data.price;
        doctorData = {
          name: data.user.name,
          image: data.user.image,
          type: data.type,
        };
        doctorId = data.user.id;
      } else if (type === "PACKAGE") {
        const data = await db.doctorPackage.update({
          where: { paymentIntent: `${session.payment_intent}` },
          data: { status: "PAID" },
          select: {
            type: true,
            price: true,
            user: { select: { user: { select: { name: true, image: true } } } },
            doctor: {
              select: {
                doctor: { select: { name: true, image: true, id: true } },
              },
            },
          },
        });
        userData = {
          name: data.user.user.name,
          image: data.user.user.image,
          type: data.type,
        };
        doctorData = {
          name: data.doctor.doctor.name,
          image: data.doctor.doctor.image,
          type: data.type,
        };
        doctorMoney = data.price;
        doctorId = data.doctor.doctor.id;
      }
      // if (doctorId && doctorMoney) {
      //   await db.user.update({
      //     where: { id: doctorId},
      //     data: {
      //       DoctorData: {
      //         update: {
      //           money: { update: { pending: doctorMoney } },
      //         },
      //       },
      //     },
      //   });
      // }
      console.log(userData!);
      console.log(doctorData!);
      console.log(doctorMoney!);
      console.log(doctorId!);
      // const user_notification = {
      //   name: doctor_session.user.name,
      //   date: getNotificationDate(),
      //   image: doctor_session.user.image,
      //   message: "لقد اشتريت جلسة من الطبيب " + doctor_session.user.name,
      // };
      // pusherServer.trigger(
      //   "notifications",
      //   `new-notification:${user_session.userId}`,
      //   user_notification
      // );

      // pusherServer.trigger(
      //   "notifications",
      //   `new-notification:${doctor_session.userId}`,

      //   {
      //     name: user_session.user.name,
      //     date: getNotificationDate(),
      //     image: user_session.user.image,
      //     message: "لقد اشترى " + user_session.user.name + " منك جلسة",
      //   } as Notification
      // );
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
