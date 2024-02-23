import { auth } from "@/auth";
import { UserDataType } from "@/hooks/use-user-data";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { createWherebyUrl } from "@/actions/whereby";
import { PaymentData } from "@/components/main/CheckoutForm";

export async function POST(req: NextRequest) {
  const user = await auth();
  if (user?.user.role === "DOCTOR" || user?.user.role === "ADMIN")
    return NextResponse.json(
      { error: "لا يمكن للأدمن ولا الطبيب الذهاب لصفحة الشراء" },
      { status: 402 }
    );
  const { payment_intent_id, session } = (await req.json()) as {
    payment_intent_id: string;
    session: PaymentData;
  };
  const metadata: any = {
    type: session.type,
  };

  metadata.user = session.userId ? true : false;
  if (session.type === "LINK") metadata.token = session.paymentLinkToken;

  const totalEuro = Math.round(session.sessionPrice * 100);
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
          metadata: metadata,
        });
      }

      if (session.type === "NORMAL" || session.type === "LINK") {
        if (session.userId) {
          await db.session.update({
            where: {
              paymentIntentId: `User ${payment_intent_id}`,
              user: { role: "USER" },
            },
            data: {
              date: session.date,
              price: doctorPrice,
              userId: session.userId,
              type: session.sessionType,
              link: sessionLink.hostRoomUrl,
              coupon: session.coupon,
              paymentIntentId: `User ${paymentIntent.id}`,
            },
          });
        }

        await db.session.update({
          where: {
            paymentIntentId: `Doctor ${payment_intent_id}`,
            user: { role: "DOCTOR" },
          },
          data: {
            date: session.date,
            price: doctorPrice,
            userId: session.doctorId,
            type: session.sessionType,
            link: sessionLink.hostRoomUrl,
            paymentIntentId: `Doctor ${paymentIntent.id}`,
            coupon: session.coupon,
          },
        });
      } else {
        await db.userPackage.update({
          where: {
            paymentIntent: payment_intent_id,
          },
          data: {
            status: "WAITING_PAY",
            remain: session.quantity,
            type: session.sessionType,
            price: doctorPrice,
            paymentIntent: paymentIntent.id,
          },
        });
      }
    } else throw new Error("Payment intent id not exist");
  } catch (err) {
    paymentIntent = await stripe.paymentIntents.create({
      amount: totalEuro,
      currency: "eur",
      metadata: metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    try {
      if (session.type === "NORMAL" || session.type === "LINK") {
        if (session.userId) {
          await db.session.create({
            data: {
              date: session.date!,
              price: doctorPrice,
              userId: session.userId,
              type: session.sessionType,
              link: sessionLink.hostRoomUrl,
              coupon: session.coupon,
              paymentIntentId: `User ${paymentIntent.id}`,
            },
          });
        }

        await db.session.create({
          data: {
            date: session.date!,
            price: doctorPrice,
            userId: session.doctorId,
            type: session.sessionType,
            link: sessionLink.hostRoomUrl,
            coupon: session.coupon,
            paymentIntentId: `Doctor ${paymentIntent.id}`,
          },
        });
      } else if (session.type === "PACKAGE") {
        await db.userPackage.create({
          data: {
            status: "WAITING_PAY",
            doctorId: session.doctorId,
            remain: session.quantity,
            type: session.sessionType,
            price: doctorPrice,
            userId: session.userId!,
            paymentIntent: paymentIntent.id,
          },
        });
      } else throw new Error(`Unknown payment type`);
    } catch (err) {
      console.log(err);
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
