import { getScheduleSessionsByDay } from "@/actions/schedule";
import { auth } from "@/auth";
import ChangeSessionItem from "@/components/main/ChangeSessionItem";
import { db } from "@/lib/db";
import { getArabicDay } from "@/lib/moment";
import moment from "moment";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  searchParams: {
    sessionId: string;
  };
};

export default async function ChangeSession({
  searchParams: { sessionId },
}: Props) {
  if (!sessionId) redirect("/");
  const user = await auth();
  if (!user) redirect("/");

  if (user.user.role === "DOCTOR") redirect("/");

  const sessionData = await db.session.findUnique({
    where: { id: sessionId },
    select: { doctorId: true, date: true, userId: true },
  });
  if (!sessionData) redirect("/");

  if (user.user.role === "USER") {
    if (user.user.id !== sessionData.userId) redirect("/");
  }

  const sessionDate = moment(sessionData.date).subtract(12, "hours").toDate();
  const firstDay = moment();
  if (sessionDate < moment().toDate()) redirect("/");
  const secondDay = moment().add(1, "days");
  const thirdDay = moment().add(2, "days");

  const [firstNextDaySessions, secondNextDaySessions, thirdNextDaySessions] =
    await Promise.all([
      getScheduleSessionsByDay(
        sessionData.doctorId,
        firstDay.format("dddd").toUpperCase() as "FRIDAY"
      ),
      getScheduleSessionsByDay(
        sessionData.doctorId,
        secondDay.format("dddd").toUpperCase() as "FRIDAY"
      ),
      getScheduleSessionsByDay(
        sessionData.doctorId,
        thirdDay.format("dddd").toUpperCase() as "FRIDAY"
      ),
    ]);

  const isFirstEmpty =
    firstNextDaySessions.error || firstNextDaySessions.data?.length === 0;

  const isSecondEmpty =
    secondNextDaySessions.error || secondNextDaySessions.data?.length === 0;

  const isThirdEmpty =
    thirdNextDaySessions.error || thirdNextDaySessions.data?.length === 0;

  if (isFirstEmpty && isSecondEmpty && isThirdEmpty)
    return (
      <div className="content min-h-[75vh] w-full grid place-content-center">
        <h3 className="text-center font-bold text-2xl">
          لا توجد مقابلات للتأجيل لها الان
        </h3>
      </div>
    );

  return (
    <div className="content">
      <div className="min-h-[75vh]">
        <h3 className="text-2xl font-extrabold mb-8">المقابلات المتوفرة</h3>

        {!isFirstEmpty && (
          <div>
            <h2 className=" font-bold text-xl mb-2">
              {getArabicDay(firstDay.format("dddd"))}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {firstNextDaySessions.data?.map((session) => (
                <ChangeSessionItem
                  key={session.id}
                  session={session}
                  sessionId={sessionId}
                  role={user.user.role}
                  numOfDay={0}
                />
              ))}
            </div>
          </div>
        )}

        {!isSecondEmpty && (
          <div>
            <h2 className=" font-bold text-xl mb-2">
              {getArabicDay(secondDay.format("dddd"))}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {secondNextDaySessions.data?.map((session) => (
                <ChangeSessionItem
                  key={session.id}
                  session={session}
                  sessionId={sessionId}
                  role={user.user.role}
                  numOfDay={1}
                />
              ))}
            </div>
          </div>
        )}

        {!isThirdEmpty && (
          <div>
            <h2 className=" font-bold text-xl mb-2">
              {getArabicDay(thirdDay.format("dddd"))}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {thirdNextDaySessions.data?.map((session) => (
                <ChangeSessionItem
                  key={session.id}
                  session={session}
                  sessionId={sessionId}
                  role={user.user.role}
                  numOfDay={2}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
