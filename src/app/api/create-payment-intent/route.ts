import { auth } from "@/auth";
import { UserDataType } from "@/hooks/use-user-data";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { createWherebyUrl } from "@/actions/whereby";
import { PaymentData } from "@/components/main/CheckoutForm";

export async function POST(req: NextRequest) {
  const user = await auth();
  if (!user) return NextResponse.redirect("/");
  if (user.user.role === "DOCTOR" || user.user.role === "ADMIN") return null;
  const { payment_intent_id, session } = (await req.json()) as {
    payment_intent_id: string;
    session: PaymentData;
  };

  const res = await fetch(process.env.EUROPE_IP!);
  const data = (await res.json()) as UserDataType;
  const totalEuro = Math.round(
    session.sessionPrice * data.geoplugin_currencyConverter * 100
  );

  const doctorPrice = Math.round(session.sessionPrice * 0.8);
  const sessionLink = await createWherebyUrl();

  let paymentIntent;
  try {
    if (payment_intent_id) {
      paymentIntent = await stripe.paymentIntents.retrieve(payment_intent_id);
      if (paymentIntent.status === "succeeded")
        throw new Error("Old payment intent");
      if (paymentIntent) {
        paymentIntent = await stripe.paymentIntents.update(payment_intent_id, {
          amount: totalEuro,
        });
      }
      await Promise.all([
        await db.session.update({
          where: {
            paymentIntentId: `User ${payment_intent_id}`,
            user: { role: "USER" },
          },
          data: {
            date: session.date,
            doctorPrice,
            sessionPrice: session.sessionPrice,
            userId: user.user.id!,
            type: session.sessionType,
            time: session.sessionTime,
            link: sessionLink.hostRoomUrl,
          },
        }),

        await db.session.update({
          where: {
            paymentIntentId: `Doctor ${payment_intent_id}`,
            user: { role: "DOCTOR" },
          },
          data: {
            date: session.date,
            doctorPrice,
            sessionPrice: session.sessionPrice,
            userId: session.doctorId,
            type: session.sessionType,
            link: sessionLink.hostRoomUrl,
            time: session.sessionTime,
          },
        }),
      ]);
    } else throw new Error("Payment intent id not exist");
  } catch (err) {
    paymentIntent = await stripe.paymentIntents.create({
      amount: totalEuro,
      currency: "eur",
      metadata: {
        dummy_Data: "Hello world",
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });
    try {
      await Promise.all([
        await db.session.create({
          data: {
            date: session.date!,
            doctorPrice,
            sessionPrice: session.sessionPrice,
            userId: user.user.id!,
            type: session.sessionType,
            time: session.sessionTime!,
            link: sessionLink.hostRoomUrl,

            paymentIntentId: `User ${paymentIntent.id}`,
          },
        }),

        await db.session.create({
          data: {
            date: session.date!,
            doctorPrice,
            sessionPrice: session.sessionPrice,
            userId: session.doctorId,
            type: session.sessionType,
            link: sessionLink.hostRoomUrl,
            time: session.sessionTime!,
            paymentIntentId: `Doctor ${paymentIntent.id}`,
          },
        }),
      ]);
    } catch (err) {
      return NextResponse.json(
        { error: "حدثت مشكلة أثناء انشاء الطلب" },
        { status: 500 }
      );
    }
  }
  return NextResponse.json({
    payment_intent_id: paymentIntent.id,
    clientSecret: paymentIntent.client_secret,
  });
}
