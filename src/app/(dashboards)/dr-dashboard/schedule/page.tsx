import { getDoctorSchedule } from "@/actions/schedule";
import { auth } from "@/auth";
import ScheduleSettings from "@/components/dashboard/ScheduleSettings";
import { notFound } from "next/navigation";
import React from "react";

type Props = {};

export default async function SchedulePage({}: Props) {
  const user = await auth();
  if (!user) notFound();
  const initialData = await getDoctorSchedule(user.user.id!);

  return (
    <div className="content">
      <ScheduleSettings
        userId={user.user.id!}
        initialData={initialData.data as any}
      />
    </div>
  );
}
