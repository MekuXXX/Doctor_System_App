import { db } from "@/lib/db";
import moment from "moment";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await Promise.all([
      db.session.updateMany({
        where: {
          status: "RESERVED",
          type: "HALF_HOUR",
          date: {
            lt: moment().subtract(30, "minutes").toDate(),
          },
        },
        data: {
          status: "WAITING",
        },
      }),
      db.session.updateMany({
        where: {
          status: "RESERVED",
          type: "HOUR",
          date: {
            lt: moment().subtract(60, "minutes").toDate(),
          },
        },
        data: {
          status: "WAITING",
        },
      }),
    ]);
    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}
