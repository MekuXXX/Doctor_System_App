import { getScheduleSessionsByDay } from "@/actions/schedule";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  sessionId: string;
};

export default async function ChangeSession({ sessionId }: Props) {
  if (!sessionId) redirect("/");
  const sessionData = await db.session.findUnique({
    where: { id: sessionId },
    select: { doctorId: true, date: true },
  });
  if (!sessionData) redirect("/");
  // const firstNextDaySessions = await getScheduleSessionsByDay(sessionData.doctorId,)
  return <div>ChangeSession</div>;
}
