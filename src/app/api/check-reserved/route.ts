import { db } from "@/lib/db";
import moment from "moment";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const currentDate = moment({
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    await db.session.updateMany({
      where: {
        status: "RESERVED",
        date: {
          lt: currentDate.toDate(),
        },
      },
      data: {
        status: "WAITING",
      },
    });
    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}
