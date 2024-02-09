import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();
  console.log("first");
  console.log(session);
  return NextResponse.json({
    message: "Done",
  });
}
