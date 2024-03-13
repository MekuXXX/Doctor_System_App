"use client";
import React from "react";
import { Button } from "../ui/button";
import { getDoctorSessionTimeByType } from "@/lib/doctor-session";
import { ADMIN_DASHBOARD, USER_DASHBOARD } from "@/routes";
import moment from "moment";
import { changeSessionDate } from "@/actions/sessions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DoctorScheduleSession, UserRole } from "@prisma/client";
import { convertToAmAndPm } from "@/lib/moment";

type Props = {
  session: DoctorScheduleSession;
  sessionId: string;
  numOfDay: number;
  role: UserRole;
};

export default function ChangeSessionItem({
  session,
  sessionId,
  numOfDay,
  role,
}: Props) {
  const router = useRouter();
  const handleChangeSession = async () => {
    const res = await changeSessionDate(
      sessionId,
      moment()
        .add(numOfDay, "days")
        .set({
          hour: parseInt(session.sessionTime.substring(0, 2)), // Extract hour from time string
          minute: parseInt(session.sessionTime.substring(3, 5)), // Extract minute from time string
          second: 0,
          millisecond: 0,
        })
        .toDate()
    );
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(res.success);
    }
    router.push(
      `${role === "ADMIN" ? ADMIN_DASHBOARD : USER_DASHBOARD}/sessions`
    );
  };

  return (
    <div className="border-main border rounded-xl p-4 text-center">
      <p className="text-lg">
        <span>السعر: </span>
        <span>{session.sessionPrice}</span>
      </p>

      <p className="text-lg">
        <span>النوع: </span>
        <span>{getDoctorSessionTimeByType(session.sessionType)} دقيقة</span>
      </p>

      <p className="text-lg">
        <span>الوقت: </span>
        <span>{convertToAmAndPm(session.sessionTime)}</span>
      </p>
      <Button
        className=" border-main text-main mt-4"
        onClick={handleChangeSession}
        variant={"outline"}
      >
        اختيار
      </Button>
    </div>
  );
}
