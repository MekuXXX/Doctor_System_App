import { db } from "@/lib/db";
import { sendSessionNotification } from "@/lib/notification";
import moment from "moment";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await db.session.findMany({
      where: {
        date: {
          gt: moment().toDate(),
          lt: moment().add(30, "minutes").toDate(),
        },
        status: "RESERVED",
      },
      select: {
        user: { select: { id: true, name: true, image: true } },
        doctor: {
          select: { doctor: { select: { id: true, name: true, image: true } } },
        },
      },
    });

    const message = "برجاء العلم أن لديك جلسة فى خلال نصف ساعة";

    await Promise.all([
      data.map(async (session) => {
        await Promise.all([
          sendSessionNotification({
            message,
            data: {
              id: session.doctor.doctor.id,
              name: session.user?.name!,
              image: session.user?.image!,
            },
          }),
          sendSessionNotification({
            message,
            data: {
              id: session.user?.id!,
              name: session.doctor.doctor.name,
              image: session.doctor.doctor.image,
            },
          }),
        ]);
      }),
    ]);

    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}
