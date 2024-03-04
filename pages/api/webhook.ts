import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { Notification, SessionType } from "@prisma/client";
import { getNotificationDate } from "@/lib/moment";
import { PaymentType } from "@/components/main/CheckoutForm";
import { TAX } from "@/lib/constants";
//Securing a connection to firebase from backend

type NotificationUserType = {
  id: string;
  paymentType: PaymentType;
  name: string;
  image: string;
  email: string;
  type: SessionType;
  newNotificationsNum: number;
};

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
        const data = await db.session.update({
          where: {
            paymentIntentId: `${session.payment_intent}`,
          },
          data: {
            status: "RESERVED",
          },
          select: {
            type: true,
            doctorPrice: true,
            user: {
              select: {
                name: true,
                image: true,
                id: true,
                email: true,
                newNotifications: true,
              },
            },
            doctor: {
              select: {
                doctor: {
                  select: {
                    name: true,
                    image: true,
                    id: true,
                    email: true,
                    newNotifications: true,
                  },
                },
              },
            },
          },
        });
        doctorMoney = data.doctorPrice;
        userData = {
          name: data.user?.name!,
          image: data.user?.image!,
          type: data.type,
          id: data.user?.id!,
          paymentType: "NORMAL",
          email: data.user?.email!,
          newNotificationsNum: data.user?.newNotifications!,
        };

        doctorData = {
          name: data.doctor.doctor.name,
          image: data.doctor.doctor.image,
          type: data.type,
          id: data.doctor.doctor.id,
          email: data.doctor.doctor.email,
          paymentType: "NORMAL",
          newNotificationsNum: data.doctor.doctor.newNotifications,
        };

        if (type === "LINK") {
          await db.paymentLink.update({
            where: { token: session.metadata.token },
            data: { status: "PAID" },
          });
        }
      } else if (type === "PACKAGE") {
        const data = await db.userPackage.update({
          where: { paymentIntent: `${session.payment_intent}` },
          data: { status: "PAID" },
          select: {
            type: true,
            doctorPrice: true,

            user: {
              select: {
                name: true,
                image: true,
                id: true,
                newNotifications: true,
                email: true,
              },
            },
            doctor: {
              select: {
                doctor: {
                  select: {
                    name: true,
                    image: true,
                    id: true,
                    newNotifications: true,
                    email: true,
                  },
                },
              },
            },
          },
        });

        userData = {
          name: data.user.name,
          image: data.user.image,
          type: data.type,
          id: data.user.id,
          paymentType: "PACKAGE",
          newNotificationsNum: data.user.newNotifications,
          email: data.user.email,
        };
        doctorData = {
          name: data.doctor.doctor.name,
          image: data.doctor.doctor.image,
          type: data.type,
          id: data.doctor.doctor.id,
          newNotificationsNum: data.doctor.doctor.newNotifications,
          paymentType: "PACKAGE",
          email: data.doctor.doctor.email,
        };
        doctorMoney = data.doctorPrice;
      }

      if (doctorId! && doctorMoney!) {
        await db.user.update({
          where: { id: doctorId },
          data: {
            DoctorData: {
              update: {
                money: { update: { pending: doctorMoney } },
              },
            },
          },
        });
      }

      let userMessage = "لقد اشتريت من أحد الأطباء",
        doctorMessage = "لقد اشترى أحد العملاء منك";
      if (doctorData!.paymentType === "NORMAL") {
        if (userData!) {
          doctorMessage = `لقد اشترى منك ${userData!.name} جلسة ${
            userData!.type === "HALF_HOUR" ? "نصف" : ""
          } ساعة`;
        }

        userMessage = `لقد اشتريت جلسة ${
          doctorData!.type === "HOUR" ? "" : "نصف"
        } ساعة من الطبيب  ${doctorData!.name}`;
      } else if (doctorData!.paymentType === "PACKAGE") {
        doctorMessage = `لقد اشترى منك ${userData!.name} باكج ${
          userData!.type === "HALF_HOUR" ? "نصف" : ""
        } ساعة`;

        userMessage = `لقد اشتريت باكج ${
          doctorData!.type === "HOUR" ? "" : "نصف"
        } ساعة من الطبيب  ${doctorData!.name}`;
      }

      if (userData!) {
        const isConversationExist = await db.user.findFirst({
          where: {
            id: userData.id,
            conversations: {
              some: {
                users: { some: { id: doctorData!.id } },
              },
            },
          },
        });

        if (!isConversationExist) {
          await db.conversation.create({
            data: {
              users: {
                connect: [
                  {
                    id: userData.id,
                    name: userData.name,
                    email: userData.email,
                  },
                  {
                    id: doctorData!.id,
                    name: doctorData!.name,
                    email: doctorData!.email,
                  },
                ],
              },
            },
          });
        }
        const user_notification = {
          name: doctorData!.name,
          date: getNotificationDate(),
          image: doctorData!.image,
          message: userMessage,
        };

        pusherServer.trigger(
          "notifications",
          `new-notification:${userData!.id}`,
          user_notification
        );

        await db.user.update({
          where: { id: userData.id },
          data: {
            newNotifications: { increment: 1 },
            notifications: {
              create: user_notification,
            },
          },
        });
      }

      const doctor_notification = {
        name: userData!.name,
        date: getNotificationDate(),
        image: userData!.image,
        message: doctorMessage,
      };

      pusherServer.trigger(
        "notifications",
        `new-notification:${doctorData!.id}`,
        doctor_notification
      );

      await db.user.update({
        where: { id: doctorData!.id, role: "DOCTOR" },
        data: {
          newNotifications: { increment: 1 },
          notifications: {
            create: doctor_notification,
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
